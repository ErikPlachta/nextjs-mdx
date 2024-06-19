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
  path: string;
  data: any[];
  searchDataKeys: [];
  slugRoutingTo: MdxFrontmatterTypes["slug"];
  basePath: undefined;
  heightFrom: 400;
  heightTo: 200;
  hasSearch: false;
  hasFilter: false;
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
  path: FeedComponentDefaultsTypes["path"];
  slugRoutingTo: FeedComponentDefaultsTypes["slugRoutingTo"];
  heightFrom: FeedComponentDefaultsTypes["heightFrom"];
  heightTo: FeedComponentDefaultsTypes["heightTo"];
  hasSearch?: FeedComponentDefaultsTypes["hasSearch"];
  hasFilter?: FeedComponentDefaultsTypes["hasFilter"];
};
