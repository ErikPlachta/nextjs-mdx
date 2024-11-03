import React, { type JSX } from "react";
import { FooterConfig, FooterDefault } from "./types";
import getFooterDefaultConfig from "./config";

/**
 * Footer component for the full application with defaults and optional user defined props via context.
 */
export default function Footer(
  props: FooterDefault & Partial<FooterConfig>,
): JSX.Element {
  let defaults = getFooterDefaultConfig();
  let { content, dataRole, style } = { ...defaults, ...props };
  return (
    <footer data-role={dataRole.wrapper} className={style.wrapper.tailwinds}>
      <span
        data-role={dataRole.copyright}
        className={style.copyright?.tailwinds}
      >
        {content.copyright}
      </span>
      <span data-role={dataRole.branding} className={style.branding.tailwinds}>
        {content?.developer && `${content.developer}`}
        {content?.title && ` & ${content.title}`}
      </span>
    </footer>
  );
}
