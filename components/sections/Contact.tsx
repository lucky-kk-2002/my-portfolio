"use client";

import { useState } from "react";
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import FadeIn from "../ui/FadeIn";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("پیام شما با موفقیت دریافت شد. به زودی پاسخ می‌دهم.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="w-full min-h-[calc(100vh-80px)] flex items-center border-t border-white/5 scroll-mt-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lavender/5 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          <FadeIn direction="right">
            <div className="flex flex-col items-end text-right">
              <div className="flex items-center gap-4 mb-4 justify-end">
                <span className="text-silverMuted tracking-wider text-xs md:text-sm">ارتباط مستقیم</span>
                <span className="w-8 md:w-12 h-[1px] bg-silverMuted/50"></span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-6xl font-black mb-6">
                شروع <span className="text-transparent bg-clip-text bg-gradient-to-l from-lavender to-white">همکاری</span>
              </h2>
              
              <p className="text-silverMuted text-sm md:text-lg leading-relaxed max-w-md mb-8 md:mb-12 ml-auto">
                اگر به دنبال یک همکاری حرفه‌ای، یا مشاوره فنی برای پروژه خود هستید، 
                من آماده‌ام تا ایده‌های شما را به واقعیت تبدیل کنم.
              </p>

              <div className="flex flex-col gap-4 md:gap-6 w-full max-w-md">
                <a href="mailto:hello@example.com" className="group flex items-center justify-start gap-4 p-3 md:p-4 rounded-xl border border-white/5 bg-surface/50 hover:bg-surface hover:border-lavender/30 transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-lavender/10 flex items-center justify-center text-lavender group-hover:scale-110 transition-transform">
                    <FiMail size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] md:text-xs text-silverMuted mb-1">ارسال ایمیل</p>
                    <p className="text-silver text-sm md:text-base font-mono">hello@example.com</p>
                  </div>
                </a>

                <div className="group flex items-center justify-start gap-4 p-3 md:p-4 rounded-xl border border-white/5 bg-surface/50 hover:bg-surface transition-all duration-300">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-background flex items-center justify-center text-silverMuted">
                    <FiMapPin size={18} className="md:w-5 md:h-5" />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] md:text-xs text-silverMuted mb-1">موقعیت مکانی</p>
                    <p className="text-silver text-sm md:text-base">تهران، ایران</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 md:gap-4 mt-8 md:mt-12">
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-silverMuted hover:text-lavender hover:border-lavender/50 hover:bg-lavender/5 transition-all duration-300">
                  <FiGithub size={18} className="md:w-5 md:h-5" />
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-silverMuted hover:text-lavender hover:border-lavender/50 hover:bg-lavender/5 transition-all duration-300">
                  <FiLinkedin size={18} className="md:w-5 md:h-5" />
                </a>
                <a href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center text-silverMuted hover:text-lavender hover:border-lavender/50 hover:bg-lavender/5 transition-all duration-300">
                  <FiTwitter size={18} className="md:w-5 md:h-5" />
                </a>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.2}>
            <div className="bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden mt-8 lg:mt-0">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-lavender to-transparent"></div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6" dir="rtl">
                <div className="flex flex-col gap-2">
                  <label className="text-xs md:text-sm text-silverMuted px-1">نام و نام خانوادگی</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full bg-background/50 border border-white/10 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-silver placeholder-silverMuted/30 focus:outline-none focus:border-lavender/50 focus:ring-1 focus:ring-lavender/50 transition-all"
                    placeholder="نام خود را وارد کنید..."
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs md:text-sm text-silverMuted px-1">ایمیل</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full bg-background/50 border border-white/10 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-silver placeholder-silverMuted/30 focus:outline-none focus:border-lavender/50 focus:ring-1 focus:ring-lavender/50 transition-all dir-ltr text-left"
                    placeholder="example@email.com"
                    dir="ltr"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs md:text-sm text-silverMuted px-1">پیام</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="w-full bg-background/50 border border-white/10 rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-silver placeholder-silverMuted/30 focus:outline-none focus:border-lavender/50 focus:ring-1 focus:ring-lavender/50 transition-all resize-none"
                    placeholder="چطور می‌توانم کمک کنم؟"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="mt-2 w-full py-3 md:py-4 text-sm md:text-base bg-lavender text-background font-bold rounded-lg hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(184,161,255,0.2)] hover:shadow-[0_0_30px_rgba(184,161,255,0.4)] flex justify-center items-center gap-2"
                >
                  ارسال پیام
                  <span className="text-lg md:text-xl">↗</span>
                </button>
              </form>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}