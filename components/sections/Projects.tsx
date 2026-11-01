"use client";

import { motion } from "framer-motion";
import { FiTerminal, FiActivity } from "react-icons/fi";
import FadeIn from "../ui/FadeIn";

export default function Projects() {
  return (
    <section id="projects" className="w-full min-h-[calc(100vh-80px)] flex items-center border-t border-white/5 scroll-mt-20 relative overflow-hidden">
      
      {/* نور پس‌زمینه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-12 relative z-10 flex flex-col items-center justify-center">
        
        {/* هدر بخش */}
        <FadeIn direction="up">
          <div className="flex flex-col items-center text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              نمونه <span className="text-lavender">کارها</span>
            </h2>
            <p className="text-silverMuted text-lg max-w-md">
              پروژه‌های منتخب و چالش‌های فنی که پشت سر گذاشته‌ام.
            </p>
          </div>
        </FadeIn>

        {/* ================= حالت خالی (Empty State) ================= */}
        <FadeIn direction="up" delay={0.2}>
          <div className="relative w-full max-w-3xl mx-auto border border-white/10 bg-surface/30 backdrop-blur-sm rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center overflow-hidden group hover:border-lavender/30 transition-colors duration-500">
            
            {/* خطوط تکنیکال دور باکس */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lavender/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-lavender/50 to-transparent"></div>
            
            {/* آیکون ترمینال با انیمیشن پالس */}
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-20 h-20 rounded-2xl bg-lavender/10 border border-lavender/20 flex items-center justify-center text-lavender mb-8 shadow-[0_0_30px_rgba(184,161,255,0.1)]"
            >
              <FiTerminal size={32} />
            </motion.div>

            {/* متن اصلی */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              در حال بارگذاری پروژه‌ها...
            </h3>
            <p className="text-silverMuted text-sm md:text-base max-w-md leading-relaxed mb-8">
              من در حال آماده‌سازی مستندات فنی و جزئیات معماری این پروژه‌ها هستم. 
              به زودی می‌توانید چالش‌ها و راه‌حل‌های من را اینجا ببینید.
            </p>

            {/* نوار وضعیت فیک */}
            <div className="w-full max-w-xs bg-background border border-white/5 rounded-full p-1 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-lavender rounded-full"
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <span className="text-[10px] font-mono text-lavender flex items-center gap-1">
                <FiActivity className="animate-pulse" /> SYNCING
              </span>
            </div>

            {/* افکت پس‌زمینه */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-lavender/5 blur-[80px] rounded-full group-hover:bg-lavender/10 transition-colors duration-500"></div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}