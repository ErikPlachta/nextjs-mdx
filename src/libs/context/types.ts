/**
 * Centralized Type Definitions for all components managed by the Context.
 */

// -- IMPORTS FROM COMPONENTS USED IN CONTEXT ----------------------------------
// import { ContextConfigType, ContextConfig, ContextDefault } from "./context";
import { HeaderConfig, HeaderDefault } from "@/components/header/types";
import { HeroConfig, HeroDefault } from "@/components/hero/types";
import { FooterConfig, FooterDefault } from "@/components/footer/types";
import LayoutConfig from "@/types/layout";
import {
  MdxContentProcessedTypes,
  MdxContentSourceTypes,
  FrontmatterStatusTypes,
  MdxFrontmatterTypes,
  MdxContentComponentTypes,
} from "@/libs/mdx/types";
import StylesType from "@/types/styles";
import {
  SearchComponentDefaultsTypes,
  SearchComponentPropsTypes,
} from "@/components/search/types";

/**
 * Optional args to be passed in to Context component.
 *
 * @property {MdxContentSourceType[]} [content] - The content to be displayed on the page.
 * @property {string} [content.title] - Name of the content for user.
 * @property {Object} [brand] - The brand information for the site.
 * @property {string} [brand.title] - The title of the site.
 *
 *
 */
type ContextConfig = {
  content?: {
    title: MdxContentSourceTypes["title"];
    description: MdxContentSourceTypes["description"];
    fileType: MdxContentSourceTypes["fileType"];
    contentType: MdxContentSourceTypes["contentType"];
    source: MdxContentSourceTypes["source"];
  }[] &
    MdxContentSourceTypes[]; // TODO: 20240616 #EP || Update so that not hard-coded above, and can still hover to get info on type ContextConfig. (ATM it just shows the name so doing this to prevent the need to navigate in here.).
  brand?: {
    title?: string;
    description?: string;
    developer?: string;
    developerLink?: string;
    keywords?: string[];
  };
  meta?: Partial<MdxFrontmatterTypes> & {
    author?: string;
    description?: string;
    created?: string;
    modified?: string;
    version?: string;
  };
  app?: {
    layout?: {
      header?: HeaderConfig;
      footer?: FooterConfig;
    };
    component?: {
      hero?: HeroDefault;
    };
  };
};

/**
 * Required args to be passed in to Context component.
 */
type ContextDefault = {
  content: MdxContentSourceTypes[] | [];
  brand: {
    title: string;
    description: string;
    developer: string;
    developerLink: string;
    keywords: string[];
  };
  meta: Partial<MdxFrontmatterTypes> & {
    author: string;
    description: string;
    created: string;
    modified: string;
    version: string;
  };
  app: {
    layout: {
      header: HeaderDefault;
      footer: FooterDefault;
    };
    component: {
      hero: HeroDefault;
    };
  };
};

type ContextConfigType = ContextDefault;

// -- EXPORT ---------------------------
// Export all types for use in the context module.
export type {
  // Context
  ContextConfigType,
  ContextConfig,
  ContextDefault,
  // Header Component
  HeaderConfig,
  HeaderDefault,
  // Hero Component
  HeroConfig,
  HeroDefault,
  // Footer Component
  FooterConfig,
  FooterDefault,
  // Layout Component
  LayoutConfig,
  // MDX Content
  MdxContentProcessedTypes,
  MdxContentSourceTypes,
  FrontmatterStatusTypes,
  MdxFrontmatterTypes,
  // MDX Components
  MdxContentComponentTypes,
  // style
  StylesType,
  SearchComponentDefaultsTypes,
  SearchComponentPropsTypes,
};
