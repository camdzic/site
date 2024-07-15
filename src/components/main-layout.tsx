'use client';

import { motion } from 'framer-motion';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.main
      initial={{ y: -25, filter: 'blur(10px)', opacity: 0 }}
      animate={{ y: 0, filter: 'blur(0)', opacity: 1 }}
      transition={{ duration: 1 }}
      className="mx-auto flex max-w-2xl flex-col space-y-10 p-6"
    >
      {children}
    </motion.main>
  );
}
