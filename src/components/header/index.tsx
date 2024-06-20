import React from "react";
import { HeaderDefault } from "./types";

import Navigation from "./navigation";
import Branding from "./branding";

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
      "ERROR: <Header> Component - Invalid props. To review app specific configuration, see `src/app/context/config/index.tsx`. To review default configuration, see `src/app/context/defaults/header.tsx`",
    );

  // Destructure props
  const { content, dataRole, style } = props; // TODO: Add style from context or use these defaults.

  // Return component
  return (
    <header data-role={dataRole.wrapper} className={style.wrapper.tailwinds}>
      <Branding content={content} dataRole={dataRole} style={style} />
      <Navigation content={content} dataRole={dataRole} style={style} />
    </header>
  );
}
