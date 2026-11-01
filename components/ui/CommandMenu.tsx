"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { FiHome, FiUser, FiBriefcase, FiMail, FiSun, FiMoon, FiGithub, FiLinkedin, FiX } from "react-icons/fi";

export default function CommandMenu() {
  const [open, setOpen] = useState(false);
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // چک کردن اینکه کاربر Ctrl+K یا Cmd+K را زده است
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        // جلوگیری از رفتار پیش‌فرض مرورگر (باز شدن نوار جستجو)
        e.preventDefault(); 
        e.stopPropagation();
        setOpen((open) => !open);
      }
    };
    
    const handleOpenMenu = () => setOpen(true);

    // استفاده از true (Capture Phase) برای اجرا قبل از مرورگر
    document.addEventListener("keydown", down, true);
    document.addEventListener("open-command-menu", handleOpenMenu);

    return () => {
      document.removeEventListener("keydown", down, true);
      document.removeEventListener("open-command-menu", handleOpenMenu);
    };
  }, []);

  const navigateTo = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] bg-background/60 backdrop-blur-md flex items-center justify-center p-4" 
      onClick={() => setOpen(false)}
    >
      <div 
        className="w-full max-w-2xl bg-surface/40 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(184,161,255,0.1)] p-8 relative"
        onClick={(e) => e.stopPropagation()}
        dir="rtl"
      >
        <button 
          onClick={() => setOpen(false)}
          className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-silverMuted hover:text-white transition-all"
        >
          <FiX size={18} />
        </button>

        <h2 className="text-xl font-bold text-white mb-8 text-center">دسترسی سریع</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          
          <button onClick={() => navigateTo("#home")} className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-lavender/10 hover:border-lavender/30 transition-all duration-300">
            <FiHome size={28} className="text-silverMuted group-hover:text-lavender transition-colors" />
            <span className="text-sm font-medium text-silver group-hover:text-white transition-colors">خانه</span>
          </button>

          <button onClick={() => navigateTo("#about")} className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-lavender/10 hover:border-lavender/30 transition-all duration-300">
            <FiUser size={28} className="text-silverMuted group-hover:text-lavender transition-colors" />
            <span className="text-sm font-medium text-silver group-hover:text-white transition-colors">درباره من</span>
          </button>

          <button onClick={() => navigateTo("#projects")} className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-lavender/10 hover:border-lavender/30 transition-all duration-300">
            <FiBriefcase size={28} className="text-silverMuted group-hover:text-lavender transition-colors" />
            <span className="text-sm font-medium text-silver group-hover:text-white transition-colors">پروژه‌ها</span>
          </button>

          <button onClick={() => navigateTo("#contact")} className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-lavender/10 hover:border-lavender/30 transition-all duration-300">
            <FiMail size={28} className="text-silverMuted group-hover:text-lavender transition-colors" />
            <span className="text-sm font-medium text-silver group-hover:text-white transition-colors">تماس</span>
          </button>

          <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-lavender/10 hover:border-lavender/30 transition-all duration-300">
            {theme === "dark" ? <FiSun size={28} className="text-silverMuted group-hover:text-lavender transition-colors" /> : <FiMoon size={28} className="text-silverMuted group-hover:text-lavender transition-colors" />}
            <span className="text-sm font-medium text-silver group-hover:text-white transition-colors">تغییر تم</span>
          </button>

          <a href="https://github.com/YOUR_USERNAME" target="_blank" rel="noreferrer" className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-lavender/10 hover:border-lavender/30 transition-all duration-300">
            <FiGithub size={28} className="text-silverMuted group-hover:text-lavender transition-colors" />
            <span className="text-sm font-medium text-silver group-hover:text-white transition-colors">گیت‌هاب</span>
          </a>

        </div>

        <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-lavender/10 hover:border-lavender/30 transition-all duration-300 group">
          <FiLinkedin size={24} className="text-silverMuted group-hover:text-lavender transition-colors" />
          <span className="text-sm font-medium text-silver group-hover:text-white transition-colors">مشاهده پروفایل لینکدین</span>
        </a>

      </div>
    </div>
  );
}