/**
 * Centralized Type Definitions for all components managed by the Context.
 */

// -- IMPORTS FROM COMPONENTS USED IN CONTEXT ----------------------------------
import { ContextConfigType, ContextConfig, ContextDefault } from "./context";
import { HeaderConfig, HeaderDefault } from "@/components/header/types";
import { HeroConfig, HeroDefault } from "@/components/hero/types";
import { FooterConfig, FooterDefault } from "@/components/footer/types";
import LayoutConfig from "./layout";
import {
  MdxContentProcessedTypes,
  MdxContentSourceTypes,
  FrontmatterStatusTypes,
  MdxFrontmatterTypes,
  MdxContentComponentTypes,
} from "@/libs/mdx/types";
import StylesType from "./styles";
import {
  SearchComponentDefaultsTypes,
  SearchComponentPropsTypes,
} from "@/components/search/types";

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
