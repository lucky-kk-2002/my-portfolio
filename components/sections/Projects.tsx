"use client";

import Link from "next/link";
import { FiArrowLeft, FiMonitor, FiZap, FiLayers, FiMaximize, FiPlay } from "react-icons/fi";
import FadeIn from "../ui/FadeIn";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section id="projects" className="w-full min-h-[calc(100vh-80px)] flex items-center border-t border-white/5 scroll-mt-20 relative overflow-hidden">
      
      {/* نور پس‌زمینه */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lavender/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-12 relative z-10">
        
        <FadeIn direction="up">
          <div className="flex flex-col items-end mb-12 text-right">
            <div className="flex items-center gap-4 mb-2">
              <h2 className="text-3xl md:text-5xl font-black">
                نمونه <span className="text-lavender">کارها</span>
              </h2>
              <span className="w-16 h-[1px] bg-silverMuted/50"></span>
            </div>
            <p className="text-silverMuted text-sm md:text-lg">پروژه‌های منتخب و چالش‌های فنی که پشت سر گذاشته‌ام.</p>
          </div>
        </FadeIn>

        {/* ================= کارت ویژه (Featured Project) ================= */}
        <FadeIn direction="up" delay={0.2}>
          <div className="relative w-full max-w-5xl mx-auto group">
            
            {/* هاله نورانی پشت کارت */}
            <div className="absolute -inset-1 bg-gradient-to-r from-lavender/20 to-transparent blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="relative bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row items-center hover:border-lavender/40 transition-colors duration-500">
              
              {/* بخش راست: متن و توضیحات */}
              <div className="flex-1 p-8 md:p-12 text-right z-10">
                <div className="flex items-center gap-3 mb-6 justify-end">
                  <span className="px-3 py-1 bg-lavender/10 border border-lavender/20 text-lavender text-xs font-mono rounded-full flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    LIVE DEMO
                  </span>
                  <span className="text-silverMuted text-sm font-mono">PROJECT_01</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
                  داشبورد بهره‌وری <span className="text-lavender">ماژولار</span>
                </h3>
                
                <p className="text-silverMuted leading-relaxed mb-8 max-w-lg ml-auto">
                  یک پلنر کاملاً تعاملی و شخصی‌سازی‌پذیر. این پروژه شامل مدیریت تسک‌ها با تاریخ سررسید، 
                  تایمر پومودورو، تقویم زنده و ویجت آب‌وهوا است. کاربر می‌تواند تم سایت را با آپلود عکس تغییر دهد 
                  و ویجت‌ها را با درگ و دراپ جابجا کند.
                </p>

                {/* تکنولوژی‌ها */}
                <div className="flex flex-wrap gap-2 justify-end mb-8" dir="ltr">
                  {["Next.js", "Tailwind CSS", "Framer Motion", "Dnd-Kit", "ColorThief"].map((tech) => (
                    <span key={tech} className="text-[10px] font-mono text-silverMuted bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex justify-end">
                  <Link 
                    href="/planner"
                    className="group/btn flex items-center gap-3 px-8 py-4 bg-lavender text-background font-bold rounded-xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(184,161,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                  >
                    اجرای اپلیکیشن
                    <FiPlay size={18} className="group-hover/btn:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* بخش چپ: تصویر / المان گرافیکی */}
              <div className="flex-1 w-full h-[300px] md:h-[500px] bg-gradient-to-br from-[#110620] to-[#05010A] relative overflow-hidden flex items-center justify-center border-t md:border-t-0 md:border-r border-white/5">
                {/* گرید پس‌زمینه */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)",
                  backgroundSize: "24px 24px"
                }}></div>
                
                {/* المان‌های شناور گرافیکی (شبیه‌سازی پلنر) */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }} 
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute top-1/4 right-1/4 w-32 h-20 bg-[#0A0A0F] border border-lavender/30 rounded-xl shadow-[0_0_20px_rgba(184,161,255,0.2)] flex flex-col p-3 gap-2 z-10"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-lavender"></div>
                    <div className="w-12 h-1 bg-white/20 rounded-full"></div>
                  </div>
                  <div className="w-full h-8 bg-white/5 rounded-md"></div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 10, 0] }} 
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute bottom-1/4 left-1/4 w-40 h-24 bg-[#0A0A0F] border border-white/10 rounded-xl shadow-2xl flex flex-col p-4 gap-3 z-10"
                >
                   <div className="flex justify-between items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                       <div className="w-3 h-3 rounded-full border border-green-500"></div>
                    </div>
                    <div className="w-16 h-2 bg-white/10 rounded-full"></div>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full"></div>
                   <div className="w-3/4 h-2 bg-white/5 rounded-full"></div>
                </motion.div>

                {/* آیکون بزرگ در مرکز */}
                <div className="relative z-20 w-24 h-24 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(184,161,255,0.3)]">
                  <FiLayers size={40} className="text-lavender" />
                </div>
              </div>

            </div>
          </div>
        </FadeIn>

        {/* پیام برای پروژه‌های بعدی */}
        <FadeIn direction="up" delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-silverMuted text-sm font-mono flex items-center justify-center gap-2">
              <FiMaximize size={14} className="text-lavender animate-pulse" />
              پروژه‌های بیشتر در حال بارگذاری...
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}