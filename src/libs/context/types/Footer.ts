import { StyleConfig } from "@/libs/context/types";

/**
 * Optional args to be passed in to Footer component.
 */
export interface FooterConfig {
  content?: {
    title?: string;
    description?: string;
    developer?: string;
  };
  dataRole?: {
    wrapper?: string;
    title?: string;
    description?: string;
    nav?: string;
  };
  style?: StyleConfig;
  nav?: NavLink[];
}

/**
 * Required args to be passed in to Footer component.
 */
export interface FooterDefault {
  content: {
    title: string;
    description: string;
    developer: string;
  };
  dataRole: {
    [key: string]: string;
  };
  style: StyleConfig;
  nav: NavLink[];
}

/**
 * Details to pass into Footer to build nav links.
 */
export interface NavLink {
  title: string;
  href: string;
  label: string;
  default: boolean;
  // Using Hero Icons for this project.
  icon: () => JSX.Element;
}
