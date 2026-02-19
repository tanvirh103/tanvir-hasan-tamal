import Footer from "./Component/Footer";
import VerticalTech from "./Component/Skills";
import Image from "next/image";
import {
  CodeForces,
  Facebook,
  Github,
  LinkendIn,
  Mail,
  RedirectPage,
  Whatsapp,
} from "@/SVG/WelcomeSvg";
import Link from "next/link";
import RotatingMessage from "./Component/Message";
import { Experiences } from "./Content/Experiance";
import { AchievementsContent } from "./Content/Achievements";
import { ProjectContent } from "./Content/ProjectContent";
import { Fragment } from "react/jsx-runtime";

export default function Home() {
  return (
    <Fragment>
      <div
        id="Home"
        className="pt-4 pb-6 2xl:px-12 lg:px-8 max-w-full lg:max-w-[1400px] 2xl:max-w-[1560px] md:max-w-[1200px] sm:max-w-[1020px] mx-auto flex flex-col lg:flex-row mt-8 items-center justify-center lg:justify-between"
      >
        <div className="my-auto">
          <div className="text-center lg:text-left my-4">
            <RotatingMessage />
            <p className="font-[600] text-[24px] md:text-[36px] lg:text-[36px] text-[#8dced0]">
              <span>{"I'm "}</span>
              {`Tanvir Hasan Tamal`}
            </p>
            <Link
              href="/Resume_of_Tanvir_Hasan_Tamal.pdf"
              target="_blank"
              className="relative inline-block rounded-[16px] border-[#FFFFFF] border-[2px] shadow-md   cursor-pointer"
            >
              <div className="flex items-center text-center gap-2 px-2 py-2 text-[16px] font-[500]">
                Read My Resume
                <RedirectPage />
              </div>
            </Link>
          </div>
        </div>
        <div className="pt-5 lg:pt-0">
          <div className="flex justify-center lg:justify-end xl:justify-end">
            <div className="w-full max-w-[300px] px-4">
              <Image
                className="rounded-[12px] w-full h-auto"
                src="/tanvir-hasan-tamal/images/tanvir.jpg"
                width={300}
                height={300}
                alt="Tanvir Hasan Tamal"
                unoptimized
                priority={true}
              />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end xl:justify-end px-4">
            <p className="font-[600] text-[18px] md:text-[20px] lg:text-[24px]  my-4">
              About me
            </p>
          </div>
          <div className="flex justify-end px-4">
            <p className="text-[16px] md:text-[18px] lg:text-[18px] font-[500] lg:text-left flex text-justify md:w-[450px] sm:w-[380px] lg:w-[500px]">
              I'm Tanvir, A passionate Full-Stack Software Engineer with
              expertise in building dynamic, scalable, and high-performance web
              applications. I specialize in modern web technologies like
              Nest.js, Next.js, Express.js, and PostgreSQL, crafting seamless user
              experiences and efficient backend solutions.
            </p>
          </div>
          <div className="flex justify-end gap-4 mt-6 px-4">
            <Link href={`https://github.com/tanvirh103`} target="_blank">
              <p>
                <Github />
              </p>
            </Link>
            <Link
              href={`https://www.linkedin.com/in/tanvirh103/`}
              target="_blank"
            >
              <p>
                <LinkendIn />
              </p>
            </Link>
            <Link href={`mailto:tanvirh103@gmail.com`} target="_blank">
              <p>
                <Mail />
              </p>
            </Link>
            <Link href={`https://www.facebook.com/tanvirh103/`} target="_blank">
              <p>
                <Facebook />
              </p>
            </Link>
            <Link
              href={`https://codeforces.com/profile/tanvirh103`}
              target="_blank"
            >
              <p>
                <CodeForces />
              </p>
            </Link>
            <Link href="https://wa.me/+8801534103985" target="_blank">
              <p>
                <Whatsapp width={20} height={20} />
              </p>
            </Link>
          </div>
        </div>
      </div>
      <VerticalTech />
      <div
        id="Education"
        className="mt-6 pt-6 pb-6 max-w-1400px lg:max-w-[1400px] 2xl:max-w-[1560px] md:max-w-[1200px] sm:max-w-[1020px] mx-auto px-4 2xl:px-12 lg:px-8"
      >
        <div className="items-center text-center pt-4">
          <p className="text-[24px] md:text-[36px] lg:text-[40px]  font-[600] text-[#8dced0]">
            Education
          </p>
          <p className="text-[16px] md:text-[20px] lg:text-[24px] font-[600] ">
            Combining academic knowledge
          </p>
        </div>
        <div className="mt-6 mb-6 items-center flex flex-col md:flex md:flex-col md:items-center lg:items-start">
          <div className="bg-gradient-to-r from-[#262a36] via-[#373c4e] to-[#181a21]  w-[250px] h-[200px] md:w-[300px] md:h-[200px] lg:w-[550px] lg:h-[140px] rounded-[8px] p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out">
            <div className="text-[16px] md:text-[18px] lg:text-[22px] font-[500]">
              BSc. in Computer Science and Engineering
            </div>
            <div className="text-[14px] md:text-[16px] lg:text-[16px] font-[500] text-[#8dced0] mt-1">
              February 2021 - January 2025
            </div>
            <div className="text-[14px] md:text-[16px] lg:text-[16px] font-[500] mt-1">
              American International University- Bangladesh
            </div>
          </div>
          <div className="border-l-2 border-dashed h-24 mx-1"></div>
          <div className="bg-gradient-to-r from-[#262a36] via-[#373c4e] to-[#181a21]  w-[250px] h-[200px] md:w-[300px] md:h-[200px] lg:w-[550px] lg:h-[140px] rounded-[8px] p-6 hover:scale-[1.02] transition-all duration-300 ease-in-out">
            <div className="text-[16px] md:text-[18px] lg:text-[22px] font-[500]">
              Higher Secondary Certificate
            </div>
            <div className="text-[14px] md:text-[16px] lg:text-[16px] font-[500] text-[#8dced0] mt-1">
              June 2018 - June 2020
            </div>
            <div className="text-[14px] md:text-[16px] lg:text-[16px] font-[500] mt-1">
              Dhaka Imperial College
            </div>
          </div>
          <div className="border-l-2 border-dashed h-24 mx-1"></div>
          <div className="bg-gradient-to-r from-[#262a36] via-[#373c4e] to-[#181a21]  w-[250px] h-[200px] md:w-[300px] md:h-[200px] lg:w-[550px] lg:h-[140px] rounded-[8px] p-6 hover:scale-[1.02] transition-all duration-300 ease-in-out">
            <div className="text-[16px] md:text-[18px] lg:text-[22px] font-[500]">
              Secondary School Certificate
            </div>
            <div className="text-[14px] md:text-[16px] lg:text-[16px] font-[500] text-[#8dced0] mt-1">
              February 2018
            </div>
            <div className="text-[14px] md:text-[16px] lg:text-[16px] font-[500] mt-1">
              Faizur Rahman Ideal Institute
            </div>
          </div>
        </div>
      </div>
      <div
        id="Experience"
        className="pt-6 pb-6 max-w-full lg:max-w-[1400px] 2xl:max-w-[1560px] md:max-w-[1200px] sm:max-w-[1020px] mx-auto px-4 2xl:px-12 lg:px-8"
      >
        <div className="items-center text-center pt-4">
          <p className="text-[24px] md:text-[36px] lg:text-[40px] font-[600] text-[#8dced0]">
            Experience
          </p>
          <p className="text-[16px] md:text-[20px] lg:text-[24px] font-[600] ">
            Combining hand - on industry experience and volunteer experience
          </p>
        </div>
        <p className="pt-4 pb-2">
          <span className="font-[600] text-[18px] md:text-[20px] lg:text-[24px]">
            Work Experience
          </span>
        </p>
        <div className="pb-4 relative">
          <div className="border-l-2 border-l-inherit h-auto min-h-[12rem] lg:min-h-[11rem] mx-2">
            <hr className="bg-[#81baff] rounded-full w-5 h-5 absolute  left-1 -translate-x-1 mt-1" />
            <div className="max-w-full md:w-[600px] lg:w-[700px] text-justify">
              <p className="font-[500] text-[18px] lg:text-[20px] ml-4 ">
                Deepchain Labs
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                {" "}
                Software Engineer Trainee (Remote)
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                {" "}
                - Built full-stack features for Kazentic, a multi-tenant SaaS
                platform combining project management, CRM, HRM, billing, and
                analytics
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                - Led backend development for Calendar and Teams modules and
                contributed to frontend development & integration across 10+ key
                modules including Payroll, Forms, and Organization Settings.
              </p>
            </div>
            <hr className="bg-[#81baff] rounded-full w-5 h-5 absolute left-1 -translate-x-1 mt-6" />
            <div className="max-w-full md:w-[600px] lg:w-[700px] text-justify mt-5">
              <p className="font-[500] text-[18px] lg:text-[20px] ml-4 ">
                TECHY{`'`}S
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                {" "}
                Junior Full Stack Developer (Remote)
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                {" "}
                - As a Full Stack Developer, I contribute to client projects by
                building responsive frontends with Next.js (TypeScript,Tailwind
                CSS), HeroUI, and shadcn/ui, while developing backend services
                using Express.js and Prisma ORM. I design RESTful APIs, ensure
                seamless frontend-backend integration, and collaborate with
                teams to deliver scalable solutions in an Agile environment.
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                - Implemented secure payment integrations (Stripe), resolved
                build issues, and fixed post-deployment problems on VPS
                environments.
              </p>
            </div>
              <hr className="bg-[#81baff] rounded-full w-5 h-5 absolute left-1 -translate-x-1 mt-6" />
            <div className="max-w-full md:w-[600px] lg:w-[700px] text-justify mt-5">
              <p className="font-[500] text-[18px] lg:text-[20px] ml-4 ">
                EraVend GmbH & Co. KG — Königsbrunn, Germany  
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                {" "}
                Full-Stack Developer (Remote)
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                {" "}
                - Building and maintaining features for a multi-tenant Employee Management System (EMS), enabling multiple companies to manage workforce operations from a single platform.
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                - Developed core modules including Chat, Notifications, Email, Sales, and Finance — contributing to both frontend (Next.js) and backend (NestJS) layers.
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                - Implemented real-time communication features, automated email workflows, and integrated sales and finance data flows between services.
              </p>
              <p className="font-[500] text-[16px] ml-4 py-1">
                - Delivered UI enhancements and performed extensive bug fixing across critical modules, improving system stability and user experience.
              </p>
            </div>
          </div>
        </div>
        <div className="pt-6 lg:pt-2">
          <p className="font-[600] text-[18px] md:text-[20px] lg:text-[24px]">
            Volunteer Experience
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))] xl:grid-cols-[repeat(auto-fill,_minmax(500px,_1fr))] gap-4 pt-6 pb-6 w-full">
          {Experiences.VolunteerExp.map((exp, index) => (
            <div
              key={index}
              className="bg-gradient-to-tl from-[#243238] to-[#1e252d] via-[#1e292b] rounded-[8px] p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              <p className="font-[500] text-[14px] md:text-[16px] lg:text-[20px] pb-2">
                {exp.title}
              </p>
              <p className="font-[500] text-[12px] md:text-[14px] lg:text-[16px]">
                {exp.date}
              </p>
              <p className="font-[500] text-[12px] md:text-[14px] lg:text-[16px]">
                {exp.describtion}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        id="Achievements"
        className="mt-6 pt-6 pb-6 max-w-1400px lg:max-w-[1400px] 2xl:max-w-[1560px] md:max-w-[1200px] sm:max-w-[1020px] mx-auto px-4 2xl:px-12 lg:px-8"
      >
        <div className="items-center text-center pt-4">
          <p className="text-[24px] md:text-[36px] lg:text-[40px] font-[600] text-[#8dced0]">
            Achievements
          </p>
          <p className="text-[16px] md:text-[20px] lg:text-[24px] font-[600]">
            Combining consistent effort with measurable success
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))] xl:grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))] gap-4 pt-6 pb-6 w-full">
          {AchievementsContent.Award.map((exp, index) => (
            <div
              key={index}
              className="bg-gradient-to-tl from-[#243238] to-[#1e252d] via-[#1e292b] rounded-[8px] p-6 cursor-pointer hover:scale-[1.02] transition-all duration-300 ease-in-out"
            >
              <p className="font-[500] text-[14px] md:text-[16px] lg:text-[20px] pb-2">
                {exp.title}
              </p>
              <p className="font-[500] text-[12px] md:text-[14px] lg:text-[16px]">
                {exp.date}
              </p>
              <p className="font-[500] text-[12px] md:text-[14px] lg:text-[16px]">
                {exp.describtion}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div
        id="Projects"
        className="mt-6 pb-12 max-w-1400px lg:max-w-[1400px] 2xl:max-w-[1560px] md:max-w-[1200px] sm:max-w-[1020px] mx-auto px-4 2xl:px-12 lg:px-8"
      >
        <div className="items-center text-center pt-4">
          <p className="text-[24px] md:text-[36px] lg:text-[40px] font-[600] text-[#8dced0]">
            Projects
          </p>
          <p className="text-[16px] md:text-[20px] lg:text-[24px] font-[600] ">
            Combining academic insight with practical implementation
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] sm:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] md:grid-cols-[repeat(auto-fill,_minmax(380px,_1fr))] lg:grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))] xl:grid-cols-[repeat(auto-fill,_minmax(450px,_1fr))] gap-4 pt-6 pb-6 w-full">
          {ProjectContent.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className="bg-gradient-to-tl from-[#243238] to-[#1e252d] via-[#1e292b] rounded-[8px] p-6"
            >
              <p className="flex items-center gap-2 font-[500] text-[14px] md:text-[16px] lg:text-[20px]">
                {item.title}
                <span className="w-[36px] h-[36px] rounded-[8px] border-[#537177] items-center flex justify-center hover:border-1 ">
                  <Link href={item.github} target="_blank">
                    <Github width={28} height={28} />{" "}
                  </Link>
                </span>
              </p>
              <div className="flex gap-2 flex-wrap mt-4">
                {item.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-[#3c545e] rounded-[8px] flex items-center justify-start px-2 py-2"
                  >
                    <p className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[16px] font-[500]">
                      {skill}
                    </p>
                  </div>
                ))}
              </div>
              <p className="font-[500] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[16px] mt-2">
                {item.description.length > 150
                  ? `${item.description.slice(0, 150)}...`
                  : item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
}
