"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight, FiActivity, FiClock } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function Footer() {
  const [time, setTime] = useState("");
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // جلوگیری از خطای Hydration (زمانی که هنوز تم مشخص نیست)
  if (!mounted) {
    return <footer className="w-full relative bg-background border-t border-white/10 min-h-[400px]"></footer>;
  }

  const isLight = resolvedTheme === "light";

  return (
    <footer 
      className="w-full relative border-t border-white/10 overflow-hidden flex flex-col pt-32 pb-0 transition-colors duration-500"
      style={{
        backgroundColor: isLight ? "#F3EBDD" : "#110620",
        backgroundImage: isLight 
          ? "radial-gradient(circle at 1px 1px, rgba(74, 28, 64, 0.15) 1px, transparent 0)" 
          : "none",
        backgroundSize: isLight ? "24px 24px" : "auto"
      }}
      dir="rtl"
    >
      
      {/* واترمارک غول‌پیکر پس‌زمینه */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <h1 className="text-[25vw] font-black leading-none text-transparent stroke-text opacity-10">
          K / PORTFOLIO
        </h1>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10 flex flex-col justify-between flex-grow">
        
        {/* بخش بالایی: تیتر و دکمه */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-lavender animate-pulse"></span>
              <span className="text-silverMuted text-sm font-mono tracking-widest uppercase">آماده همکاری</span>
            </div>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-[1.1] tracking-tight">
              بیایید چیزهای <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-lavender to-white/50">غیرممکن</span> را <br />
              ممکن کنیم.
            </h2>
          </div>

          <a 
            href="mailto:hello@example.com" 
            className="group relative inline-flex items-center justify-center px-10 py-5 bg-transparent border border-lavender text-white font-bold tracking-widest text-sm overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-lavender/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
            <span className="relative flex items-center gap-3">
              شروع همکاری
              <FiArrowUpRight size={18} className="text-lavender group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </span>
          </a>
        </div>

        {/* خط جداکننده */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-16"></div>

        {/* بخش میانی: شبکه لینک‌ها */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
          
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="text-4xl font-bold tracking-widest text-white">
              K <span className="text-lavender font-light">/</span>
            </div>
            <p className="text-silverMuted text-sm leading-relaxed max-w-sm">
              معمار سیستم‌ها و توسعه‌دهنده فول‌استک. 
              من محصولاتی می‌سازم که نه تنها کار می‌کنند، بلکه تجربه‌ای بی‌نظیر خلق می‌کنند.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://github.com/lucky-kk-2002" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-silverMuted hover:text-lavender hover:border-lavender transition-all duration-300">
                <FiGithub size={18} />
              </a>
              <a href="www.linkedin.com/in/kiarash-koolaiean-ab1780448" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center text-silverMuted hover:text-lavender hover:border-lavender transition-all duration-300">
                <FiLinkedin size={18} />
              </a>
              <a href="mailto:hello@example.com" className="w-10 h-10 border border-white/10 flex items-center justify-center text-silverMuted hover:text-lavender hover:border-lavender transition-all duration-300">
                <FiMail size={18} />
              </a>
            </div>
          </div>

          <div className="hidden md:block md:col-span-1"></div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-white font-bold text-xs tracking-widest font-mono uppercase mb-2">/ ناوبری</h3>
            <Link href="#home" className="text-silverMuted hover:text-lavender transition-colors text-sm w-fit flex items-center gap-2 group">
              <span className="w-0 group-hover:w-4 h-[1px] bg-lavender transition-all duration-300"></span> خانه
            </Link>
            <Link href="#about" className="text-silverMuted hover:text-lavender transition-colors text-sm w-fit flex items-center gap-2 group">
              <span className="w-0 group-hover:w-4 h-[1px] bg-lavender transition-all duration-300"></span> درباره من
            </Link>
            <Link href="#projects" className="text-silverMuted hover:text-lavender transition-colors text-sm w-fit flex items-center gap-2 group">
              <span className="w-0 group-hover:w-4 h-[1px] bg-lavender transition-all duration-300"></span> پروژه‌ها
            </Link>
            <Link href="#contact" className="text-silverMuted hover:text-lavender transition-colors text-sm w-fit flex items-center gap-2 group">
              <span className="w-0 group-hover:w-4 h-[1px] bg-lavender transition-all duration-300"></span> تماس
            </Link>
          </div>

          <div className="md:col-span-3 flex flex-col gap-4">
            <h3 className="text-white font-bold text-xs tracking-widest font-mono uppercase mb-2">/ وضعیت</h3>
            <div className="flex items-center gap-2 text-sm text-silverMuted">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-mono">ONLINE / ACCEPTING WORK</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-silverMuted font-mono">
              <FiClock size={14} />
              {time} UTC
            </div>
            <div className="flex items-center gap-2 text-sm text-silverMuted font-mono">
              <FiActivity size={14} />
              SYS: STABLE
            </div>
          </div>

        </div>
      </div>

      {/* نوار پایین */}
      <div 
        className="w-full border-t border-white/10 transition-colors duration-500"
        style={{ backgroundColor: isLight ? "#F3EBDD" : "#080312" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-silverMuted font-mono">
          <p>© {new Date().getFullYear()} K / ALL RIGHTS RESERVED.</p>
          <p className="flex items-center gap-2">
            DESIGNED & ENGINEERED WITH <span className="text-lavender animate-pulse">●</span> BY K
          </p>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px rgba(184, 161, 255, 0.15);
        }
      `}</style>
    </footer>
  );
}