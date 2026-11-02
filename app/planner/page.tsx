"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { 
  FiArrowRight, FiClock, FiCheckSquare, FiCalendar, FiPlus, FiTrash2, 
  FiMove, FiImage, FiPlay, FiPause, FiRotateCcw, FiChevronDown, FiChevronUp, 
  FiCloud, FiMapPin, FiMaximize2, FiMinimize2, FiActivity, FiMusic, FiFileText, FiEye, FiEyeOff, FiX 
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { getColorSync } from "colorthief";

// DND Kit imports
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type WidgetType = "clock" | "todo" | "calendar" | "pomodoro" | "weather" | "habit" | "ambient" | "notes";

interface Widget {
  id: string;
  type: WidgetType;
  isWide?: boolean;
}

interface Task {
  id: number;
  text: string;
  description?: string;
  dueDate?: string;
  completed: boolean;
}

interface Note {
  id: number;
  text: string;
  color: string;
}

function getWeatherInfo(code: number) {
  if (code === 0) return { text: "صاف", icon: "☀️" };
  if (code === 1 || code === 2 || code === 3) return { text: "نیمه ابری", icon: "⛅" };
  if (code === 45 || code === 48) return { text: "مه‌آلود", icon: "🌫️" };
  if (code >= 51 && code <= 55) return { text: "ریزباران", icon: "🌧️" };
  if (code >= 61 && code <= 65) return { text: "بارانی", icon: "🌧️" };
  if (code >= 71 && code <= 75) return { text: "برفی", icon: "❄️" };
  if (code >= 95) return { text: "رعد و برق", icon: "⛈️" };
  return { text: "نامشخص", icon: "🌤️" };
}

function SortableWidget({ widget, children, onRemove, onToggleSize, accentColor }: { widget: Widget, children: React.ReactNode, onRemove: (id: string) => void, onToggleSize: (id: string) => void, accentColor: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
    borderColor: isDragging ? accentColor : undefined,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
      className={`relative group ${widget.isWide ? 'sm:col-span-2' : ''}`}
    >
      <button onClick={() => onToggleSize(widget.id)} className="absolute top-4 right-12 text-silverMuted hover:text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        {widget.isWide ? <FiMinimize2 size={16} /> : <FiMaximize2 size={16} />}
      </button>

      <button onClick={() => onRemove(widget.id)} className="absolute top-4 left-4 text-red-500/50 hover:text-red-500 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <FiTrash2 size={16} />
      </button>

      <div {...attributes} {...listeners} className="absolute top-4 right-4 text-silverMuted hover:text-white cursor-grab active:cursor-grabbing z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <FiMove size={18} />
      </div>

      {children}
    </motion.div>
  );
}

