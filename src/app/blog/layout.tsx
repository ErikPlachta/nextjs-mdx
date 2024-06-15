"use client";
import { AnimatePresence } from "framer-motion";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // TODO: 20240615 #EP || Verify integrity of this.
    <AnimatePresence initial={false} mode="wait">
      {children}
    </AnimatePresence>
  );
}
