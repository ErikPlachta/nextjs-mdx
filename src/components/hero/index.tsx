import Context from "@/libs/context"; // TODO: Update to get from header?
import {
  ContextConfigType,
  HeroConfig,
  HeroDefault,
} from "@/libs/context/types";

import type { JSX } from "react";

// Gets default component values for the Hero Component from src/context. ( Application defaults unless user modified in src/context/config/index.tsx )
const context: ContextConfigType = Context();
const heroDefaults: HeroDefault = context.app.component.hero;

/**
 * @name Hero
 * @memberof components
 * @description The hero component is used to display a title and description for a page.
 * @param {HeroConfig} props The props for the component. @see {@link '@/types/HeroConfig'} for more information.
 * @returns A React component.
 *
 * @todo Add a prop for the hero image, alt text, etc.
 * @todo Add prop for layouts? (e.g. centered, left, right, etc.)
 * @todo Add prop for style
 */
export default function Hero(props: HeroConfig): JSX.Element {
  // Takes expected defaults, user defined props, validates them, and returns props object.
  // const {verifiedProps, validProps} = validateProps(heroDefault, props) as HeroDefault;

  // ELSE log warning and use default prop.

  // Spread props over defaults to ensure all props are set correctly

  const {
    content,
    dataRole,
    //layout, //TODO: 20230826 | Onboard layout once everything else is configured
    style,
  } = { ...heroDefaults, ...props };

  return (
    <div data-role={dataRole.wrapper} className={style.wrapper.tailwinds}>
      {content.title && (
        <h1 data-role={dataRole.title} className={style.title.tailwinds}>
          {content.title}
        </h1>
      )}
      {content.description && (
        <p data-role="hero-description" className={style.description.tailwinds}>
          {content.description}
        </p>
      )}
    </div>
  );
}
