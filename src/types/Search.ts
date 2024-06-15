import { IndexedObjectType } from "@/utils/ObjectUtils";

/**
 * Types definition for the Search component.
 */
export type SearchPropDefaultTypes = {
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

export type SearchPropTypes = {
  data: IndexedObjectType[];
  dataKeys: string[];
  placeholder?: string;
  searchWhenTyping?: boolean;
  autoFocus?: boolean;
  styles?: {
    wrapper?: string;
    container?: string;
    input?: string;
    buttonSearch_wrapper?: string;
    buttonSearch?: string;
    buttonClear?: string;
    buttonClear_wrapper?: string;
    // Search Results
    results?: string;
    result?: string;
  };
};
