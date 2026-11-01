import { projectsData } from "../../data/projects";
import ProjectCard from "../ui/ProjectCard";
import FadeIn from "../ui/FadeIn";

export default function Projects() {
  return (
    <section id="projects" className="w-full min-h-[calc(100vh-80px)] flex items-center border-t border-white/5 scroll-mt-20">
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-12">
        <FadeIn direction="up">
          <div className="flex flex-col items-end mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-black mb-2">
              نمونه <span className="text-lavender">کارها</span>
            </h2>
            <p className="text-silverMuted text-sm md:text-lg">پروژه‌های منتخب و چالش‌های فنی که پشت سر گذاشته‌ام.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, index) => (
            <FadeIn key={project.id} direction="up" delay={index * 0.15}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}