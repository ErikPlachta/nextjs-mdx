import { MdxFrontmatterTypes } from "@/libs/mdx/types";
import StylesType from "@/types/styles";
import { HTMLAttributeAnchorTarget, HtmlHTMLAttributes, type JSX } from "react";

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
  style?: StylesType;
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
  style: StylesType;
}

/**
 * Details to pass into header to build nav links.
 */
export interface NavLink {
  title: string;
  href: string;
  label: string;
  value: string;
  default: boolean;
  rel?: HtmlHTMLAttributes<HTMLAnchorElement>["rel"] | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
  // Using Hero Icons for this project.
  icon: () => JSX.Element;
}

export type HeaderBrandTypes = {
  title: string;
  description: string | undefined;
  developer: string | undefined;
  developerLink: string | undefined;
  keywords: string[];
};
export type HeaderMetaTypes = {
  author: string;
  description: string;
  created: string;
  modified: string;
  version: string;
} & Partial<MdxFrontmatterTypes>;
