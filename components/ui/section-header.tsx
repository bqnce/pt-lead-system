"use client";

import { motion, Variants } from "framer-motion";
import { Sparkles, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SectionHeaderProps {
  title: string;
  badge?: string;
  description?: string;
  icon?: LucideIcon;
  centered?: boolean;
  className?: string;
  dark?: boolean; // Ha sötét háttéren használod
}

export function SectionHeader({
  title,
  badge,
  description,
  icon: Icon = Sparkles, // Alapértelmezett ikon
  centered = true,
  className,
  dark = false,
}: SectionHeaderProps) {
  
  // Alap animációs variánsok, amik öröklik a szülő stagger beállításait
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <div className={cn("mb-12 md:mb-20", centered ? "text-center" : "text-left", className)}>
      
      {/* Badge (opcionális) */}
      {badge && (
        <motion.div variants={itemVariants} className="inline-block">
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-sm mb-6",
            dark 
              ? "bg-slate-800 border-slate-700" 
              : "bg-slate-50 border-slate-100"
          )}>
            <Icon className={cn("w-3.5 h-3.5", dark ? "text-blue-400" : "text-blue-500")} />
            <span className={cn(
              "bg-clip-text text-transparent text-[10px] font-black uppercase tracking-[0.25em]",
              dark 
                ? "bg-linear-to-r from-blue-400 via-indigo-300 to-blue-400" 
                : "animate-shimmer bg-linear-to-r from-blue-700 via-indigo-500 to-blue-700"
            )}>
              {badge}
            </span>
          </div>
        </motion.div>
      )}

      {/* Cím */}
      <motion.h2
        variants={itemVariants}
        className={cn(
          "text-3xl md:text-5xl font-black tracking-tight leading-tight",
          dark ? "text-white" : "text-slate-900"
        )}
      >
        {title}
      </motion.h2>

      {/* Dekoratív vonal VAGY leírás */}
      <motion.div variants={itemVariants}>
        {description ? (
          <p className={cn("mt-6 text-lg max-w-2xl mx-auto", dark ? "text-slate-400" : "text-slate-600")}>
            {description}
          </p>
        ) : (
          <div className={cn(
            "mt-4 h-1.5 w-24 rounded-full",
            centered ? "mx-auto" : "",
            "bg-blue-600"
          )} />
        )}
      </motion.div>
    </div>
  );
}