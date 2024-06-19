/**
 * Application context default values for the `header` and `nav` components.
 *
 * This file provides default configuration parameters for the `header` and `nav`
 * components. When changing these values, be sure it should is not an application specific
 * change, and if it is, change the values in `src/context/config/index.tsx` instead.
 *
 * @file        src/context/defaults/header.tsx
 * @module      context.header
 * @author      Erik Plachta
 * @created     2023-08-20
 * @modified    2023-09-11
 * @version     0.0.12
 * @since       0.0.1
 * @requires    {HeaderDefault} from 'context/types'
 * @requires    {Brand} from "@/context/defaults/brand";
 * @requires    {HomeIcon, PencilIcon} from "@heroicons/react/20/solid";
 * @exports     HeaderDefault The default props for the `header` and `nav` components.
 *
 * @changelog
 *  - 0.0.1 | 2023-08-20 | Erik Plachta | feat: Initial commit of concept integrated into app/layout.
 *  - 0.0.11| 2023-08-26 | Erik Plachta | chore: Cleanup and verify.
 *  - 0.0.12| 2023-09-04 | Erik Plachta | chore: Simplified some style.
 *  - 0.0.13| 2023-09-11 | Erik Plachta | chore: Cleanup of some styling in header.
 */

//----------------------------------------------------------------------------------------
// Imports Section (Import interfaces, then components, then assets//

import { HeaderDefault } from "@/libs/context/types";
import { HomeIcon, PencilIcon } from "@heroicons/react/20/solid";
import Brand from "@/libs/context/defaults/brand";

//----------------------------------------------------------------------------------------
// Define Defaults Section

// Get default brand values from context/defaults/brand.tsx to feed header defaults.
const brand = Brand();

/**
 * Default content for the `header` and `nav` components.
 */
const content = {
  // Brand Name
  title: brand?.title || "UNDEFINED_HEADER_TITLE",
  // Brand slogan/description
  description: brand?.description || "UNDEFINED_HEADER_DESCRIPTION",

  // The default navigation items for the `header` and `nav` components.
  nav: [
    {
      title: "home",
      href: "/",
      label: "Home",
      default: true,
      icon: () => <HomeIcon />,
    },
    // TODO: 20230826 | Update template to have an about page built, then add here or delete this.
    // {
    //   title: "about",
    //   href: "/about",
    //   label: "About",
    //   default: false,
    //   icon: () => <PencilIcon className="mr-3 h-5 w-5" />,
    // },
  ],
};

const dataRole: HeaderDefault["dataRole"] = {
  wrapper: "header-wrapper",
  brandingWrapper: "header-branding-wrapper",
  titleLink: "header-title-link",
  title: "header-title",
  description: "header-description",
  // navListHamburger: 'header-nav-list-hamburger',
  nav: "header-nav",
  navList: "header-nav-list",
  navItem: "header-nav-item",
  navLink: "header-nav-item-link",
  navIcon: "header-nav-item-icon",
};

/**
 * The default styles for the `header` and `nav` components/content.
 */
const style: HeaderDefault["style"] = {
  // The header element.
  wrapper: {
    tailwinds:
      // If mobile, center so easier to select nav elements. Else, heavy space between brand name and nav icons.
      `fixed md:sticky flex flex-col pointer-events-none md:flex-row gap-4 justify-between max-w-4xl w-full m-auto items-center ` +
      // If mobile, push nav to bottom of screen. Else, stays in top.
      `z-10 top-0 bottom-0 md:bottom-[unset] md:top-0  md:py-2 md:px-6 ` +
      // `z-10 bottom-0 md:bottom-[unset] md:top-0  md:py-2 md:px-6 ` +
      // TODO: 20230904 #EP || Update to use theme colors, not hard-coded.
      `md:backdrop-blur md:bg-slate-100 dark:md:bg-slate-800/70 ` +
      // Rounded top corners on mobile, rounded bottom corners on desktop.
      `rounded-tl-lg rounded-tr-lg md:rounded-none md:rounded-bl-lg md:rounded-br-lg ` +
      `transition-all duration:100 ease-in-out `,
    // + `sm:flex-col `
    // tailwinds: "sticky flex flex-row top-0 w-full max-w-4xl gap-4 mb-4 py-4 px-6 justify-center items-center",
  },
  brandingWrapper: {
    tailwinds:
      "flex pointer-events-auto justify-left w-full items-center justify-center md:justify-left md:items-left min-w-[fit-content] backdrop-blur md:backdrop-filter-none",
  },
  // Next LINK element, anchor element, around the brand-name
  titleLink: {
    tailwinds:
      "w-[100%] md:w-auto flex text-center bg-slate-800/70 md:bg-transparent px-2 md:px-auto rounded-bl rounded-br md:w-auto",
  },
  // Brand Name ( header-title )
  title: {
    tailwinds:
      "text-xl bg:transparent font-medium tracking-wide w-full m-auto p-2 md:px-auto",
    // "text-2xl font-medium tracking-wide w-full bg-slate-800/70 px-4 md:px-auto rounded-bl rounded-br md:bg-transparent md:w-auto",
  },
  // Brand slogan / description / summary
  description: {
    tailwinds: "text-lg font-light",
  },

  //header-nav: Nav element wrapping List of items (UL)
  nav: {
    tailwinds:
      ` z-40  p-2 w-full md:m-t-auto ` +
      ` bg-slate-100 dark:bg-slate-800/70 md:bg-transparent md:dark:bg-transparent ` +
      ` backdrop-blur md:backdrop-blur-none md:backdrop-filter-none `,
  },

  // // Hamburger Icon holding list when mobile.
  // navListHamburger: {
  //   tailwinds: `md:hidden`,
  // },

  // UL holding LI elements
  navList: {
    tailwinds: `pointer-events-auto z-40 flex flex-row gap-8 md:gap-4 w-full justify-center space-evenly md:justify-end`,
  },
  // LI element holding the Icon and Link
  navItem: {
    tailwinds:
      "p-2 w-[100px] md:w-[unset] rounded-lg shadow-xl bg-transparent shadow-slate-900/30 md:shadow-none text-md",
  },
  // LI element holding link
  navIcon: {
    tailwinds: "h-5 w-5 md:h-4 md:w-4",
  },
  // Each link in the nav (UL > LI > A)
  navLink: {
    // Next Link element.
    // tailwinds: "flex",
    tailwinds:
      "flex flex-col md:flex-row items-center gap-1 hover:text-blue-500 active:text-blue-300 ease-in-out transition-all",
  },
};

//----------------------------------------------------------------------------------------

/**
 * The default props for the `header` and `nav` components.
 *
 * - Used by Context module to provide default values for the header component.
 * - User defined values within context/config will override these defaults IF they are
 *    defined and valid.
 * - Validity is determined by the `validateProps` function in `@/utils/ValidateProps.tsx`,
 *    which is called within the `Header` component at this time.
 *
 * @memberof  module:context.header
 * @returns   {HeaderDefault} The default configurations for the header.
 * @see       {@link '@/types/HeaderDefault'} for type definition reference.
 * @see       {@link '@/context/config.tsx'} to change values from default.
 * @see       {@link '@/utils/ValidateProps.tsx'} for the function that validates props.
 *
 */
export default function Header(): HeaderDefault {
  return {
    content,
    dataRole,
    style,
  };
}
