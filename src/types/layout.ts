/**
 * Different types of layouts for components within the application.
 *
 * @namespace   types.layouts
 * @memberof    types
 * @description Type definitions for layouts within the project.
 */

// Importing style ype
import { StylesType } from "@/libs/context/types";

/**
 * Type reference for how layouts are managed within the project.
 *
 * @memberof    types.layouts
 * @description Type reference for how layouts are managed within the project.
 * @typedef     {object} Layouts
 * @property    {object} 1x1 - The Tailwind CSS styles for the project.
 * @property    {object} 1x2 - The Tailwind CSS styles for the project.
 * @property    {object} 2x1 - The Tailwind CSS styles for the project.
 * @property    {object} 2x2 - The Tailwind CSS styles for the project.
 *
 * @todo       Add more layouts if/when needed.
 */
export interface Layouts {
  "1x1": {
    style: StylesType & {
      tailwinds: "col-span-1 row-span-1";
    };
  };
  "1x2": {
    style: StylesType & {
      tailwinds: "col-span-1 row-span-2";
    };
  };
  "2x1": {
    style: StylesType & {
      tailwinds: "col-span-2 row-span-1";
    };
  };
  "2x2": {
    style: StylesType & {
      tailwinds: "col-span-2 row-span-2";
    };
  };
}

/**
 * Type def for how a layout is defined as a prop within project, with a default value of 1x1.
 *
 * @memberof    types.layout
 * @description Type def for how a layout is defined as a prop within project, with a default value of 1x1.
 * @typedef     {object} LayoutProps
 * @property    {string} layout - The Tailwind CSS styles for the project. Defaults to `1x1`.
 */
export default interface LayoutConfig {
  layout: keyof Layouts | "1x1"; // 1x1, 1x2, 2x1, 2x2
}
