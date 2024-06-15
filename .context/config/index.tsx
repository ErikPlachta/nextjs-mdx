/**
 * Update this to customize default configuration options for the application.
 *
 * @file        index.tsx
 * @name        config
 * @module      context.config
 * @memberof    module:context
 * @author      Erik Plachta
 * @created     2023-08-19
 * @modified    2023-08-20
 * @version     0.0.2
 * @since       null  ## when was the feature added?
 *
 * @requires    {ContextConfig} from '@/types'
 * //@requires    {HomeIcon, PencilIcon} from "@heroicons/react/20/solid";
 * @exports     Config
 *
 * @changelog
 *  - 0.0.1 | 2023-08-19 | Erik Plachta | feat: Initial Commit of concept.
 *  - 0.0.2 | 2023-08-20 | Erik Plachta | feat: Add final draft config framework for context. chore: Add docs.
 */

//! TODO: 20230826 | Update this to pull from a config file in the root of the project once concept finalized.

import { ContextConfig } from "@/types";
import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
  CheckIcon,
  HomeIcon,
  PencilIcon,
  WrenchIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/20/solid";

/**
 * Configuration for the application to pass down to components.
 *
 * @name        Config
 * @memberof    module:context
 * @type        {ContextConfig}
 * @property    {meta} meta The meta data for the application.
 * @property    {app} app The application configuration.
 * @see         {@link '@/types/context'} for type definition reference.
 * @see         {@link '@/context/defaults'} for default values.
 * @see         {@link '@/context/index'} for how this data is managed.
 */
export default function Config(): ContextConfig {
  return {
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
        "JavaScript",
      ],
    },
    app: {
      // Modify default values for the layout components used within the application.
      layout: {
        header: {
          content: {
            // Brand Name to render in the header.
            title: "ErikPlachta.com",
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
                title: "notes",
                href: "/notes",
                label: "Notes",
                default: true,
                icon: () => <PencilIcon />,
                // icon: () => <PencilIcon className='mr-3 h-5 w-5' />,
              },
              {
                title: "projects",
                href: "/projects",
                label: "Projects",
                default: true,
                icon: () => <CheckIcon />,
              },
              {
                title: "resources",
                href: "/resources",
                label: "Resources",
                default: true,
                icon: () => <WrenchScrewdriverIcon />,
                // icon: () => <WrenchScrewdriverIcon className='mr-3 h-5 w-5' />,
              },
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
}
