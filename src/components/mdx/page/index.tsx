import React, { Suspense } from "react";

// import { Projects, Notes } from "contentlayer/generated";
// import { SortAndFilterPropTypes } from "@/utils/ObjectUtils";

// Type of Content to be rendered.
import Feed from "./components/feed";
import Single from "./components/single";

/**
 * The props for the ContentPage component.
 *
 * @property {string} type - The type of content to be rendered.
 * @property {object} feedData - Data to be rendered (both because a single page can have a feed within it or the page can just be a feed.)
 * @property {object} singleData - Data to be rendered (both because a single page can have a feed within it or the page can just be a feed.)
 * @property {string} path - The path to the content, like "notes" or "projects".
 * @property {string} slug - The slug of the content to be rendered.
 * @property {number} heightFrom - Default image height values for the feed and single content pages.
 * @property {number} heightTo - Default image height values for the feed and single content pages.
 * @property {string} slugRoutingTo - The slug to route to.
 * @property {object} sortAndFilterConfig - Configuration for sorting and filtering the content on page.
 * @property {string} title - The title of the content page.
 * @property {string} description - The description of the content page.
 * @property {boolean} hasSearch - Whether the content page has a search bar.
 * @property {string[]} searchDataKeys - The keys to search the data by.
 * @property {boolean} hasFilter - Whether the content page has a filter.
 */
export interface ContentPageProps {
  type: "feed" | "single";
  feedData: [] | undefined;
  singleData: any | undefined;
  path: string | "notes" | "projects";
  slug: string;
  heightFrom: number;
  heightTo: number;
  slugRoutingTo: string | undefined;
  sortAndFilterConfig: any; // TODO: Remove this or add types from other project.
  title: string;
  description: string;
  hasSearch?: boolean;
  searchDataKeys?: string[];
  hasFilter?: boolean;
}

// Default values for the component props.
export const defaults: ContentPageProps = {
  title: "ErikPlachta.com",
  description: "NO_DESCRIPTION_DEFINED",

  // The type of content to be rendered.
  type: "feed",
  // Data to be rendered (both because a single page can have a feed within it or the page can just be a feed.)
  feedData: undefined,
  singleData: undefined,

  // The path to the content, like "notes" or "projects".
  path: "NO_PATH_DEFINED",
  slug: "NO_SLUG_DEFINED",
  slugRoutingTo: undefined,

  // Default image height values for the feed and single content pages.
  heightFrom: 200,
  heightTo: 400,

  // Configuration for sorting and filtering the content on page.
  sortAndFilterConfig: {
    // The default content status to be displayed.
    status: ["published"],
    // The type of content that can be displayed.
    contentType: ["app", "library", "utility", "note", "project"],
    // The default key to sort the content by.
    sortKey: "publishedAt",
    // The default data type to sort the content by.
    sortDataType: "date",
    // The default order to sort the content by.
    sortOrder: "descending",
    // Optionally remove record from results if it does not contain the sort key.
    noSortKey_Remove: false,
    // Optionally move record to end of results if it does not contain the sort key.
    noSortKey_Last: true,
  },
  hasSearch: false,
  searchDataKeys: [],
  hasFilter: false,
};

/**
 * This component is used to render a feed of content or a single piece of content.
 *
 * @param {ContentPageProps} params - The props for the ContentPage component.
 * @returns {JSX.Element} - The rendered content page.
 *
 * @todo  20230909 | Erik Plachta | Add logic for more than just notes/projects
 */
export default function Page(params: ContentPageProps): JSX.Element {
  // Set the config to the defaults or the params.
  const args = { ...defaults, ...params };

  // Deconstructing the args for easier use.
  let {
    type,
    singleData,
    feedData,
    path,
    slug,
    sortAndFilterConfig,
    heightFrom,
    heightTo,
    slugRoutingTo,
    title,
    description,
    hasSearch,
    searchDataKeys,
    hasFilter,
  } = args;

  // Displaying a feed of content, like a feed of projects or a feed of notes.
  if (type == "feed") {
    return (
      <Suspense>
        <Feed
          data={feedData}
          heightFrom={heightFrom} // image height start px (when navigating back to feed)
          heightTo={heightTo} // image height default px.
          // sortAndFilterConfig={sortAndFilterConfig}
          path={path}
          slugRoutingTo={slugRoutingTo}
          title={title}
          description={description}
          hasSearch={hasSearch}
          searchDataKeys={searchDataKeys}
          hasFilter={hasFilter}
        />
      </Suspense>
    );
  }
  // Displaying a single content page, like a single project or a single note.
  else if (type == "single") {
    return (
      <Suspense>
        <Single
          data={singleData}
          path={path}
          slug={slug}
          heightFrom={heightFrom} // image height starts same as feed to value.
          heightTo={heightTo} // image height grows on single
          hasSearch={hasSearch}
          // searchDataKeys={searchDataKeys }
          // hasFilter={hasFilter}
          // sortAndFilter={sortAndFilter} // TODO: Add a feed to bottom of single or remove this.
        />
      </Suspense>
    );
  } else {
    return <>ERROR: INVALID Content Type: </>;
  }
}
