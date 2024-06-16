import {
  HeaderConfig,
  HeaderDefault,
  HeroDefault,
  FooterConfig,
  FooterDefault,
  FrontmatterType,
  MdxContentSourceType,
} from "@/types";

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
export type ContextConfig = {
  content?: {
    title: MdxContentSourceType["title"];
    description: MdxContentSourceType["description"];
    fileType: MdxContentSourceType["fileType"];
    contentType: MdxContentSourceType["contentType"];
    source: MdxContentSourceType["source"];
  }[] &
    MdxContentSourceType[]; // TODO: 20240616 #EP || Update so that not hard-coded above, and can still hover to get info on type ContextConfig. (ATM it just shows the name so doing this to prevent the need to navigate in here.).
  brand?: {
    title?: string;
    description?: string;
    developer?: string;
    developerLink?: string;
    keywords?: string[];
  };
  meta?: Partial<FrontmatterType> & {
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
export interface ContextDefault {
  content: MdxContentSourceType[] | [];
  brand: {
    title: string;
    description: string;
    developer: string;
    developerLink: string;
    keywords: string[];
  };
  meta: Partial<FrontmatterType> & {
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
