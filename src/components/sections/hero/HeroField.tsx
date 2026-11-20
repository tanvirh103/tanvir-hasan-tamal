"use client";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

const VERTEX = `
attribute vec2 a_pos;
void main() {
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

/**
 * Domain-warped value noise rendered as soft "topographic" contour lines, tinted from the
 * lime accent to the violet accent-2. Output is premultiplied so the section background
 * (and theme) shows through; the pointer gently bends the field around it.
 */
const FRAGMENT = `
#extension GL_OES_standard_derivatives : enable
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_pointer;
uniform vec3 u_a;
uniform vec3 u_b;
uniform float u_strength;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec2 grad(vec2 i) {
  float a = hash(i) * 6.2831853;
  return vec2(cos(a), sin(a));
}

// Gradient noise (no flat lattice plateaus, so contour lines stay continuous).
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(grad(i), f);
  float b = dot(grad(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(grad(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(grad(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y) * 0.5 + 0.5;
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    v += amp * noise(p);
    p = rot * p * 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 0.9;
  float t = u_time * 0.035;

  vec2 m = vec2(u_pointer.x * aspect, u_pointer.y) * 0.9;
  float md = length(p - m);
  p += (p - m) * 0.18 * exp(-md * md * 6.0);

  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 1.7 * q + vec2(1.7, 9.2) + t * 0.6), fbm(p + 1.7 * q + vec2(8.3, 2.8) - t * 0.4));
  float f = fbm(p + 1.5 * r);

  float bands = f * 18.0;
  // Uniform hairlines regardless of slope; every fourth contour is a brighter "major" line.
  float dist = abs(fract(bands - 0.5) - 0.5) / max(fwidth(bands), 0.012);
  float major = step(3.5, mod(floor(bands + 0.5), 4.0));
  float line = (1.0 - smoothstep(0.0, 1.1 + major * 0.5, dist)) * (0.55 + major * 0.45);

  vec3 col = mix(u_b, u_a, smoothstep(0.35, 0.95, uv.x * 0.8 + (f - 0.5) * 0.9));
  float glow = smoothstep(0.45, 0.95, f) * 0.22;
  float vignette = 1.0 - smoothstep(0.2, 1.25, length((uv - vec2(0.62, 0.55)) * vec2(1.1, 1.4)));
  float alpha = (line * 0.7 + glow) * vignette * u_strength;
  gl_FragColor = vec4(col * alpha, alpha);
}
`;

type RGB = [number, number, number];

/** Resolves a CSS custom property (any colour syntax) into normalized RGB via computed style. */
function readColor(probe: HTMLElement, name: string, fallback: RGB): RGB {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!value) return fallback;
  probe.style.color = value;
  const match = getComputedStyle(probe).color.match(/[\d.]+/g);
  if (!match || match.length < 3) return fallback;
  return [Number(match[0]) / 255, Number(match[1]) / 255, Number(match[2]) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * Full-bleed WebGL background for the hero. Starts after first paint, pauses off-screen and
 * in hidden tabs, renders a single frame with reduced motion and stays invisible (leaving the
 * CSS glow layers underneath) when WebGL is unavailable.
 */
export function HeroField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    const start = () => {
      if (disposed) return;
      const gl = canvas.getContext("webgl", {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: true,
        powerPreference: "low-power",
      });
      // fwidth() keeps contour lines a constant width; without it the CSS glows remain.
      const release = () => gl?.getExtension("WEBGL_lose_context")?.loseContext();
      if (!gl || !gl.getExtension("OES_standard_derivatives")) {
        release();
        return;
      }

      const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
      const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
      const program = gl.createProgram();
      if (!vs || !fs || !program) {
        release();
        return;
      }
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        release();
        return;
      }
      gl.useProgram(program);

      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const aPos = gl.getAttribLocation(program, "a_pos");
      gl.enableVertexAttribArray(aPos);
      gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

      const uRes = gl.getUniformLocation(program, "u_res");
      const uTime = gl.getUniformLocation(program, "u_time");
      const uPointer = gl.getUniformLocation(program, "u_pointer");
      const uA = gl.getUniformLocation(program, "u_a");
      const uB = gl.getUniformLocation(program, "u_b");
      const uStrength = gl.getUniformLocation(program, "u_strength");

      const probe = document.createElement("span");
      probe.style.display = "none";
      document.body.appendChild(probe);

      const applyTheme = () => {
        const dark = document.documentElement.classList.contains("dark");
        gl.uniform3fv(uA, readColor(probe, "--accent", [0.78, 0.96, 0.34]));
        gl.uniform3fv(uB, readColor(probe, "--accent-2", [0.55, 0.48, 1]));
        gl.uniform1f(uStrength, dark ? 1 : 0.7);
      };
      applyTheme();

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
      const coarse = window.matchMedia("(pointer: coarse)");
      const saveData =
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
        true;
      let lost = false;
      const pointer = { x: 0.7, y: 0.55, tx: 0.7, ty: 0.55 };
      let visible = true;
      let frame = 0;
      let time = 12; // start mid-flow so the static frame is already interesting
      let last = 0;

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;
        const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
        const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
        if (canvas.width !== width || canvas.height !== height) {
          canvas.width = width;
          canvas.height = height;
          gl.viewport(0, 0, width, height);
        }
        gl.uniform2f(uRes, width, height);
      };

      const draw = () => {
        pointer.x += (pointer.tx - pointer.x) * 0.04;
        pointer.y += (pointer.ty - pointer.y) * 0.04;
        gl.uniform1f(uTime, time);
        gl.uniform2f(uPointer, pointer.x, pointer.y);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      };

      const loop = (now: number) => {
        frame = requestAnimationFrame(loop);
        if (last && now - last < 32) return;
        const delta = last ? Math.min(now - last, 64) : 16;
        last = now;
        time += delta / 1000;
        draw();
      };

      const running = () =>
        visible &&
        !lost &&
        !document.hidden &&
        !reduce.matches &&
        !coarse.matches &&
        !saveData &&
        document.documentElement.dataset.motion !== "off";
      const sync = () => {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
        if (running()) frame = requestAnimationFrame(loop);
        else if (!lost) draw();
      };

      resize();
      draw();
      canvas.dataset.ready = "true";
      sync();

      const resizeObserver = new ResizeObserver(() => {
        resize();
        if (!frame) draw();
      });
      resizeObserver.observe(canvas);

      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? true;
        sync();
      });
      intersection.observe(canvas);

      const themeObserver = new MutationObserver(() => {
        applyTheme();
        sync();
      });
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class", "data-motion"],
      });

      const onPointer = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const rect = canvas.getBoundingClientRect();
        pointer.tx = (event.clientX - rect.left) / rect.width;
        pointer.ty = 1 - (event.clientY - rect.top) / rect.height;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("visibilitychange", sync);
      reduce.addEventListener("change", sync);

      const onLost = (event: Event) => {
        event.preventDefault();
        lost = true;
        cancelAnimationFrame(frame);
        frame = 0;
        delete canvas.dataset.ready;
      };
      canvas.addEventListener("webglcontextlost", onLost);

      cleanup = () => {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        intersection.disconnect();
        themeObserver.disconnect();
        window.removeEventListener("pointermove", onPointer);
        document.removeEventListener("visibilitychange", sync);
        reduce.removeEventListener("change", sync);
        canvas.removeEventListener("webglcontextlost", onLost);
        probe.remove();
        gl.deleteBuffer(buffer);
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    };

    // Wait for the first paint (and idle time) so the shader never competes with the LCP.
    let idle = 0;
    let timeout = 0;
    if ("requestIdleCallback" in window) {
      idle = window.requestIdleCallback(start, { timeout: 1200 });
    } else {
      timeout = setTimeout(start, 400) as unknown as number;
    }

    return () => {
      disposed = true;
      if (idle) window.cancelIdleCallback(idle);
      clearTimeout(timeout);
      cleanup?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-[1600ms] ease-out data-[ready=true]:opacity-100",
        className,
      )}
    />
  );
}
