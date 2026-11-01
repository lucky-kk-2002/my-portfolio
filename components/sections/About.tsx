"use client";

import FadeIn from "../ui/FadeIn";
import { motion } from "framer-motion";

export default function About() {
  const skills = [
    { name: "TypeScript", level: 95, color: "bg-[#3178C6]" },
    { name: "React / Next.js", level: 90, color: "bg-[#61DAFB]" },
    { name: "Node.js", level: 85, color: "bg-[#339933]" },
    { name: "Python", level: 70, color: "bg-[#3776AB]" },
    { name: "Docker", level: 60, color: "bg-[#2496ED]" },
  ];

  return (
    <section id="about" className="w-full min-h-[calc(100vh-80px)] flex items-center border-t border-white/5 scroll-mt-20">
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <FadeIn direction="right">
            <div className="flex flex-col items-end text-right">
              <h2 className="text-2xl md:text-3xl lg:text-5xl font-black mb-6">
                درباره <span className="text-lavender">من</span>
              </h2>
              <p className="text-silverMuted text-sm md:text-base lg:text-lg leading-loose mb-6 max-w-xl text-right">
                من برنامه‌نویسی را نه صرفاً یک شغل، بلکه ابزاری قدرتمند برای حل مسائل پیچیده می‌بینم. 
                تخصص من در خلق رابط‌های کاربری مدرن و طراحی زیرساخت‌های امن و پرسرعت است. 
                من عاشق فرآیند تبدیل ایده‌های خام به محصولات دیجیتالِ زنده و قابل استفاده هستم.
              </p>
              <p className="text-silverMuted text-sm md:text-base lg:text-lg leading-loose max-w-xl text-right">
                رویکرد من در مهندسی، تلفیق «دقت فنی» با «خلاقیت بصری» است. 
                من عمیقاً باور دارم که کاربران باید بدون هیچ اصطکاکی با یک محصول تعامل کنند. 
                به همین دلیل، در پروژه‌هایم همواره به دنبال راه‌حل‌هایی هستم که هم از نظر معماری بهینه باشند و هم از نظر تجربه کاربری لذت‌بخش.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="relative bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(184,161,255,0.05)] w-full max-w-md mx-auto overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-lavender/10 blur-[60px] rounded-full group-hover:bg-lavender/20 transition-all duration-500"></div>

              <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-white/10 pb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-lavender animate-pulse">{">"}_</span>
                  <h3 className="font-mono text-xs md:text-sm tracking-widest text-silver">CAPABILITY_MATRIX</h3>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500/50"></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 md:gap-6 relative z-10">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs md:text-sm font-mono text-silverMuted">
                      <span className="group-hover:text-white transition-colors">{skill.name}</span>
                      <span className="text-lavender font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-background rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                        className={`h-full rounded-full relative ${skill.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`}
                      >
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent to-white/30"></div>
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 pt-4 border-t border-white/10 flex justify-between items-center text-[10px] font-mono text-silverMuted relative z-10">
                <span>SYS_STATUS: <span className="text-green-400">ONLINE</span></span>
                <span>UPTIME: 99.9%</span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}