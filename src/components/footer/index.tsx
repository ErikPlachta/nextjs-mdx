import React from "react";
import { FooterConfig, FooterDefault } from "./types";
// import validateProps from "@/lib/ValidateProps";
// import { HomeIcon, PencilIcon } from "@heroicons/react/20/solid";

/**
 * Footer component for the full application with defaults and optional user defined props via context.
 */
export default function Footer(
  props: FooterDefault & Partial<FooterConfig>,
): JSX.Element {
  const { dataRole, content, style } = props;
  // Takes expected defaults, user defined props, validates them, and returns props object.
  // const { invalidProps, validProps } = validateProps(FooterDefault, props);

  // console.log('invalidProps: ', invalidProps)
  // console.log('validProps: ', validProps)

  // Return component
  return (
    <footer
      data-role={dataRole?.wrapper || "footer-wrapper"}
      className={
        style?.wrapper?.tailwinds ||
        "space-evenly m-auto flex w-full justify-center gap-4 rounded-xl bg-slate-900/20 p-4 px-8"
      }
    >
      <span
        data-role={dataRole.copyright || "footer-copyright"}
        className="mt-auto flex justify-center text-center"
      >
        All Rights Reserved © {new Date().getFullYear()}
      </span>
      <span className="mt-auto flex justify-center text-center">-</span>
      <span
        data-role={dataRole?.branding || "footer-branding"}
        className={
          style.description?.tailwinds ||
          "mt-auto flex justify-center text-center"
        }
      >
        {content?.developer && `${content.developer}`}
        {content?.title && ` & ${content.title}`}
      </span>

      {/* TODO: Onboard this component.
       <Breadcrumb {...BreadCrumb} /> */}
    </footer>
  );
}
