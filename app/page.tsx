"use client";
import Panel from '../components/Panel';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.main
      className="flex flex-row flex-grow"
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Panel title="Editor Panel" content="Write your JavaScript here" />
      <div className="w-px bg-gray-400" />
      <Panel title="Output Panel" content="See your results here" />
    </motion.main>
  );
}