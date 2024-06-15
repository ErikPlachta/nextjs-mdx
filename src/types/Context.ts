import {
  HeaderConfig,
  HeaderDefault,
  HeroDefault,
  FooterConfig,
  FooterDefault,
  Meta,
} from "@/types";

/**
 * Optional args to be passed in to Context component.
 */
export interface ContextConfig {
  brand?: {
    title?: string;
    description?: string;
    developer?: string;
    developerLink?: string;
    keywords?: string[];
  };
  meta?: Partial<Meta> & {
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
}

/**
 * Required args to be passed in to Context component.
 */
export interface ContextDefault {
  brand: {
    title: string;
    description: string;
    developer: string;
    developerLink: string;
    keywords: string[];
  };
  meta: Partial<Meta> & {
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
}

/**
 * Required values for the Context configuration.
 */
export type ContextConfigType = ContextDefault;
