import { Project } from "../types";

export const projectsData: Project[] = [
  {
    id: "1",
    title: "منوی دیجیتال کافه",
    description: "سیستم منوی QR با سفارش‌گیری و ثبت نظرات. حذف هزینه‌های چاپ و مدیریت لحظه‌ای.",
    techStack: ["Next.js", "Tailwind", "PostgreSQL"],
    imageUrl: "/images/cafe.jpg", // فعلا فیک است
    link: "#",
  },
  {
    id: "2",
    title: "پلتفرم هوشمند طلا",
    description: "خرید آنلاین طلا با قفل قیمت لحظه‌ای و دستیار هوش مصنوعی برای پاسخ به سوالات.",
    techStack: ["React", "Node.js", "Redis"],
    imageUrl: "/images/gold.jpg",
    link: "#",
  },
  {
    id: "3",
    title: "اجاره املاک و خودرو",
    description: "پلتفرم یکپارچه با شمارش معکوس لحظه‌ای و محاسبه کیلومتراژ خودرو با GPS.",
    techStack: ["Next.js", "Mapbox", "MongoDB"],
    imageUrl: "/images/rent.jpg",
    link: "#",
  },
  {
    id: "4",
    title: "چت مکانی و توسعه‌پذیر",
    description: "چت ناشناس مبتنی بر موقعیت با ترجمه خودکار و اجرای کد برای توسعه‌دهندگان.",
    techStack: ["Socket.io", "WebRTC", "Express"],
    imageUrl: "/images/chat.jpg",
    link: "#",
  },
  {
    id: "5",
    title: "داشبورد بهره‌وری ماژولار",
    description: "پلنر شخصی‌سازی‌پذیر با تغییر تم بر اساس تصویر پس‌زمینه و سیستم درگ و دراپ.",
    techStack: ["React", "Framer Motion", "Tailwind"],
    imageUrl: "/images/planner.jpg",
    link: "#",
  },
  {
    id: "6",
    title: "پورتفولیو شخصی",
    description: "همین سایتی که در حال مشاهده آن هستید. طراحی تیره، لوکس و کاملاً راست‌چین.",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript"],
    imageUrl: "/images/portfolio.jpg",
    link: "#",
  }
];