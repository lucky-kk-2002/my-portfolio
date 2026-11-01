"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Project } from "../../data/projects";
import { FiImage } from "react-icons/fi";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const background = useTransform(
    [mouseXSpring, mouseYSpring],
    ([latestX, latestY]) => 
      `radial-gradient(circle at ${(Number(latestX) + 0.5) * 100}% ${(Number(latestY) + 0.5) * 100}%, rgba(184,161,255,0.15) 0%, transparent 60%)`
  );

  return (
    <Link href={project.link} className="block w-full h-full perspective-1000">
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative bg-surface border border-white/5 rounded-2xl p-6 hover:border-lavender/30 transition-colors duration-300 h-full flex flex-col overflow-hidden"
      >
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ background }} />
        <div className="relative z-10 flex flex-col h-full" style={{ transform: "translateZ(30px)" }}>
          
          <div className="w-full h-48 bg-background rounded-xl mb-6 border border-white/5 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-lavender/20 transition-colors">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(184,161,255,0.8)_0%,transparent_70%)]"></div>
            
            <div className="flex flex-col items-center gap-3 z-10 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
              <div className="w-12 h-12 rounded-full bg-lavender/10 border border-lavender/20 flex items-center justify-center text-lavender group-hover:scale-110 transition-transform duration-500">
                <FiImage size={20} />
              </div>
              <div className="text-center">
                <p className="text-silver text-sm font-bold">در حال آماده‌سازی</p>
                <p className="text-silverMuted text-[10px] font-mono mt-1">ASSETS_LOADING...</p>
              </div>
            </div>

            <div className="absolute top-2 left-2 w-4 h-[1px] bg-white/10"></div>
            <div className="absolute top-2 left-2 w-[1px] h-4 bg-white/10"></div>
            <div className="absolute bottom-2 right-2 w-4 h-[1px] bg-white/10"></div>
            <div className="absolute bottom-2 right-2 w-[1px] h-4 bg-white/10"></div>
          </div>

          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lavender transition-colors">{project.title}</h3>
          <p className="text-silverMuted text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto" dir="ltr">
            {project.techStack.map((tech: string, index: number) => (
              <span key={index} className="text-[10px] font-mono text-silverMuted bg-background px-2 py-1 rounded-md border border-white/5">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}