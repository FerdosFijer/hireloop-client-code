"use client";

import React from "react";
import { Card } from "@heroui/react";

export default function StatCard({ title, value, icon: Icon1 }) {
  return (
    <Card className="bg-[#18181b] border border-[#27272a] shadow-sm rounded-xl p-4 min-w-60">
      <Card.Content className="flex flex-col justify-between p-4">
        {/* Icon Box */}
        {Icon1 && (
          <div className="w-10 h-10 rounded-lg bg-[#27272a] flex items-center justify-center text-zinc-300">
            <Icon1 className="w-5 h-5" />
          </div>
        )}

        {/* Text & Value */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-zinc-400 font-normal">
            {title}
          </span>
          <span className="text-2xl font-semibold text-white tracking-tight">
            {value}
          </span>
        </div>
      </Card.Content>
    </Card>
  );
}