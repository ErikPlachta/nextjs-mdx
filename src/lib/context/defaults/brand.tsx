import { ContextDefault } from "context/types";
export default function Brand(): ContextDefault["brand"] {
  return {
    title: "CONTEXT_BRAND_TITLE_UNDEFINED",
    description: "CONTEXT_BRAND_DESCRIPTION_UNDEFINED",
    developer: "CONTEXT_BRAND_DEVELOPER_UNDEFINED",
    developerLink: "CONTEXT_BRAND_DEVELOPER_LINK_UNDEFINED",
    keywords: ["CONTEXT_BRAND_KEYWORDS_UNDEFINED"],
  };
}
