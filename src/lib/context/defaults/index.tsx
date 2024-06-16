import { ContextDefault } from "@/types";
import Brand from "./brand";
import Footer from "./footer";
import Header from "./header";
import Hero from "./hero";
import Meta from "./meta";

/**
 * Builds default values for the Context object to return to the app.
 */
export default function Defaults(): ContextDefault {
  const headerDefaults = Header();
  const footerDefaults = Footer();
  const brandDefaults = Brand();
  const metaDefaults = Meta();
  const heroDefaults = Hero();

  // Validate the props passed in.
  const context: ContextDefault = {
    content: [],
    brand: { ...brandDefaults },
    meta: { ...metaDefaults },
    app: {
      layout: {
        header: { ...headerDefaults },
        footer: { ...footerDefaults },
      },
      component: {
        hero: { ...heroDefaults },
      },
    },
  };
  return context;
}
