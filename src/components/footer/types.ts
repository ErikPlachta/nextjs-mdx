import { StylesType } from "@/libs/context/types";

import type { JSX } from "react";

/**
 * Optional args to be passed in to Footer component.
 */
export interface FooterConfig {
  content?: {
    title?: string;
    developer?: string;
    copyright?: string;
  };
  dataRole?: {
    wrapper?: string | undefined;
    title?: string | undefined;
    description?: string | undefined;
    nav?: string | undefined;
  };
  style?: StylesType;
  nav?: NavLink[];
}

/**
 * Required args to be passed in to Footer component.
 */
export interface FooterDefault {
  content: {
    title: string;
    developer?: string | undefined;
    copyright?: string | undefined;
  };
  dataRole: {
    [key: string]: string | undefined;
  };
  style: StylesType;
  nav?: NavLink[];
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
