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

//import Image from "next/image";
//import githubMark from "./public/images/github-mark-white.svg";
// Icons to be used in the header navigation. (Hero Icons is NOT a part of the library, can use anything.)
//import { HomeIcon, PencilIcon, UserIcon } from "@heroicons/react/20/solid";

// Custom library types for the context configuration.
import { ContextConfig } from "@/libs/context/types";

// My user specific definitions for the context configuration.
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
    developer: "NOPE",
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
              label: "Homepage for this project.",
              value: "Home",
              default: true,
              icon: () => <>H</>, // TODO: get icons to work again
            },
            {
              title: "mdx",
              href: "/blog",
              label: "Blog feed using next-mdx-remote.",
              value: "MDX Blog",
              default: true,
              icon: () => <>B</>, //<PencilIcon />,
            },
            {
              title: "github",
              href: "https://github.com/ErikPlachta/nextjs-mdx",
              label: "GitHub Repository for this project.",
              value: "GitHub",
              default: true,
              target: "_blank",
              rel: "noopener noreferrer",
              icon: () => (
                // <span className="w-2">
                //   <Image src={githubMark} alt="GitHub Mark" />
                // </span>
                <>G</>
              ),
            },
            {
              title: "website",
              href: "https://erikplachta.com",
              label: "Link to developers personal website, Erik Plachta.com",
              value: "ErikPlachta",
              default: true,
              target: "_blank",
              rel: "noopener noreferrer",
              icon: () => <>W</>, //<UserIcon />,
            },
          ],
        },

        // Custom data-role attribute values for the header and nav components. Commented out but kept for personal reference.
        // dataRole: {
        //   wrapper: 'header-wrapper',
        //   brandingWrapper: 'header-branding-wrapper',
        //   title: 'header-title',
        //   description: 'header-description',
        //   nav: 'header-nav',
        //   navListHamburger: 'header-nav-list-hamburger',
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
          title: "ErikPlachta.com",
          developer: "Erik Plachta",
          // copyright: `All Rights Reserved © ${new Date().getFullYear()}`,
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
