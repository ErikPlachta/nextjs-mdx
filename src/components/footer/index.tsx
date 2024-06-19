import React from "react";
import { FooterConfig, FooterDefault } from "@/libs/context/types";
// import validateProps from "@/lib/ValidateProps";
// import { HomeIcon, PencilIcon } from "@heroicons/react/20/solid";

/**
 * @name Footer
 * @memberof components
 * @description The Footer component is used to display a title and description for a page.
 * @param {FooterConfig} props The props for the component. @see {@link 'context/types/FooterConfig'} for more information.
 * @returns A React component.
 *
 * @todo Add a prop for the Footer image, alt text, etc.
 * @todo Add prop for layouts? (e.g. centered, left, right, etc.)
 * @todo Add prop for style
 */
export default function Footer(
  props: FooterDefault & Partial<FooterConfig>
): JSX.Element {
  // Takes expected defaults, user defined props, validates them, and returns props object.
  // const { invalidProps, validProps } = validateProps(FooterDefault, props);

  // console.log('invalidProps: ', invalidProps)
  // console.log('validProps: ', validProps)

  // Return component
  return (
    <footer
      data-role={props.dataRole.wrapper}
      className={props.style.wrapper.tailwinds}
    >
      <section className="flex text-center justify-center m-auto mt-4">
        © {new Date().getFullYear()}
        {props?.content?.developer && ` - ${props.content.developer}`}
        {props?.content?.title && ` & ${props.content.title}`}
        {". "} All Rights Reserved.
      </section>

      {/* TODO: Onboard this component.
       <Breadcrumb {...props?.BreadCrumb} /> */}
    </footer>
  );
}
