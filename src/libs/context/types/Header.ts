import { StyleConfig } from "@/libs/context/types";

/**
 * Optional args to be passed in to Header component to override default values via src/context/config/index.tsx
 */
export interface HeaderConfig {
  content?: {
    title?: string;
    description?: string;
    nav?: NavLink[];
  };
  dataRole?: {
    wrapper?: string;
    brandingWrapper?: string;
    titleLink?: string;
    title?: string;
    description?: string;
    nav?: string;
    // navListHamburger?: string;
    navList?: string;
    navItem?: string;
    navIcon?: string;
    navLink?: string;
  };
  style?: StyleConfig;
}

/**
 * Required args to be passed in to Header component defined within src/context/defaults/header.tsx.
 */
export interface HeaderDefault {
  content: {
    title: string;
    description: string;
    nav: NavLink[];
  };
  dataRole: {
    wrapper: string;
    brandingWrapper: string;
    titleLink: string;
    title: string;
    description: string;
    nav: string;
    // navListHamburger: string;
    navList: string;
    navItem: string;
    navIcon: string;
    navLink: string;
  };
  // Any collection of objects that match the NavLink interface.
  style: StyleConfig;
}

/**
 * Details to pass into header to build nav links.
 */
export interface NavLink {
  title: string;
  href: string;
  label: string;
  default: boolean;
  // Using Hero Icons for this project.
  icon: () => JSX.Element;
}
