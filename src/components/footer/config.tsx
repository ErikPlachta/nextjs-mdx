/**
 * Default Application configuration for the footer component.
 */

import { FooterDefault } from "./types";
import { HomeIcon, PencilIcon } from "@heroicons/react/20/solid";

/**
 * The default props for the `footer` and `nav` components within breadcrumb component.
 */
export default function footer(): FooterDefault {
  return {
    content: {
      title: "BRAND_NAME_UNDEFINED",
      description: "BRAND_SLOG_UNDEFINED",
      developer: "DEVELOPER_NAME_UNDEFINED",
    },
    dataRole: {
      wrapper: undefined,
      brandingWrapper: undefined,
      title: "footer-title",
      description: "footer-description",
      nav: "footer-nav",
      navList: "footer-nav-list",
      navItem: "footer-nav-item",
      navLink: "footer-nav-item-link",
    },
    style: {
      wrapper: {
        tailwinds: undefined,
      },
      brandingWrapper: {
        tailwinds: undefined,
      },
      title: {
        tailwinds: undefined,
      },
      description: {
        tailwinds: undefined,
      },
      nav: {
        tailwinds: undefined,
      },
      navList: {
        tailwinds: undefined,
      },
      navItem: {
        tailwinds: undefined,
      },
      navLink: {
        tailwinds: undefined,
      },
    },
  };
}
