"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Header from '@/components/Header'

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const words = ["WORLD", "COMPUTING", "ORGANIZATION"];
  
  return (
    <main className="relative min-h-screen bg-white overflow-hidden flex items-center cursor-none">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        >
          <source src="/wcovid.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Cursor Effect */}
      <motion.div
        className="fixed w-16 h-16 rounded-full bg-red-600/100 blur-2xl pointer-events-none mix-blend-multiply"
        animate={{
          x: mousePosition.x - 32,
          y: mousePosition.y - 400,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 400,
          mass: 0.8,
        }}
      />

      {/* Navigation */}
      <nav className="fixed left-3/4 top-0 p-8 flex gap-2 text-gray-500 z-20">
        {mounted && (
          <motion.div
            className="flex gap-2"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.8,
            }}
          >
            <Link href="/board" className="hover:text-gray-900 transition-colors cursor-none">
              BOARD
            </Link>
            <span className="text-gray-400">,</span>
            <Link href="/members" className="hover:text-gray-900 transition-colors cursor-none">
              MEMBERS
            </Link>
            <span className="text-gray-400">,</span>
            <Link href="/projects" className="hover:text-gray-900 transition-colors cursor-none">
              PROJECTS
            </Link>
          </motion.div>
        )}
      </nav>

      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="text-[50vw] font-black text-gray-100">WCO</div>
      </div>
      
      {/* Main Content */}
      <div className="z-10 pl-8 md:pl-16">
        <div className="flex flex-col items-start">
          {mounted && words.map((word, index) => (
            <motion.div
              key={word}
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              <h1 className="text-[12vw] font-black leading-[0.85] tracking-tighter text-gray-900">
                {word}
              </h1>
            </motion.div>
          ))}
        </div>
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 text-2xl text-gray-600 font-medium"
        >
          San Diego State University
        </motion.div>
      </div>
    </main>
  );
}
