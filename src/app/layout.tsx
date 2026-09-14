import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "./Component/Navbar";
const gilroy = localFont({
  src: [
    {
      path: "./fonts/InterVariable.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/CalSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
});

export const metadata: Metadata = {
  title: {
    default: "Tanvir Hasan Tamal – Full Stack Developer & Software Engineer",
    template: "%s | Tanvir Hasan Tamal",
  },
  description:
    "Portfolio of Tanvir Hasan Tamal, a Full Stack Developer and Software Engineer specializing in Next.js, NestJS, Express.js, Tailwind CSS, and modern JavaScript/TypeScript. Explore projects, experience, and expertise in building scalable, high-performance web applications.",
  keywords: [
    "Tanvir Hasan Tamal",
    "Tanvir Hasan",
    "Tamal",
    "tanvirh103",
    "Tanvir Tamal",
    "Tanvir Hasan Tamal Portfolio",
    "Full Stack Engineer",
    "Full Stack Developer",
    "Software Engineer",
    "Next.js Developer",
    "NestJS Developer",
    "Express.js Developer",
    "Tailwind CSS Developer",
    "JavaScript Developer",
    "TypeScript Developer",
    "MERN Developer",
    "Web Developer Portfolio",
    "Backend Developer",
    "Frontend Developer",
    "React Developer",
    "Node.js Developer",
    "Modern Web Development",
    "API Developer",
    "GitHub Portfolio",
    "Bangladeshi Developer",
  ],
  metadataBase: new URL("https://tanvirh103.github.io/tanvir-hasan-tamal"),
  authors: [{ name: "Tanvir Hasan Tamal" }],
  creator: "Tanvir Hasan Tamal",
  publisher: "Tanvir Hasan Tamal",
  openGraph: {
    title: "Tanvir Hasan Tamal – Full Stack Developer & Software Engineer",
    description:
      "Explore the portfolio of Tanvir Hasan Tamal, expert in Next.js, NestJS, Express.js, Tailwind CSS, and scalable full stack web development.",
    url: "https://tanvirh103.github.io/tanvir-hasan-tamal",
    siteName: "Tanvir Hasan Tamal – Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanvir Hasan Tamal – Full Stack Developer",
    description:
      "Full Stack Developer skilled in Next.js, NestJS, Express.js, Tailwind CSS and modern JS/TS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${gilroy.className}`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
