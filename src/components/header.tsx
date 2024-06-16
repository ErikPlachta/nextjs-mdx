import React from "react";
import { HeaderDefault } from "context/types";
import Link from "next/link";

/**
 * The header component is used to display a title and description for a page.
 *
 * All headerProps defaults are defined within the `src/context/defaults/index.ts` file,
 * and all modifications to those defaults values are defined within `src/context/config/index.ts`.
 *
 * - @see {@link 'context/types/HeaderConfig'} for more information on types.
 * - @see {@link '@/context'} to verify the context is being passed in properly.
 * - @see {@link '@/components/defaults'} to understand the default defaults.
 * - @see {@link '@/context/config'} to modify Header components default content, like nav items, styling, etc.
 *
 * @name Header
 * @memberof components
 * @type {React.FC}
 * @namespace components.header
 * @param {HeaderConfig} props The props for the component.
 * @returns A React component.
 *
 * @todo 2023-08-19 | Add a prop for the header image, alt text, etc.
 * @todo 2023-08-19 | Add prop for layouts? (e.g. centered, left, right, etc.)
 * @todo 2023-08-20 | Cleanup once verified props are passing in from context properly.
 */
export default function Header(props: HeaderDefault): JSX.Element {
  // No props defined for component, throws error.
  if (!props || typeof props !== "object")
    throw new Error(
      "ERROR: <Header> Component - Invalid props. To review app specific configuration, see `src/app/context/config/index.tsx`. To review default configuration, see `src/app/context/defaults/header.tsx`"
    );

  const { content, dataRole, style } = props;

  // Uncomment for testing.
  // return (
  //   <div>
  //     {/* {console.log(props.content)} */}
  //     {JSON.stringify(content)}
  //   </div>
  // )

  // Return component
  return (
    <header
      data-role={dataRole.wrapper}
      className={style.wrapper.tailwinds}
      // className={"w-full flex gap-4 justify-between"}
    >
      {/* Wrapper around Brand Name and Description */}
      <div
        data-role={dataRole?.brandingWrapper}
        className={style?.brandingWrapper.tailwinds}
      >
        <Link href="/" className={style.titleLink.tailwinds}>
          <h1 data-role={dataRole?.title} className={style?.title.tailwinds}>
            {content.title}
          </h1>
        </Link>
        {content?.description && (
          <p
            data-role="page-description"
            className={style?.description.tailwinds}
          >
            {content.description}
          </p>
        )}
      </div>

      {/* <nav data-role={dataRole.nav} className="w-full flex gap-4 justify-evenly">
        {content?.nav?.map((item: any, index: any): any => {
          return (
            <li  key={index}>
              <Link
                data-role={dataRole.navItem}
                className={style.navItem.tailwinds}
                href={item.href}
              >
                {item.icon()}
                {item.label}
              </Link>
            </li>
          );
        })}
      </nav> */}

      {/* <nav data-role={dataRole.nav} className={style.nav.tailwinds}>
        <ul data-role={dataRole.navList} className={style.navList.tailwinds}>
          {content?.nav?.map((item: any, index: any): any => {
            return (
              <li
                key={index}
                data-role={dataRole.navItem}
                className={style.navItem.tailwinds}
              >
                <Link
                  data-role={dataRole.navLink}
                  className={style.navLink.tailwinds}
                  // TODO 2023-08-26 | Add active vs not active class for nav items.
                  href={item.href}
                  aria-label={item.label}
                  title={item.title}
                >
                  <span
                    data-role={dataRole.navIcon}
                    className="h-4 w-4"
                  >
                    {item.icon()}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav> */}

      <nav data-role={dataRole.nav} className={style.nav.tailwinds}>
        <ul data-role={dataRole.navList} className={style.navList.tailwinds}>
          {content?.nav?.map((item: any, index: any): any => {
            return (
              <li
                key={index}
                data-role={dataRole.navItem}
                className={style.navItem.tailwinds}
              >
                <Link
                  key={index}
                  data-role={dataRole.navLink}
                  className={style.navLink.tailwinds}
                  // TODO 2023-08-26 | Add active vs not active class for nav items.
                  href={item.href}
                  aria-label={item.label}
                  title={item.title}
                >
                  <span
                    data-role={dataRole.navIcon}
                    className={style.navIcon.tailwinds}
                  >
                    {item.icon()}
                  </span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
