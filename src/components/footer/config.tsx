/**
 * Default Application configuration for the footer component.
 */

import { FooterDefault } from "./types";
import { HomeIcon, PencilIcon } from "@heroicons/react/20/solid";

/**
 * The default props for the `footer` and `nav` components within breadcrumb component.
 */
export default function getFooterDefaultConfig(): FooterDefault {
  return {
    content: {
      title: "BRAND_NAME_UNDEFINED",
      developer: "DEVELOPER_NAME_UNDEFINED",
      copyright: `All Rights Reserved © ${new Date().getFullYear()}`,
    },
    dataRole: {
      wrapper: "footer-wrapper",
      branding: "footer-branding",
      copyright: "footer-copyright",
    },
    style: {
      wrapper: {
        tailwinds:
          "space-evenly m-auto flex w-full justify-center gap-4 rounded-xl bg-slate-900/20 p-4 px-8",
      },
      branding: {
        tailwinds: "mt-auto flex justify-center text-center",
      },
      copyright: {
        tailwinds: "mt-auto flex justify-center text-center",
      },
    },
  };
}
