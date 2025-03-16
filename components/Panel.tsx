"use client";
import { motion } from 'framer-motion';

interface PanelProps {
  title: string;
  content: string;
  style?: React.CSSProperties;
}

export default function Panel({ title, content, style }: PanelProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full bg-gray-200 p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      layout
      style={style}
    >
      <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
      <p className="text-base md:text-lg">{content}</p>
    </motion.div>
  );
}
