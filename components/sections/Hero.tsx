import Link from "next/link";
import { SiReact, SiNodedotjs, SiTypescript, SiDocker } from "react-icons/si";
import CodeWindow from "../ui/Codewindow";

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-[calc(100vh-80px)] flex items-center scroll-mt-20 overflow-hidden">
      <div className="max-w-[1400px] w-full mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12">
        
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-lavender/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

        <div className="flex flex-col w-full text-right relative z-10">
          <div className="flex items-center gap-4 mb-4 justify-end">
            <span className="text-silverMuted tracking-wider text-xs md:text-sm">با کد، آینده را می‌سازیم</span>
            <span className="w-8 md:w-12 h-[1px] bg-silverMuted/50"></span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.3] text-white mb-4">
            معماری زیرساخت‌های <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-lavender to-white">دیجیتال</span>
          </h1>
          
          <p className="text-silverMuted text-sm md:text-base lg:text-lg max-w-lg leading-relaxed mb-6 ml-auto mr-0">
            توسعه‌دهنده فول‌استک و معمار سیستم‌ها. با تمرکز بر کیفیت کد، مقیاس‌پذیری و راهکارهای پایدار، به ساختن سیستم‌هایی کمک می‌کنم که آینده را پشتیبانی می‌کنند.
          </p>
          
          <div className="mb-8 flex justify-start">
            <Link 
              href="#projects" 
              className="group px-5 py-2.5 md:px-6 md:py-3 bg-surface border border-lavender/40 text-white text-sm md:text-base font-medium rounded-lg hover:bg-lavender/10 transition-all duration-300 flex items-center gap-3"
            >
              <span className="text-lavender text-lg group-hover:-translate-x-1 transition-transform">←</span>
              مشاهده نمونه‌کارها
            </Link>
          </div>

          <div className="flex gap-6 items-center justify-start text-silverMuted/70">
            <SiReact size={24} className="hover:text-white transition-colors cursor-pointer md:w-[26px] md:h-[26px]" />
            <SiNodedotjs size={24} className="hover:text-white transition-colors cursor-pointer md:w-[26px] md:h-[26px]" />
            <SiTypescript size={24} className="hover:text-white transition-colors cursor-pointer md:w-[26px] md:h-[26px]" />
            <SiDocker size={24} className="hover:text-white transition-colors cursor-pointer md:w-[26px] md:h-[26px]" />
          </div>
        </div>

        {/* باکس‌های کد فقط در دسکتاپ نمایش داده می‌شوند */}
        <div className="relative w-full h-[380px] hidden lg:block z-10">
          <div className="absolute bottom-0 left-0 w-[260px] bg-surface border border-white/10 rounded-xl overflow-hidden shadow-2xl z-10" dir="ltr">
            <div className="px-3 py-2 border-b border-white/5 bg-background/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-lavender">{">"}_</span>
                <span className="text-[10px] font-mono text-silverMuted">System Status</span>
              </div>
            </div>
            <div className="p-3 flex flex-col gap-3">
              <div>
                <div className="flex justify-between items-center text-[9px] mb-2">
                  <span className="text-silverMuted flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> CI/CD Pipeline</span>
                  <span className="text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded text-[8px] border border-green-400/20">Success</span>
                </div>
                <div className="text-[8px] font-mono text-silverMuted flex flex-col gap-1.5">
                  <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Checkout code</span><span>12s</span></div>
                  <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Install dependencies</span><span>48s</span></div>
                  <div className="flex justify-between"><span className="flex items-center gap-1.5"><span className="text-green-500">✓</span> Build</span><span>1m 12s</span></div>
                </div>
              </div>
              <div className="mt-1 border-t border-white/5 pt-2">
                <div className="text-[9px] text-silverMuted mb-1">Performance</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex justify-between text-[8px] mb-1"><span>CPU</span><span className="text-lavender">12%</span></div>
                    <svg viewBox="0 0 100 20" className="w-full h-3 stroke-lavender fill-none stroke-[1.5] opacity-70"><path d="M0,15 Q10,5 20,12 T40,8 T60,15 T80,5 T100,10" /></svg>
                  </div>
                  <div>
                    <div className="flex justify-between text-[8px] mb-1"><span>Memory</span><span className="text-lavender">38%</span></div>
                    <svg viewBox="0 0 100 20" className="w-full h-3 stroke-lavender fill-none stroke-[1.5] opacity-70"><path d="M0,10 Q10,15 20,8 T40,12 T60,5 T80,15 T100,8" /></svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CodeWindow />
        </div>
      </div>
    </section>
  );
}