import { ContextDefault } from "@/libs/context/types";
import Footer from "@/components/footer/config";
import Header from "@/components/header/config";
import Hero from "@/components/hero/config";

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

/**
 * Page header metadata defaults.
 *
 * @todo //TODO: 20240620 #EP || Remove this and just use Next.js metadata types
 */
export function Meta(): ContextDefault["meta"] {
  return {
    author: "CONTEXT_META_AUTHOR_UNDEFINED",
    description: "CONTEXT_META_DESCRIPTION_UNDEFINED",
    created: "YYYY-MM-DD",
    modified: "YYYY-MM-DD",
    version: "#.#.#",
  };
}

/**
 * Defaults for application context related to branding
 */
export function Brand(): ContextDefault["brand"] {
  return {
    title: "CONTEXT_BRAND_TITLE_UNDEFINED",
    description: "CONTEXT_BRAND_DESCRIPTION_UNDEFINED",
    developer: "CONTEXT_BRAND_DEVELOPER_UNDEFINED",
    developerLink: "CONTEXT_BRAND_DEVELOPER_LINK_UNDEFINED",
    keywords: ["CONTEXT_BRAND_KEYWORDS_UNDEFINED"],
  };
}
