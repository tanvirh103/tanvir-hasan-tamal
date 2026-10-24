import type { Education } from "@/types";

export const education: Education[] = [
  {
    institution: "American International University-Bangladesh (AIUB)",
    degree: "B.Sc. in Computer Science & Engineering",
    period: "2021 — 2025",
    details: [
      { label: "Major", value: "Software Engineering" },
      {
        label: "Thesis",
        value:
          "Towards a Next Generation Blockchain: A Framework for Future Innovation and Enhanced Efficiency",
      },
      {
        label: "Relevant courses",
        value:
          "Advanced Web Technologies (NestJS, Next.js, PostgreSQL), Advanced Programming with .NET (Entity Framework, SOLID, N-Tier), Software Requirement Engineering",
      },
    ],
  },
  {
    institution: "Dhaka Imperial College",
    degree: "Higher Secondary Certificate (HSC)",
    period: "2018 — 2020",
  },
  {
    institution: "Faizur Rahman Ideal Institute",
    degree: "Secondary School Certificate (SSC)",
    period: "2018",
  },
];
