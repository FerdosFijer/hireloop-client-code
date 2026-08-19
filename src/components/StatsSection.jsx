"use client";

import { Card } from "@heroui/react";
import { Briefcase, Factory, Person, CircleCheck } from "@gravity-ui/icons";
import { motion } from "motion/react"

const stats = [
  { value: "50K", label: "Active Jobs", icon: Briefcase },
  { value: "12K", label: "Companies", icon: Factory },
  { value: "2M", label: "Job Seekers", icon: Person },
  { value: "97%", label: "Satisfaction Rate", icon: CircleCheck },
];

const StatsSection = () => {
  return (
    <section className="relative w-full overflow-hidden bg-[#050507] py-12 sm:py-16 lg:py-20">
      {/* Full width globe background */}
      <div className=" absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 " style={{ backgroundImage: "url('/images/globe.png')" }}></div>

      {/* Main content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mt-40">
        
        {/* Heading */}
        <div className="relative z-10 w-full text-center">
          <h2 className="mx-auto max-w-90 text-3xl font-semibold  text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] sm:max-w-xl ">
            Assisting over <span className="text-[#9d94ff]">15,000</span> job seekers
            <br className="hidden sm:block" />
            find their dream positions.
          </h2> 
        </div>

        {/* Statistics */}
        <div className="relative z-10 mt-10  grid w-full grid-cols-2 gap-3  sm:gap-4  lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Card key={stat.label} className="group min-h-30 rounded-xl border border-white/10 bg-[#111113]/10 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.70)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#7166ff]/50 hover:bg-[#111113]/50 hover:shadow-[0_20px_60px_rgba(81,70,255,0.20)] sm:min-h-33.75 sm:p-5 lg:min-h-36.25 lg:p-5">
                {/* Icon */}
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/4 text-white/60 transition-all duration-300 group-hover:border-[#7166ff]/40 group-hover:bg-[#7166ff]/10 group-hover:text-[#9d94ff] group-hover:shadow-[0_0_20px_rgba(113,102,255,0.25)]">
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Value */}
                <h3 className="mt-3 text-2xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-[#b0a9ff] sm:text-3xl lg:text-4xl">
                  {stat.value}
                </h3>

                {/* Label */}
                <p className="mt-1 text-[10px] text-white/45 transition-colors duration-300 group-hover:text-white/60 sm:text-xs">
                  {stat.label}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;