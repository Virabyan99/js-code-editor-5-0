"use client";
import Panel from '../components/Panel';
import { motion, PanInfo, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const GUTTER_SIZE = 8;
const TOTAL_GUTTER_COUNT = 3;

const containerVariants = {
  hidden: { scale: 0.95 },
  visible: { scale: 1, transition: { duration: 0.3, when: 'beforeChildren', staggerChildren: 0.1 } },
};

export default function Home() {
  const [leftWidth, setLeftWidth] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const springWidth = useSpring(leftWidth, { stiffness: 300, damping: 30 });

  useEffect(() => {
    springWidth.set(leftWidth);
  }, [leftWidth, springWidth]);

  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const totalGutterWidth = GUTTER_SIZE * TOTAL_GUTTER_COUNT;
    const contentWidth = containerWidth - totalGutterWidth;
    const deltaPercentage = (info.delta.x / contentWidth) * 100;
    const newLeftWidth = Math.max(25, Math.min(75, leftWidth + deltaPercentage));
    setLeftWidth(newLeftWidth);
    springWidth.set(newLeftWidth);
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentWidth = springWidth.get();
    const snappedWidth = Math.max(25, Math.min(75, currentWidth));
    springWidth.set(snappedWidth);
    setLeftWidth(snappedWidth);
  };

  const getDragConstraints = () => {
    const containerWidth = containerRef.current?.offsetWidth || 0;
    const totalGutterWidth = GUTTER_SIZE * TOTAL_GUTTER_COUNT;
    const contentWidth = containerWidth - totalGutterWidth;
    return { left: -(contentWidth * 0.25), right: contentWidth * 0.25 };
  };

  return (
    <motion.main
      ref={containerRef}
      className="flex flex-col md:flex-row flex-grow gap-2 bg-gray-100 "  // Removed p-2
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Panel
        title="Editor Panel"
        content="Write your JavaScript here"
        style={{ flexBasis: `calc(${springWidth}% - 4px)` }}
      />
      <motion.div
        className="w-full md:w-2 h-px md:h-full bg-gray-400 cursor-col-resize"
        drag="x"
        dragConstraints={getDragConstraints()}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        whileHover={{ backgroundColor: '#6b7280' }}
        whileDrag={{ scale: 1.2, backgroundColor: '#6b7280' }}
        transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      />
      <Panel
        title="Output Panel"
        content="See your results here"
        style={{ flexBasis: `calc(${100 - springWidth}% - 4px)` }}
      />
      <button
        onClick={() => {
          setLeftWidth(50);
          springWidth.set(50);
        }}
        className="md:hidden p-2 bg-blue-500 text-white rounded mt-2"
      >
        Reset Panels (Mobile)
      </button>
    </motion.main>
  );
}