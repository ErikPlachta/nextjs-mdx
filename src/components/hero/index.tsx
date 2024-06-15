import Context from "context/index";
import { ContextConfigType, HeroConfig, HeroDefault } from "@/types";

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
  const { content, dataRole, style } = { ...heroDefaults, ...props };

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
