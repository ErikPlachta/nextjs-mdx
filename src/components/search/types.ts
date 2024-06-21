import { IndexedObjectType } from "@/libs/ObjectUtils";

/**
 * Types definition for the Search component defaults.
 *
 * @typedef {object} SearchComponentDefaultsType
 * @property {IndexedObjectType[]} data - Type from custom library that represents an object with an index based on application design.
 * @property {string[]} dataKeys - Array of strings that represent the keys to search within the data object.
 * @property {string} placeholder - Placeholder text for the search input.
 * @property {boolean} searchWhenTyping - Flag to determine if the search should be performed as the user types.
 * @property {boolean} autoFocus - Flag to determine if the search input should be focused on load.
 * @property {object} styles - Object containing the styles for the search component.
 * @property {string} styles.wrapper - TailwindCSS class for the wrapper around the search element.
 * @property {string} styles.container - TailwindCSS class for the container holding the input and buttons.
 * @property {string} styles.input - TailwindCSS class for the input within the search container.
 * @property {string} styles.buttonSearch_wrapper - TailwindCSS class for the button search wrapper.
 * @property {string} styles.buttonSearch - TailwindCSS class for the button search.
 * @property {string} styles.buttonClear - TailwindCSS class for the button clear.
 * @property {string} styles.buttonClear_wrapper - TailwindCSS class for the button clear wrapper.
 * @property {string} styles.results - TailwindCSS class for the results container to pick from when searching.
 * @property {string} styles.result - TailwindCSS class for the result.
 * @memberof components
 */
export type SearchComponentDefaultsTypes = {
  data: IndexedObjectType[];
  dataKeys: string[];
  placeholder: string;
  searchWhenTyping: boolean;
  autoFocus: boolean;
  styles: {
    wrapper: string;
    container: string;
    input: string;
    buttonSearch_wrapper: string;
    buttonSearch: string;
    buttonClear: string;
    buttonClear_wrapper: string;
    // Search Results
    results: string;
    result: string;
  };
};

/**
 * Types definition for the Search component props. Requires Data & Keys but all else is optional.
 */
export type SearchComponentPropsTypes = {
  data: SearchComponentDefaultsTypes["data"];
  dataKeys: SearchComponentDefaultsTypes["dataKeys"];
} & Partial<SearchComponentDefaultsTypes>;
