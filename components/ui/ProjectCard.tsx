"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Project } from "../../types";

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
          <div className="w-full h-40 bg-background rounded-xl mb-6 border border-white/5 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(184,161,255,0.4)_0%,transparent_70%)]"></div>
            <span className="text-silverMuted text-sm font-mono opacity-50 group-hover:opacity-100 transition-opacity z-10">تصویر پروژه</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-lavender transition-colors">{project.title}</h3>
          <p className="text-silverMuted text-sm leading-relaxed mb-6 flex-grow">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto" dir="ltr">
            {project.techStack.map((tech, index) => (
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