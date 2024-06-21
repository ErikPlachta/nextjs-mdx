/**
 * Used to provide custom React components to be used in MDX files via next.config.mjs
 *  to feed custom MDX files components using next-mdx.
 *
 *  @see next.config.mjs
 */

import type { MDXComponents } from "mdx/types";

// Custom Components to make available in MDX files using next-mdx.
import Hero from "@/components/hero";
import Callout from "@/components/callout";
//import Code from "@/components/Code";
//import ConsCard from "@/components/Card/ConsCard";
//import ProsCard from "@/components/Card/ProsCard";
//import RoundedImage from "@/components/image/RoundedImage";

const CustomMDXComponents: MDXComponents = {
  Hero,
  Callout,
};

/**
 * This file allows you to provide custom React components
 * to be used in MDX files. You can import and use any
 * React component you want, including inline styles,
 * components from other libraries, and more.
 *
 * - [MDX Components](https://nextjs.org/docs/app/api-reference/file-conventions/mdx-components)
 * - [Using custom styles and components](https://nextjs.org/docs/app/building-your-application/configuring/mdx#using-custom-styles-and-components)
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    // h1: ({ children }) => (
    //   <h1 style={{ color: "red", fontSize: "48px" }}>{children}</h1>
    // ),
    // img: (props) => (
    // // eslint-disable-next-line jsx-a11y/alt-text
    // <Image
    // sizes="100vw"
    // style={{ width: "100%", height: "auto" }}
    // {...(props as ImageProps)}
    // />
    // ),
    ...components,
    ...CustomMDXComponents,
  };
}
