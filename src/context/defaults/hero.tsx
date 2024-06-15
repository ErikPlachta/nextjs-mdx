/**
 * Hero default values used by component src/components/hero.tsx
 *
 * @name heroDefault
 * @file src/context/defaults/hero.ts
 * @memberof module:context
 * @module context.hero
 * @see src/components/hero.tsx
 * @see src/context/config/index.tsx
 * @requires HeroDefault Default Types for Hero component.
 * @returns {HeroDefault} Default values for Hero component.
 *
 * @changelog
 *  - 0.0.1 | 2023-08-26 | feat: Initial version extracted from component.
 */
import { HeroDefault } from "@/types";
/**
 * Returns default values for Hero component.
 *
 * @returns {HeroDefault} Default values for Hero component.
 */
export default function Hero(): HeroDefault {
  return {
    content: {
      title: "HERO_TITLE_UNDEFINED",
      description: "HERO_DESCRIPTION_UNDEFINED",
    },
    dataRole: {
      wrapper: "hero-wrapper",
      title: "hero-title",
      description: "hero-description",
    },
    layout: "1x1",
    style: {
      wrapper: {
        // tailwinds: "grid grid-cols-1 gap-4",
        tailwinds:
          "mt-10 min-h-[100px] grid grid-cols-1 border-solid border-t-0 border-l-0 border-r-0 border-blue-700/30 border-[2px] pb-4",
      },
      title: {
        tailwinds: "sticky text-4xl font-medium tracking-medium",
      },
      description: {
        tailwinds: "text-lg font-light",
      },
    },
  };
}
