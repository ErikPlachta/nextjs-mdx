/**
 * Custom configuration for the application Context library, a custom lib for modifying the default values of the application.
 *
 * @file context-config.js
 * @module context-config
 * @typedef {Object} ContextConfig
 * @memberof namespace:Context
 * @name ContextConfig
 * @type {Object}
 */

// Path and fs are Node.js modules to work with file paths and the file system.
// import path from "path";

// Library types for the context configuration.
import { ContextConfig } from "context/types";

// Icons to be used in the header navigation. (Hero Icons is NOT a part of the library, can use anything.)
import {
  //ArchiveBoxArrowDownIcon,
  //ArchiveBoxXMarkIcon,
  CheckIcon,
  HomeIcon,
  PencilIcon,
  //WrenchIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";

const config: ContextConfig = {
  content: [
    {
      title: "Main",
      description: "A collection mdx content using next-mdx.",
      fileType: "mdx",
      contentType: "main",
      source: "/content/main",
    },
    {
      title: "Blog",
      description: "A collection of notes using next-mdx-remote.",
      fileType: "mdx",
      contentType: "blog",
      source: "/content/blog",
    },
  ],
  brand: {
    title: "ErikPlachta.com",
    description: "My personal website.",
    developer: "Erik Plachta",
    developerLink: "https://erikplachta.com",
    keywords: [
      "Erik Plachta",
      "NextJS",
      "TailwindCSS",
      "React",
      "TypeScript",
      "mdx",
    ],
  },
  app: {
    // Modify default values for the layout components used within the application.
    layout: {
      header: {
        content: {
          // Brand Name to render in the header.
          title: "NextJs-MDX ",
          // Brand Slogan/Description to render in the header.
          description: "", //"//TODO: Add description.",
          // Navigation Items for the header and nav components.
          nav: [
            {
              title: "home",
              href: "/",
              label: "Home",
              default: true,
              icon: () => <HomeIcon />,
              // icon: () => <HomeIcon className='mr-3 h-5 w-5' />,
            },
            {
              title: "blog",
              href: "/blog",
              label: "Blog",
              default: true,
              icon: () => <PencilIcon />,
              // icon: () => <PencilIcon className='mr-3 h-5 w-5' />,
            },
            // {
            //   title: "projects",
            //   href: "/projects",
            //   label: "Projects",
            //   default: true,
            //   icon: () => <CheckIcon />,
            // },
            // {
            //   title: "resources",
            //   href: "/resources",
            //   label: "Resources",
            //   default: true,
            //   icon: () => <WrenchScrewdriverIcon />,
            //   // icon: () => <WrenchScrewdriverIcon className='mr-3 h-5 w-5' />,
            // },
          ],
        },

        // The data-role attribute values for the header and nav components.
        // dataRole: {
        //   wrapper: 'header-wrapper',
        //   brandingWrapper: 'header-branding-wrapper',
        //   title: 'header-title',
        //   description: 'header-description',
        //   nav: 'header-nav',
        //   // navListHamburger: 'header-nav-list-hamburger',
        //   navList: 'header-nav-list',
        //   navItem: 'header-nav-item',
        //   navLink: 'header-nav-item-link',
        // },

        // Style definitions for the header and nav components/content.
        // style: {
        // wrapper: {
        //   tailwinds: '',
        // },
        // brandingWrapper: {
        //   tailwinds: '',
        // },
        // title: {
        //   tailwinds: '',
        // },
        // description: {
        //   tailwinds: '',
        // },
        // nav: {
        //   tailwinds: '',
        // },
        // navList: {
        //   tailwinds: '',
        // },
        // navItem: {
        //   tailwinds: '',
        // },
        // navLink: {
        //   tailwinds: '',
        // },

        // },
      },
      footer: {
        content: {
          // Brand Name to render in the footer.
          title: "",
          description: "",
          developer: "Erik Plachta",
        },
      },
    },

    // Modify default values for the non-layout components used within the application.
    component: {
      // hero: {
      // }
    },
  },
};

export default config;
