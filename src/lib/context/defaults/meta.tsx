import { ContextDefault } from '@/types';
export default function Meta():ContextDefault["meta"]{
  return {
    author: "CONTEXT_META_AUTHOR_UNDEFINED",
    description: "CONTEXT_META_DESCRIPTION_UNDEFINED",
    created: "YYYY-MM-DD",
    modified: "YYYY-MM-DD",
    version: "#.#.#",
  }
}