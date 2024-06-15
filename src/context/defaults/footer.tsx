/**
 * Default Application configuration for the footer component. 
 * 
 * To customize the application, see the `src/context/config.tsx` file.
 * Only to be modified unless the application requires a different default configuration.
 * 
 * @file       src/context/defaults/footer.tsx
 * @module     context.footer
 * @author     Erik Plachta
 * @created    2023-08-20
 * @modified   null
 * @version    0.0.1
 * @exports    footerDefault The default props for the `footer` and `nav` components.
 */

import { FooterDefault } from "@/types";
import { HomeIcon, PencilIcon } from "@heroicons/react/20/solid";

/**
 * The default props for the `footer` and `nav` components.
 * 
 * - Used by Context module to provide default values for the footer component. 
 * - User defined values within context/config will override these defaults IF they are
 *    defined and valid.
 * - Validity is determined by the `validateProps` function in `@/utils/ValidateProps.tsx`,
 *    which is called within the `footer` component at this time.
 *
 * @memberof  module:context.footer
 * @returns   {footerDefault} The default configurations for the footer.
 * @see       {@link '@/types/footerDefault'} for type definition reference.
 * @see       {@link '@/context/config.tsx'} to change values from default.
 * @see       {@link '@/utils/ValidateProps.tsx'} for the function that validates props.
 * 
 */
export default function footer(): FooterDefault {
  return {
    content: {
      title: "BRAND_NAME_UNDEFINED",
      description: "BRAND_SLOG_UNDEFINED",
      developer: "DEVELOPER_NAME_UNDEFINED",
    },
    dataRole: {
      wrapper: "footer-wrapper",
      brandingWrapper: "footer-branding-wrapper",
      title: "footer-title",
      description: "footer-description",
      nav: "footer-nav",
      navList: "footer-nav-list",
      navItem: "footer-nav-item",
      navLink: "footer-nav-item-link",
    },
    nav: [
      {
        title: "home",
        href: "/",
        label: "Home",
        default: true,
        icon: () => <HomeIcon className="mr-3 h-5 w-5" />,
      },
      {
        title: "notes",
        href: "/notes",
        label: "Notes",
        default: false,
        icon: () => <PencilIcon className="mr-3 h-5 w-5" />,
      },
    ],
    style: {
      // The Footer element
      wrapper: {
        tailwinds:
          "flex w-full space-evenly gap-4 p-4 px-8 bg-slate-900/20 rounded-xl",
      },
      // brandingWrapper: {
      //   tailwinds: "flex flex-col",
      // },
      title: {
        tailwinds: "text-2xl font-bold",
      },
      description: {
        tailwinds: "text-lg font-light",
      },
      // nav: {
      //   tailwinds: "flex ml-auto justify-end",
      // },
      // navList: {
      //   tailwinds: "flex flex-row w-full justify-end gap-2",
      // },
      // navItem: {
      //   tailwinds: "pl-8", //TODO: Add styles here.
      // },
      // navLink: {
      //   tailwinds: "flex",
      // },
    },
  };
}
