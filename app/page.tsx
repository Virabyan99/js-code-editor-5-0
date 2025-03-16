"use client";
import Panel from '../components/Panel';
import { motion, PanInfo } from 'framer-motion';
import { useRef, useState } from 'react';

const containerVariants = {
  hidden: { scale: 0.95 },
  visible: {
    scale: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  const [leftWidth, setLeftWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const deltaPercentage = (info.delta.x / containerWidth) * 100;
    const newLeftWidth = Math.max(10, Math.min(90, leftWidth + deltaPercentage));
    setLeftWidth(newLeftWidth);
  };

  const resetWidth = () => setLeftWidth(50);

  const containerWidth = containerRef.current?.offsetWidth || 0;
  const dragConstraints = {
    left: -(containerWidth * 0.4),
    right: containerWidth * 0.4,
  };

  return (
    <motion.main
      ref={containerRef}
      className="flex flex-col md:flex-row flex-grow"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Panel
        title="Editor Panel"
        content="Write your JavaScript here"
        style={{ flexBasis: `${leftWidth}%` }}
      />
      <motion.div
        className="w-full md:w-px h-px md:h-full bg-gray-400 cursor-col-resize"
        drag="x"
        dragConstraints={dragConstraints}
        onDrag={handleDrag}
      />
      <Panel
        title="Output Panel"
        content="See your results here"
        style={{ flexBasis: `${100 - leftWidth}%` }}
      />
      <button
        onClick={resetWidth}
        className="md:hidden p-2 bg-blue-500 text-white rounded mt-2"
      >
        Reset Panels (Mobile)
      </button>
    </motion.main>
  );
}
