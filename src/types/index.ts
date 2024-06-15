/**
 * Centralized module for all public Type definitions within the project.
 *
 * @module      types
 * @author      Erik Plachta
 * @created     2023-08-19
 * @modified    2023-08-20
 * @version     0.0.2
 * @since       2023-08-19
 *
 * @exports     AppConfig
 * @exports     HeaderConfig
 * @exports     HeaderDefault
 * @exports     HeroConfig
 * @exports     HeroDefault
 * @exports     FooterConfig
 * @exports     FooterDefault
 * @exports     LayoutConfig
 * @exports     LinkConfig
 * @exports     Meta
 * @exports     StyleConfig
 *
 * @changelog
 *  - 2023-08-20 | Erik Plachta | chore: Cleanup documentation. feat: Add `Meta` and `AppConfig` type.
 */

import { ContextConfigType, ContextConfig, ContextDefault } from "./Context";
import { HeaderConfig, HeaderDefault } from "./Header";
import { HeroConfig, HeroDefault } from "./Hero";
import { FooterConfig, FooterDefault } from "./Footer";
import LayoutConfig from "./Layout";
import LinkConfig from "./Link";
import {
  MdxDataType,
  MdxContentType,
  MdxFileContentType,
  MdxContentSourceType,
  CompiledMDXContentResultsType,
  FrontmatterType,
  MainFrontmatterType,
  BlogFrontmatterType,
  FrontmatterStatusType,
} from "./MDX";
import StyleConfig from "./Styles";
import { SearchPropTypes, SearchPropDefaultTypes } from "./Search";

export type {
  ContextConfigType,
  ContextConfig,
  ContextDefault,
  HeaderConfig,
  HeaderDefault,
  HeroConfig,
  HeroDefault,
  FooterConfig,
  FooterDefault,
  LayoutConfig,
  LinkConfig,
  // MDX
  MdxDataType,
  MdxContentType,
  MdxContentSourceType,
  MdxFileContentType,
  CompiledMDXContentResultsType,
  FrontmatterType,
  MainFrontmatterType,
  BlogFrontmatterType,
  FrontmatterStatusType,
  // style
  StyleConfig,
  SearchPropTypes,
  SearchPropDefaultTypes,
};
