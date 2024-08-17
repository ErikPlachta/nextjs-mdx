"use client";
import { AnimatePresence } from "framer-motion";

/**
 * Custom layout for the blog dashboard.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // TODO: 20240615 #EP || Verify this is needed.
    <AnimatePresence initial={false} mode="wait">
      {children}
    </AnimatePresence>
  );
}
