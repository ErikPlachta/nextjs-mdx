import { HeaderConfig, HeaderDefault } from "./types";
import { HomeIcon, PencilIcon } from "@heroicons/react/20/solid";

/**
 * Header components default configuration.
 */
export const HeaderDefaultConfig: HeaderDefault = {
  content: {
    title: "TITLE_UNDEFINED",
    description: "DESCRIPTION_UNDEFINED",
    // The default navigation items for the `header` and `nav` components.
    nav: [
      {
        title: "home",
        href: "/",
        label: "Home",
        default: true,
        icon: () => <HomeIcon />,
      },
      {
        title: "about",
        href: "/about",
        label: "About",
        default: false,
        icon: () => <PencilIcon className="mr-3 h-5 w-5" />,
      },
    ],
  },
  dataRole: {
    wrapper: "header-wrapper",
    brandingWrapper: "header-branding-wrapper",
    titleLink: "header-title-link",
    title: "header-title",
    description: "header-description",
    nav: "header-nav",
    navList: "header-nav-list",
    navItem: "header-nav-item",
    navIcon: "header-nav-item-icon",
    navLink: "header-nav-item-link",
  },
  style: {
    wrapper: {
      // The header element.
      tailwinds: undefined,
    },
    brandingWrapper: {
      tailwinds: undefined,
    },
    titleLink: {
      // Next LINK element, anchor element, around the brand-name
      tailwinds: undefined,
    },
    title: {
      // Brand Name ( header-title )
      tailwinds: undefined,
    },
    description: {
      // Brand slogan / description / summary
      tailwinds: undefined,
    },

    nav: {
      //header-nav: Nav element wrapping List of items (UL)
      tailwinds: undefined,
    },

    // navListHamburger: {
    //TODO: Onboard this hamburger feature into component then add here.
    //   tailwinds: `md:hidden`,
    // },

    navList: {
      // UL holding LI elements
      tailwinds: undefined,
    },
    navItem: {
      // LI element holding the Icon and Link
      tailwinds: undefined,
    },
    navIcon: {
      // LI element holding link
      tailwinds: undefined,
    },
    navLink: {
      // Each link in the nav (UL > LI > A)
      // Next Link element.
      tailwinds: undefined,
    },
  },
};

//----------------------------------------------------------------------------------------

/**
 * The default props for apps Header component, including branding and navigation used by
 * the header and nav components along with the Context library.
 */
export default function getHeaderDefaults() {
  return HeaderDefaultConfig;
}
