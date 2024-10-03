import type { Metadata } from "next";
import { Fugaz_One, Open_Sans } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  weight: "500",
  subsets: ["latin"],
});
const fugaz = Fugaz_One({
  variable: "--font-fugaz-one",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moodl",
  description: "Track your daily mood, every ay of the year!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 ">
      <h1 className={`textGradient text-base font-fugaz`}><Link href="/">Moodl</Link></h1>
      <div className="flex items-center justify-between">
        PLACEHOLDER CTA || STATS
      </div>
    </header>
  );
  const footer = (
    <footer className="p-4 sm:p-8 flex justify-center font-fugaz text-indigo-600 gap-1">
      <p className="opacity-90">Created with 💛 by</p><a href="https://isabella-riquetti.netlify.app/" target="_blank" className="opacity-90 hover:opacity-100 hover:underline">Isabella</a>
    </footer>
  );
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} ${fugaz.variable} antialiased w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 font-sans`}
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
