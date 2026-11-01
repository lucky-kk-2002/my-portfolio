import { FiSettings } from "react-icons/fi";

export default function CodeWindow() {
  const codeLines = [
    { num: 1, content: <><span className="text-[#c678dd]">import</span> {"{ useEffect, useState }"} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react'</span>;</> },
    { num: 2, content: <><span className="text-[#c678dd]">import</span> {"{ createRoot }"} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react-dom/client'</span>;</> },
    { num: 3, content: <><span className="text-[#c678dd]">import</span> {"{ BrowserRouter, Routes, Route }"} <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'react-router-dom'</span>;</> },
    { num: 4, content: <><span className="text-[#c678dd]">import</span> App <span className="text-[#c678dd]">from</span> <span className="text-[#98c379]">'./App'</span>;</> },
    { num: 5, content: <><span className="text-[#c678dd]">import</span> <span className="text-[#98c379]">'./styles/index.css'</span>;</> },
    { num: 6, content: <>&nbsp;</> },
    { num: 7, content: <><span className="text-[#c678dd]">const</span> root = createRoot(document.getElementById(<span className="text-[#98c379]">'root'</span>));</> },
    { num: 8, content: <>&nbsp;</> },
    { num: 9, content: <><span className="text-[#c678dd]">function</span> <span className="text-[#61afef]">Main</span>() {"{"}</> },
    { num: 10, content: <span className="pl-3"><span className="text-[#c678dd]">const</span> [isLoading, setIsLoading] = useState(<span className="text-[#d19a66]">true</span>);</span> },
    { num: 11, content: <>&nbsp;</> },
    { num: 12, content: <span className="pl-3">useEffect(() ={">"} {"{"}</span> },
    { num: 13, content: <span className="pl-6"><span className="text-[#c678dd]">const</span> timer = setTimeout(() ={">"} setIsLoading(<span className="text-[#d19a66]">false</span>), <span className="text-[#d19a66]">800</span>);</span> },
    { num: 14, content: <span className="pl-6"><span className="text-[#c678dd]">return</span> () ={">"} clearTimeout(timer);</span> },
    { num: 15, content: <span className="pl-3">{"}"}, []);</span> },
    { num: 16, content: <>&nbsp;</> },
    { num: 17, content: <span className="pl-3"><span className="text-[#c678dd]">return</span> (</span> },
    { num: 18, content: <span className="pl-6">{"<BrowserRouter>"}</span> },
    { num: 19, content: <span className="pl-9">{"<Routes>"}</span> },
    { num: 20, content: <span className="pl-12">{"<Route path=\"/\" element={<App />} />"}</span> },
    { num: 21, content: <span className="pl-9">{"</Routes>"}</span> },
    { num: 22, content: <span className="pl-6">{"</BrowserRouter>"}</span> },
    { num: 23, content: <span className="pl-3">);</span> },
    { num: 24, content: <>{"}"}</> },
  ];

  return (
    <div className="absolute top-0 right-0 w-[390px] bg-surface border border-white/10 rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] z-20" dir="ltr">
      <div className="px-3 py-2 border-b border-white/5 bg-background/50 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
          <div className="flex items-center gap-1.5 ml-3 text-[10px] font-mono text-silverMuted">
            <span className="text-[#61DAFB] text-xs">⚛</span> app.tsx
          </div>
        </div>
        <FiSettings className="text-silverMuted text-xs" />
      </div>
      
      <div className="p-3 text-[10px] font-mono text-[#abb2bf] leading-[1.6] text-left overflow-x-auto">
        {codeLines.map((line) => (
          <div key={line.num} className="flex">
            <span className="text-white/20 w-5 select-none">{line.num}</span>
            <span>{line.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
}