function getDateStatus(dueDate: string) {
  if (!dueDate) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate); due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const formattedDate = due.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
  
  if (diffDays < 0) return { text: formattedDate, className: "bg-red-500/20 text-red-400 border-red-500/30" };
  if (diffDays === 0) return { text: `امروز`, className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" };
  if (diffDays === 1) return { text: `فردا`, className: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
  return { text: formattedDate, className: "bg-white/10 text-silver border-white/20" };
}

export default function PlannerPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [habits, setHabits] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  const [bgImage, setBgImage] = useState<string | null>(null);
  const [accentColor, setAccentColor] = useState("#B8A1FF");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // === Ambient Sound ===
  const [ambientPlaying, setAmbientPlaying] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const soundUrls = {
    rain: "https://www.soundjay.com/nature/rain-01.mp3",
    cafe: "https://www.soundjay.com/human/crowd-talking-1.mp3",
    forest: "https://www.soundjay.com/nature/forest-01.mp3"
  };

  useEffect(() => {
    if (audioRef.current) {
      if (ambientPlaying) {
        audioRef.current.src = soundUrls[ambientPlaying as keyof typeof soundUrls];
        audioRef.current.loop = true;
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [ambientPlaying]);

  // === ساعت ===
  const [time, setTime] = useState<Date | null>(null);
  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // === آب‌وهوا ===
  const [weather, setWeather] = useState<{ temp: number; code: number; location: string } | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    const fetchWeather = async (lat: number, lon: number, locName: string) => {
      setWeatherLoading(true);
      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const data = await res.json();
        if (data.current_weather) setWeather({ temp: Math.round(data.current_weather.temperature), code: data.current_weather.weathercode, location: locName });
      } catch (e) { console.error(e); } finally { setWeatherLoading(false); }
    };

    if (widgets.some(w => w.type === "weather") && !weather) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => fetchWeather(position.coords.latitude, position.coords.longitude, "موقعیت شما"),
          () => fetchWeather(35.6892, 51.3890, "تهران")
        );
      } else { fetchWeather(35.6892, 51.3890, "تهران"); }
    }
  }, [widgets, weather]);

  // === پومودورو ===
  const [pomoTime, setPomoTime] = useState(25 * 60);
  const [pomoActive, setPomoActive] = useState(false);
  const [pomoMode, setPomoMode] = useState<"work" | "break">("work");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (pomoActive && pomoTime > 0) {
      interval = setInterval(() => setPomoTime((prev) => prev - 1), 1000);
    } else if (pomoTime === 0) {
      setPomoActive(false);
      if (pomoMode === "work") { setPomoMode("break"); setPomoTime(5 * 60); } 
      else { setPomoMode("work"); setPomoTime(25 * 60); }
    }
    return () => clearInterval(interval);
  }, [pomoActive, pomoTime, pomoMode]);

  const togglePomo = () => setPomoActive(!pomoActive);
  const resetPomo = () => { setPomoActive(false); setPomoTime(pomoMode === "work" ? 25 * 60 : 5 * 60); };
  const switchPomoMode = () => {
    setPomoActive(false);
    if (pomoMode === "work") { setPomoMode("break"); setPomoTime(5 * 60); } 
    else { setPomoMode("work"); setPomoTime(25 * 60); }
  };
  const formatPomoTime = () => {
    const mins = Math.floor(pomoTime / 60);
    const secs = pomoTime % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // === تقویم ===
  const renderCalendar = () => {
    const now = new Date(); const year = now.getFullYear(); const month = now.getMonth(); const today = now.getDate();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const startDay = (firstDayOfMonth + 1) % 7;
    const days = [];
    for (let i = 0; i < startDay; i++) days.push(<div key={`empty-${i}`} className="text-transparent text-xs">0</div>);
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today;
      days.push(<div key={d} className={`flex items-center justify-center h-6 w-6 rounded-full text-xs transition-colors ${isToday ? 'font-bold text-background' : 'text-silver hover:bg-white/10'}`} style={{ backgroundColor: isToday ? accentColor : 'transparent' }}>{d}</div>);
    }
    return days;
  };

  // === هبیت ترکر ===
  const renderHabits = () => {
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const isDone = habits.includes(dateStr);
      days.push(
        <div 
          key={dateStr} 
          onClick={() => toggleHabit(dateStr)}
          title={d.toLocaleDateString('fa-IR')}
          className={`w-4 h-4 sm:w-5 sm:h-5 rounded-sm cursor-pointer transition-colors ${isDone ? 'bg-green-500' : 'bg-white/10 hover:bg-white/20'}`}
        />
      );
    }
    return days;
  };

  const toggleHabit = (date: string) => {
    if (habits.includes(date)) setHabits(habits.filter(h => h !== date));
    else setHabits([...habits, date]);
  };

  // === یادداشت‌ها ===
  const [newNoteText, setNewNoteText] = useState("");
  const [newNoteColor, setNewNoteColor] = useState("#fef08a");
  const noteColors = ["#fef08a", "#fbcfe8", "#bfdbfe", "#bbf7d0", "#e5e7eb"];

  const addNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim()) return;
    setNotes([...notes, { id: Date.now(), text: newNoteText, color: newNoteColor }]);
    setNewNoteText("");
  };

  const deleteNote = (id: number) => setNotes(notes.filter(n => n.id !== id));

  // === بارگذاری و ذخیره‌سازی ===
  useEffect(() => {
    setIsMounted(true);
    const savedWidgets = localStorage.getItem("planner_widgets_v6");
    if (savedWidgets) try { setWidgets(JSON.parse(savedWidgets)); } catch (e) {}
    const savedTasks = localStorage.getItem("planner_tasks");
    if (savedTasks) try { setTasks(JSON.parse(savedTasks)); } catch (e) {}
    const savedNotes = localStorage.getItem("planner_notes");
    if (savedNotes) try { setNotes(JSON.parse(savedNotes)); } catch (e) {}
    const savedHabits = localStorage.getItem("planner_habits");
    if (savedHabits) try { setHabits(JSON.parse(savedHabits)); } catch (e) {}
    const savedBg = localStorage.getItem("planner_bg");
    if (savedBg) setBgImage(savedBg);
    const savedColor = localStorage.getItem("planner_color");
    if (savedColor) setAccentColor(savedColor);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("planner_widgets_v6", JSON.stringify(widgets));
      localStorage.setItem("planner_tasks", JSON.stringify(tasks));
      localStorage.setItem("planner_notes", JSON.stringify(notes));
      localStorage.setItem("planner_habits", JSON.stringify(habits));
      if (bgImage) localStorage.setItem("planner_bg", bgImage);
      localStorage.setItem("planner_color", accentColor);
    }
  }, [widgets, tasks, notes, habits, bgImage, accentColor, isMounted]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const color = getColorSync(img);
          setAccentColor(`rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        };
        img.src = event.target?.result as string;
        setBgImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setWidgets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const [newTask, setNewTask] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, description: newTaskDesc, dueDate: newTaskDate, completed: false }]);
    setNewTask(""); setNewTaskDesc(""); setNewTaskDate(""); setShowAdvanced(false);
  };

  const toggleTask = (id: number) => setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = (id: number) => setTasks(tasks.filter(t => t.id !== id));

  const addWidget = (type: WidgetType) => {
    if (!widgets.find(w => w.type === type)) setWidgets([...widgets, { id: `${type}-${Date.now()}`, type, isWide: false }]);
    setIsMenuOpen(false);
  };
  const removeWidget = (id: string) => setWidgets(widgets.filter((w) => w.id !== id));
  const toggleSize = (id: string) => setWidgets(widgets.map(w => w.id === id ? { ...w, isWide: !w.isWide } : w));

  const incompleteTasksCount = tasks.filter(t => !t.completed).length;

  if (!isMounted) return <div className="min-h-screen bg-[#05010A] flex items-center justify-center text-white font-mono">LOADING PLANNER...</div>;

  // ==========================================
  // حالت تمرکز (Focus Mode)
  // ==========================================
  if (isFocusMode) {
    return (
      <div className="planner-wrapper min-h-screen bg-[#05010A] flex flex-col items-center justify-center relative overflow-hidden" dir="rtl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-lavender/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <button onClick={() => setIsFocusMode(false)} className="absolute top-8 right-8 text-white bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors z-50">
          <FiX size={24} />
        </button>

        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center z-10">
          <h2 className="text-2xl text-silverMuted mb-12 tracking-widest uppercase font-mono">FOCUS_MODE</h2>
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <circle cx="50" cy="50" r="45" fill="none" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * (pomoTime / (pomoMode === "work" ? 25 * 60 : 5 * 60)))} className="transition-all duration-1000 ease-linear" style={{ filter: `drop-shadow(0 0 12px ${accentColor})` }} />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-6xl md:text-7xl font-mono text-white">{formatPomoTime()}</span>
              <span className="text-sm text-silverMuted uppercase tracking-widest mt-2">{pomoMode === "work" ? "FOCUS" : "BREAK"}</span>
            </div>
          </div>
          <div className="flex gap-6 mt-12">
            <button onClick={togglePomo} className="w-16 h-16 rounded-full flex items-center justify-center text-background transition-transform hover:scale-110 shadow-lg" style={{ backgroundColor: accentColor, boxShadow: `0 0 30px ${accentColor}80` }}>
              {pomoActive ? <FiPause size={28} /> : <FiPlay size={28} className="ml-1" />}
            </button>
            <button onClick={resetPomo} className="w-16 h-16 rounded-full flex items-center justify-center bg-white/5 text-silver hover:bg-white/10 transition-colors border border-white/10">
              <FiRotateCcw size={24} />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // ==========================================
  // حالت عادی
  // ==========================================
  return (
    <div className="planner-wrapper min-h-screen relative flex flex-col" dir="rtl">
      
      {/* پس‌زمینه و لایه تاریک (افزایش شفافیت برای خوانایی بهتر) */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute inset-0 transition-opacity duration-700" style={{ backgroundColor: bgImage ? "transparent" : "#05010A", backgroundImage: bgImage ? `url(${bgImage})` : "none", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <div className={`absolute inset-0 transition-opacity duration-700 ${bgImage ? "bg-black/85 backdrop-blur-md" : "bg-transparent"}`}></div>
      </div>

      <header className="w-full px-4 py-4 md:px-6 md:py-6 flex justify-between items-center z-10 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-sm md:text-base text-silverMuted hover:text-white transition-colors">
            <FiArrowRight /><span className="hidden sm:inline">بازگشت به سایت</span>
          </Link>
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 text-xs md:text-sm text-silverMuted hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
            <FiImage /><span className="hidden sm:inline">تغییر پس‌زمینه</span>
          </button>
          <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
        </div>
        
        <div className="flex items-center gap-3">
          <button onClick={() => setIsFocusMode(true)} className="flex items-center gap-2 text-xs md:text-sm text-lavender hover:text-white transition-colors bg-lavender/10 hover:bg-lavender/20 px-4 py-1.5 rounded-lg border border-lavender/30">
            <FiEye size={16} /> <span className="hidden sm:inline">حالت تمرکز</span>
          </button>
          <h1 className="font-mono text-xs md:text-sm tracking-widest text-white hidden sm:block">MODULAR_PLANNER</h1>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 relative z-10">
        {widgets.length === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-50 pointer-events-none px-4">
             <div className="w-16 h-16 md:w-20 md:h-20 border-2 border-dashed rounded-2xl flex items-center justify-center mb-4" style={{ borderColor: accentColor }}>
              <FiPlus size={24} className="md:w-8 md:h-8" style={{ color: accentColor }} />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2">بوم شما خالی است</h2>
            <p className="text-silverMuted text-sm md:text-base max-w-sm">با استفاده از دکمه پلاس در پایین صفحه، ویجت‌های مورد نیاز خود را اضافه کنید.</p>
          </div>
        )}

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={widgets.map(w => w.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-min items-start">
              
              <AnimatePresence>
                {widgets.map(widget => (
                  <SortableWidget key={widget.id} widget={widget} onRemove={removeWidget} onToggleSize={toggleSize} accentColor={accentColor}>
                    
                    {widget.type === "clock" && (
                      <div className={`bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all h-full shadow-2xl ${widget.isWide ? 'flex flex-col justify-center items-center' : ''}`} style={{ boxShadow: `0 0 20px ${accentColor}20` }}>
                        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6 border-b border-white/10 pb-3 md:pb-4 w-full">
                          <FiClock size={18} style={{ color: accentColor }} /> <span className="font-bold text-sm md:text-base text-white">ساعت زنده</span>
                        </div>
                        <div className={`font-mono text-white text-center tracking-tight ${widget.isWide ? 'text-5xl md:text-7xl' : 'text-3xl md:text-5xl'}`}>
                          {time ? time.toLocaleTimeString('en-US', { hour12: false }) : "--:--:--"}
                        </div>
                        <div className="text-center text-silverMuted text-xs md:text-sm mt-2 font-mono">
                          {time ? time.toLocaleDateString('fa-IR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "..."}
                        </div>
                      </div>
                    )}

                    {widget.type === "weather" && (
                      <div className={`bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all flex flex-col shadow-2xl ${widget.isWide ? 'sm:flex-row sm:items-center sm:justify-between sm:p-10' : ''}`} style={{ boxShadow: `0 0 20px ${accentColor}20` }}>
                        <div className={`flex items-center gap-2 md:gap-3 mb-4 border-b border-white/10 pb-3 w-full ${widget.isWide ? 'sm:border-none sm:mb-0 sm:pb-0 sm:w-auto' : ''}`}>
                          <FiCloud size={18} style={{ color: accentColor }} /> <span className="font-bold text-sm md:text-base text-white">آب و هوا</span>
                        </div>
                        
                        {weatherLoading ? (
                          <div className="flex flex-col items-center justify-center flex-1 gap-2 text-silverMuted">
                            <div className="w-6 h-6 border-2 border-lavender border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xs">در حال دریافت...</span>
                          </div>
                        ) : weather ? (
                          <div className={`flex flex-col items-center justify-center flex-1 gap-1 ${widget.isWide ? 'sm:flex-row sm:gap-8 sm:flex-none' : ''}`}>
                            <div className={`flex items-center gap-2 mb-2 text-silverMuted text-xs ${widget.isWide ? 'sm:mb-0' : ''}`}>
                              <FiMapPin size={12} /> {weather.location}
                            </div>
                            <div className={`flex items-center gap-4 ${widget.isWide ? 'sm:flex-col sm:gap-0' : 'flex-col'}`}>
                              <div className="text-5xl md:text-6xl mb-2">{getWeatherInfo(weather.code).icon}</div>
                              <div className="text-4xl md:text-5xl font-mono text-white font-bold">{weather.temp}°C</div>
                            </div>
                            <div className="text-silverMuted text-sm mt-1">{getWeatherInfo(weather.code).text}</div>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center flex-1 text-silverMuted text-xs">خطا در دریافت اطلاعات</div>
                        )}
                      </div>
                    )}

                    {widget.type === "todo" && (
                      <div className={`bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all flex flex-col shadow-2xl h-[400px]`} style={{ boxShadow: `0 0 20px ${accentColor}20` }}>
                        <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-3">
                          <div className="flex items-center gap-2 md:gap-3">
                            <FiCheckSquare size={18} style={{ color: accentColor }} /> <span className="font-bold text-sm md:text-base text-white">تسک‌لیست</span>
                          </div>
                          <span className="text-xs font-mono px-2 py-1 rounded bg-white/5" style={{ color: accentColor }}>{incompleteTasksCount} مانده</span>
                        </div>
                        
                        <form onSubmit={addTask} className="flex flex-col gap-2 mb-3 shrink-0">
                          <div className="flex gap-2">
                            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="عنوان کار..." className="flex-1 min-w-0 bg-background/50 border border-white/10 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs md:text-sm text-white focus:outline-none transition-colors" style={{ borderColor: newTask ? accentColor : undefined }} />
                            <button type="submit" className="px-2 md:px-3 rounded-lg transition-colors shrink-0 hover:opacity-80" style={{ backgroundColor: `${accentColor}30`, color: accentColor }}><FiPlus size={16} /></button>
                          </div>
                          <button type="button" onClick={() => setShowAdvanced(!showAdvanced)} className="text-[10px] text-silverMuted hover:text-white flex items-center gap-1 self-start transition-colors">
                            {showAdvanced ? <FiChevronUp /> : <FiChevronDown />} {showAdvanced ? "بستن جزئیات" : "افزودن تاریخ و توضیحات"}
                          </button>
                          {showAdvanced && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="flex flex-col gap-2 overflow-hidden">
                              <input type="date" value={newTaskDate} onChange={(e) => setNewTaskDate(e.target.value)} className="w-full bg-background/50 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-lavender/50" style={{ colorScheme: 'dark' }} />
                              <textarea value={newTaskDesc} onChange={(e) => setNewTaskDesc(e.target.value)} placeholder="توضیحات (اختیاری)..." rows={2} className="w-full bg-background/50 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-lavender/50 resize-none" />
                            </motion.div>
                          )}
                        </form>

                        <div className={`flex flex-col gap-2 overflow-y-auto flex-1 pr-1 custom-scrollbar ${widget.isWide ? 'sm:grid sm:grid-cols-2' : ''}`}>
                          {tasks.length === 0 && <p className="text-center text-silverMuted text-xs mt-4 col-span-full">هنوز کاری اضافه نکردی.</p>}
                          {tasks.map(task => {
                            const dateStatus = task.dueDate ? getDateStatus(task.dueDate) : null;
                            return (
                              <div key={task.id} className={`flex flex-col gap-1.5 p-2.5 rounded-lg border transition-colors shrink-0 ${task.completed ? 'border-transparent bg-white/5 opacity-50' : 'border-white/10 bg-background/30'}`}>
                                <div className="flex items-center justify-between gap-2">
                                  <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                                    <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="w-4 h-4 cursor-pointer shrink-0" style={{ accentColor: accentColor }} />
                                    <span className={`text-xs md:text-sm truncate font-medium ${task.completed ? 'line-through text-silverMuted' : 'text-white'}`}>{task.text}</span>
                                  </label>
                                  <button onClick={() => deleteTask(task.id)} className="text-silverMuted hover:text-red-500 transition-colors shrink-0"><FiTrash2 size={14} /></button>
                                </div>
                                {task.description && <p className={`text-[11px] text-silverMuted pr-6 leading-relaxed ${task.completed ? 'line-through' : ''}`}>{task.description}</p>}
                                {dateStatus && !task.completed && (
                                  <div className="pr-6">
                                    <span className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border ${dateStatus.className}`}><FiCalendar size={10} />{dateStatus.text}</span>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {widget.type === "calendar" && (
                      <div className={`bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all shadow-2xl`} style={{ boxShadow: `0 0 20px ${accentColor}20` }}>
                        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3 md:pb-4">
                          <div className="flex items-center gap-2 md:gap-3"><FiCalendar size={18} style={{ color: accentColor }} /> <span className="font-bold text-sm md:text-base text-white">تقویم</span></div>
                          <span className="text-xs text-silverMuted font-mono">{new Date().toLocaleDateString('fa-IR', { month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'].map(day => (<div key={day} className="text-[10px] text-silverMuted font-bold">{day}</div>))}
                        </div>
                        <div className={`grid grid-cols-7 gap-1 text-center ${widget.isWide ? 'sm:gap-2' : ''}`}>{renderCalendar()}</div>
                      </div>
                    )}

                    {widget.type === "pomodoro" && (
                      <div className={`bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all flex flex-col items-center shadow-2xl ${widget.isWide ? 'sm:flex-row sm:justify-around sm:p-8' : ''}`} style={{ boxShadow: `0 0 20px ${accentColor}20` }}>
                        <div className={`w-full flex items-center justify-between mb-4 border-b border-white/10 pb-3 md:pb-4 ${widget.isWide ? 'sm:absolute sm:top-4 sm:left-4 sm:right-4' : ''}`}>
                          <div className="flex items-center gap-2 md:gap-3"><FiClock size={18} style={{ color: accentColor }} /> <span className="font-bold text-sm md:text-base text-white">پومودورو</span></div>
                          <button onClick={switchPomoMode} className="text-xs px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-colors text-silverMuted">{pomoMode === "work" ? "زمان استراحت" : "زمان کار"}</button>
                        </div>
                        <div className={`relative flex items-center justify-center my-2 ${widget.isWide ? 'w-40 h-40 sm:w-48 sm:h-48 mt-8' : 'w-32 h-32 md:w-40 md:h-40'}`}>
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * (pomoTime / (pomoMode === "work" ? 25 * 60 : 5 * 60)))} className="transition-all duration-1000 ease-linear" style={{ filter: `drop-shadow(0 0 8px ${accentColor})` }} />
                          </svg>
                          <div className="absolute flex flex-col items-center">
                            <span className={`font-mono text-white ${widget.isWide ? 'text-4xl' : 'text-2xl md:text-3xl'}`}>{formatPomoTime()}</span>
                            <span className="text-[10px] text-silverMuted uppercase tracking-widest">{pomoMode === "work" ? "FOCUS" : "BREAK"}</span>
                          </div>
                        </div>
                        <div className={`flex gap-3 mt-2 ${widget.isWide ? 'sm:flex-col sm:mt-8' : ''}`}>
                          <button onClick={togglePomo} className="w-10 h-10 rounded-full flex items-center justify-center text-background transition-transform hover:scale-110" style={{ backgroundColor: accentColor }}>{pomoActive ? <FiPause size={18} /> : <FiPlay size={18} className="ml-1" />}</button>
                          <button onClick={resetPomo} className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-silver hover:bg-white/10 transition-colors"><FiRotateCcw size={18} /></button>
                        </div>
                      </div>
                    )}

                    {widget.type === "habit" && (
                      <div className={`bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all shadow-2xl`} style={{ boxShadow: `0 0 20px ${accentColor}20` }}>
                        <div className="flex items-center gap-2 md:gap-3 mb-4 border-b border-white/10 pb-3">
                          <FiActivity size={18} style={{ color: accentColor }} /> <span className="font-bold text-sm md:text-base text-white">ردیاب عادت (۲۸ روز اخیر)</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 justify-center">
                          {renderHabits()}
                        </div>
                      </div>
                    )}

                    {widget.type === "ambient" && (
                      <div className={`bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all shadow-2xl`} style={{ boxShadow: `0 0 20px ${accentColor}20` }}>
                        <div className="flex items-center gap-2 md:gap-3 mb-4 border-b border-white/10 pb-3">
                          <FiMusic size={18} style={{ color: accentColor }} /> <span className="font-bold text-sm md:text-base text-white">صدای محیط</span>
                        </div>
                        <div className="flex gap-2">
                          {[
                            { id: 'rain', label: 'باران', icon: '🌧️' },
                            { id: 'cafe', label: 'کافه', icon: '☕' },
                            { id: 'forest', label: 'جنگل', icon: '🌲' }
                          ].map(sound => (
                            <button 
                              key={sound.id}
                              onClick={() => setAmbientPlaying(ambientPlaying === sound.id ? null : sound.id)}
                              className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${ambientPlaying === sound.id ? 'bg-lavender/20 border-lavender text-white' : 'bg-white/5 border-white/10 text-silverMuted hover:bg-white/10'}`}
                            >
                              <span className="text-2xl">{sound.icon}</span>
                              <span className="text-[10px]">{sound.label}</span>
                            </button>
                          ))}
                        </div>
                        <audio ref={audioRef} className="hidden" />
                      </div>
                    )}

                    {widget.type === "notes" && (
                      <div className={`bg-[#0A0A0F]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-6 transition-all flex flex-col shadow-2xl min-h-[300px]`} style={{ boxShadow: `0 0 20px ${accentColor}20` }}>
                        <div className="flex items-center gap-2 md:gap-3 mb-4 border-b border-white/10 pb-3">
                          <FiFileText size={18} style={{ color: accentColor }} /> <span className="font-bold text-sm md:text-base text-white">یادداشت سریع</span>
                        </div>
                        
                        <form onSubmit={addNote} className="flex flex-col gap-2 mb-4 shrink-0">
                          <textarea 
                            value={newNoteText} onChange={(e) => setNewNoteText(e.target.value)} placeholder="متن یادداشت..."
                            rows={2} className="w-full bg-background/50 border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none resize-none"
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex gap-1">
                              {noteColors.map(c => (
                                <button 
                                  type="button" key={c} onClick={() => setNewNoteColor(c)}
                                  className={`w-5 h-5 rounded-full border-2 ${newNoteColor === c ? 'border-white' : 'border-transparent'}`} 
                                  style={{ backgroundColor: c }}
                                />
                              ))}
                            </div>
                            <button type="submit" className="px-4 py-1 rounded-lg text-xs font-bold text-background" style={{ backgroundColor: accentColor }}>افزودن</button>
                          </div>
                        </form>

                        <div className={`flex flex-col gap-2 overflow-y-auto flex-1 pr-1 custom-scrollbar ${widget.isWide ? 'sm:grid sm:grid-cols-2' : ''}`}>
                          {notes.map(note => (
                            <div key={note.id} className="relative p-3 rounded-lg shadow-md text-black text-xs min-h-[60px] flex flex-col justify-between group/note">
                              <div className="absolute inset-0 rounded-lg -z-10" style={{ backgroundColor: note.color }}></div>
                              <p className="break-words">{note.text}</p>
                              <button onClick={() => deleteNote(note.id)} className="self-end mt-2 opacity-0 group-hover/note:opacity-100 transition-opacity">
                                <FiTrash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </SortableWidget>
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* دکمه شناور (FAB) */}
      <div style={{ position: 'fixed', bottom: '30px', left: '30px', zIndex: 9999999 }}>
        {isMenuOpen && (
          <div style={{ 
            position: 'absolute', bottom: '70px', left: '0', 
            backgroundColor: '#0A0A0F', border: '1px solid rgba(255,255,255,0.2)', 
            borderRadius: '12px', padding: '8px', display: 'flex', flexDirection: 'column', 
            gap: '8px', width: '200px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' 
          }}>
            <button onClick={() => addWidget("clock")} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-right text-sm text-white transition-colors"><FiClock size={16} /> ساعت زنده</button>
            <button onClick={() => addWidget("todo")} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-right text-sm text-white transition-colors"><FiCheckSquare size={16} /> تسک‌لیست</button>
            <button onClick={() => addWidget("calendar")} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-right text-sm text-white transition-colors"><FiCalendar size={16} /> تقویم</button>
            <button onClick={() => addWidget("pomodoro")} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-right text-sm text-white transition-colors"><FiPlay size={16} /> تایمر پومودورو</button>
            <button onClick={() => addWidget("weather")} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-right text-sm text-white transition-colors"><FiCloud size={16} /> آب و هوا</button>
            <button onClick={() => addWidget("habit")} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-right text-sm text-white transition-colors"><FiActivity size={16} /> ردیاب عادت</button>
            <button onClick={() => addWidget("ambient")} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-right text-sm text-white transition-colors"><FiMusic size={16} /> صدای محیط</button>
            <button onClick={() => addWidget("notes")} className="flex items-center gap-3 p-2 hover:bg-white/10 rounded-lg text-right text-sm text-white transition-colors"><FiFileText size={16} /> یادداشت سریع</button>
          </div>
        )}

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)} 
          style={{ 
            width: '60px', height: '60px', borderRadius: '50%', 
            backgroundColor: accentColor, /* رنگ داینامیک */
            border: '2px solid white',
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            color: 'white', cursor: 'pointer',
            boxShadow: `0 0 20px ${accentColor}80`
          }}
        >
          <FiPlus size={30} style={{ transform: isMenuOpen ? 'rotate(45deg)' : 'none', transition: '0.3s' }} />
        </button>
      </div>

    </div>
  );
}