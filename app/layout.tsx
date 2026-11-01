import type { Metadata } from "next";
import { Vazirmatn, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "../components/ui/ScrollProgress";
import CommandMenu from "../components/ui/CommandMenu";
import CustomCursor from "../components/ui/CustomCursor"; // چک کن این خط هست
import Footer from "../components/layout/Footer";
import { ThemeProvider } from "../components/providers/ThemeProvider";

const vazirmatn = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazirmatn", weight: ["400", "700", "900"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: "K / | مهندس نرم‌افزار ارشد",
  description: "طراحی و توسعه سیستم‌های مقیاس‌پذیر",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className={`${vazirmatn.variable} ${jetbrains.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <CustomCursor /> {/* چک کن این خط هست */}
          <ScrollProgress />
          <CommandMenu />
          
          <div className="flex-grow">
            {children}
          </div>
          
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}