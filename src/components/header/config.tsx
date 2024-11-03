import { HeaderDefault } from "./types";
//import { HomeIcon } from "@heroicons/react/20/solid";

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
        label: "Default Homepage for this project.",
        value: "Home",
        default: true,
        icon: () => <>H</>, // TODO: get icons to work again <HomeIcon />,
        rel: "noopener",
        target: "_self",
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
      // The header element itself around the branding and nav content.
      tailwinds:
        "fixed md:sticky flex flex-col pointer-events-none md:flex-row gap-4 justify-between max-w-4xl w-full m-auto items-center z-10 top-0 bottom-0 md:bottom-[unset] md:top-0  md:py-2 md:px-6 md:backdrop-blur md:bg-slate-100 dark:md:bg-slate-800/70 rounded-tl-lg rounded-tr-lg md:rounded-none md:rounded-bl-lg md:rounded-br-lg transition-all",
    },
    brandingWrapper: {
      tailwinds:
        "justify-left md:items-left pointer-events-auto flex w-full min-w-[fit-content] items-center backdrop-blur md:backdrop-filter-none",
    },
    titleLink: {
      // Next LINK element, anchor element, around the brand-name
      tailwinds:
        "md:px-auto flex w-[100%] rounded-bl rounded-br bg-slate-800/70 px-2 text-center md:w-auto md:bg-transparent",
    },
    title: {
      // Brand Name ( header-title )
      tailwinds:
        "bg:transparent md:px-auto m-auto w-full p-2 text-xl font-medium tracking-wide",
    },
    description: {
      // Brand slogan / description / summary
      tailwinds: "text-lg font-light",
    },

    nav: {
      //header-nav: Nav element wrapping List of items (UL)
      tailwinds: `md:m-t-auto z-40 w-full bg-slate-100 p-2 backdrop-blur md:bg-transparent md:backdrop-blur-none md:backdrop-filter-none dark:bg-slate-800/70 md:dark:bg-transparent`,
    },
    navList: {
      // UL holding LI elements
      tailwinds: `space-evenly pointer-events-auto z-40 flex w-full flex-row justify-center gap-8 md:justify-end md:gap-4`,
    },
    navItem: {
      // LI element holding the Icon and Link
      tailwinds: `text-md w-[500px] rounded-lg bg-transparent p-2 shadow-xl shadow-slate-900/30 md:w-[auto] md:text-nowrap md:shadow-none`,
    },
    navIcon: {
      // LI element holding link
      tailwinds: "h-5 w-5 md:h-4 md:w-4",
    },
    navLink: {
      // Each link in the nav (UL > LI > A)
      // Next Link element.
      tailwinds:
        "flex flex-col items-center gap-1 text-center hover:text-blue-500 active:text-blue-300 md:flex-row",
    },
  },
};

//----------------------------------------------------------------------------------------
/**
 * The default props for apps Header component, including branding and navigation used by
 * the header and nav components along with the Context library.
 */
export default function getHeaderDefaultConfig() {
  return HeaderDefaultConfig;
}
