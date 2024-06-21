import { MdxFrontmatterTypes } from "@/libs/mdx/types";

/**
 * MDX Feed component Sort and Filter configuration types.
 */
export type FeedComponentSortAndFilterConfigTypes = {
  status: string[];
  contentType: string[];
  sortKey: string;
  sortDataType: string;
  sortOrder: string;
  noSortKey_Last: boolean;
  noSortKey_Remove: boolean;
};

/**
 * MDX Feed Component default configuration types.
 */
export type FeedComponentDefaultsTypes = {
  title: string;
  description: string;
  path: string; // Base path to the content, like "/blog".
  data: any[];
  searchDataKeys: string[];
  slugRoutingTo: MdxFrontmatterTypes["slug"];
  heightFrom: number;
  heightTo: number;
  hasSearch: boolean;
  hasFilter: boolean;
  sortAndFilterConfig: FeedComponentSortAndFilterConfigTypes;
};

/**
 * MDX Feed Component props types.
 */
export type FeedComponentPropsTypes = {
  title: FeedComponentDefaultsTypes["title"];
  description: FeedComponentDefaultsTypes["description"];
  data: FeedComponentDefaultsTypes["data"];
  searchDataKeys?: FeedComponentDefaultsTypes["searchDataKeys"];
  path: FeedComponentDefaultsTypes["path"]; // The path to the content, like "/blog".
  slugRoutingTo: FeedComponentDefaultsTypes["slugRoutingTo"];
  heightFrom: FeedComponentDefaultsTypes["heightFrom"];
  heightTo: FeedComponentDefaultsTypes["heightTo"];
  hasSearch?: FeedComponentDefaultsTypes["hasSearch"];
  hasFilter?: FeedComponentDefaultsTypes["hasFilter"];
  sortAndFilterConfig?: FeedComponentDefaultsTypes["sortAndFilterConfig"];
};
