"use client";
import React, { Suspense } from "react";
// import ExtLink from '@/components/anchor/external';
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

// Importing card component to be used in feed.
import SummaryCards from "@/components/mdx/card/summary";
import Hero from "@/components/hero";
import Search from "@/components/search";
import { FrontmatterType } from "context/types";

/**
 * Default Props for feed component.
 *
 * @param {array} data - The posts to be rendered into feed.
 * @param {string|undefined} slugRoutingTo - The slug to be displayed when navigating to a post.
 * @param {string|undefined} basePath - The base path for the feed.}
 * @param {string} description - The description of the feed.
 * @param {number} heightFrom - The height of the card when it is not being hovered.
 * @param {number} heightTo - The height of the card when it is being hovered.
 * @param {string} path - The path of the feed.
 * @param {SortAndFilterPropTypes['config']} sortAndFilterConfig - The sort and filter options for the feed.
 */
export interface FeedProps {
  data: any[] | undefined;
  slugRoutingTo: undefined | FrontmatterType["slug"];
  heightFrom: number;
  heightTo: number;
  path: "blog" | "main" | string;
  title: string;
  description: string;
  hasSearch?: boolean;
  searchDataKeys?: string[];
  hasFilter?: boolean;
}

export const FeedComponent_DefaultProps: any = {
  data: [],
  slugRoutingTo: undefined,
  basePath: undefined,
  heightFrom: 400,
  heightTo: 200,
  sortAndFilterConfig: {
    status: ["published"],
    contentType: ["blog", "main"],
    sortKey: "publishedAt", // is initially managed at the page level using the feed
    sortDataType: "date",
    sortOrder: "descending", // is initially managed at the page level using the feed
    noSortKey_Last: true,
    noSortKey_Remove: true,
  },
  path: "NO_PATH_DEFINED",
  title: "NO_TITLE_DEFINED",
  description: "NO_DESCRIPTION_DEFINED",
  hasSearch: false,
  searchDataKeys: [],
  hasFilter: false,
};

export default function Feed(params: FeedProps = FeedComponent_DefaultProps) {
  let {
    data,
    heightFrom,
    heightTo,
    path,
    title,
    description,
    hasSearch,
    searchDataKeys,
    hasFilter,
  } = params;

  if (!data) data = FeedComponent_DefaultProps.data;
  if (!title) title = FeedComponent_DefaultProps.title;
  if (!description) description = FeedComponent_DefaultProps.description;
  if (!hasSearch) hasSearch = FeedComponent_DefaultProps.hasSearch;
  if (!searchDataKeys)
    searchDataKeys = FeedComponent_DefaultProps.searchDataKeys;
  if (!hasFilter) hasFilter = FeedComponent_DefaultProps.hasFilter;

  if (!heightFrom) heightFrom = FeedComponent_DefaultProps.heightFrom;
  if (!heightTo) heightTo = FeedComponent_DefaultProps.heightTo;

  if (path == "blog") title = "Blog";
  if (path == "main") title = "Main";

  // console.log(FeedComponent_DefaultProps)

  //-- Used to determine element to remain visible on navigate to [slug]
  let slugRoutingTo: FrontmatterType["slug"] = useSearchParams()?.get("slug");

  if (process.env.NODE_ENV === "development") {
    // console.log(`[Feed.tsx] - dev so printing params: `, params);
  }

  // function buildFilterTags(config: SortAndFilterPropTypes["config"]) {
  //   // 1. Get all distinct Tags from all data
  //   let allTags: any = [];

  //   let allData = data as (typeof Projects)[] | (typeof Notes)[];
  //   // Get all
  //   allData &&
  //     allData.map((post: any) => {
  //       post.tags.map((tag: any) => {
  //         allTags.push(tag.title);
  //       });
  //     });
  //   // Remove duplicates
  //   allTags = Array.from(new Set(allTags));
  //   // Sort alphabetically
  //   allTags.sort();
  //   // console.log(allTags);

  //   // 2. Create a Multi-Select menu
  //   let multiSelectElement = (
  //     <select
  //       id="filter-tags"
  //       name="filter-tags"
  //       multiple
  //       className="w-full h-[2rem] p-2 rounded-lg bg-white dark:bg-slate-800"
  //       key={Date.now()}
  //     >
  //       {allTags.map((tag: string) => {
  //         return (
  //           <option key={tag} value={tag}>
  //             {tag}
  //           </option>
  //         );
  //       })}
  //     </select>
  //   );

  //   // 3. Create a Wrapper Element with a Label, Multi-Select, and Clear All Tags button
  //   let filterTagsWrapper = (
  //     <div className="flex flex-col gap-2">
  //       <label htmlFor="filter-tags" className="text-lg">
  //         Tags
  //       </label>
  //       {multiSelectElement}
  //       <button
  //         className="p-2 rounded-lg bg-white dark:bg-slate-800"
  //         onClick={() => {
  //           let select = document.getElementById(
  //             "filter-tags"
  //           ) as HTMLSelectElement;
  //           select.selectedIndex = -1;
  //         }}
  //       >
  //         Clear Tags
  //       </button>
  //     </div>
  //   );

  //   // 5. return the Multi-Select menu
  //   return filterTagsWrapper;
  //   // console.log(filterTagsWrapper);
  // }

  //----------------------------------------------------------------------------
  //-- Render Page
  return (
    <Suspense>
      <Hero
        content={{
          title: title,
          description: description,
        }}
      />

      {/* Spacer  */}
      {/* <span className="p-2"></span> */}

      {/* Custom Search Component to search for content to navigate to instead of scroll click down below */}
      {hasSearch && (
        <div id="feed-search-wrapper" className="p-2 m-auto max-w-[80%]">
          <Search
            data={Array.isArray(data) ? data : []}
            dataKeys={searchDataKeys as any}
            searchWhenTyping={true}
          />
        </div>
      )}

      {/* // TODO: Add filter component once built. */}
      {/* {hasFilter && (
        <section id="feed-filter-wrapper" className="p-2 m-auto">
          {/* Asc vs Desc | Pill style container with up-down arrows next to text */}
      {/* Multi-Select Filter on Status */}
      {/* Multi-Select Filter on Content Type */}
      {/* Multi-Select Filter on Tags * /}
          {buildFilterTags(sortAndFilterConfig)}
        </section>
      )} */}

      {/* TODO: Split up sort and filtering. for now just as one. */}

      {/* Wrapper around container holding cards */}
      <section className="flex flex-col gap-4 h-full rounded-lg max-w-4xl mt-4 py-10 m-auto bg-slate-100 dark:bg-slate-800/30 shadow-sm shadow-slate-500 w-full">
        {/* Container holding cards */}
        <motion.div
          className="relative"
          initial="hidden"
          animate="showing"
          variants={{
            hidden: { opacity: 0, y: 10 },
            showing: { opacity: 1, y: 0 },
          }}
          transition={{
            ease: "easeOut",
            duration: 0.2,
            delay: 0,
            staggerChildren: 0.5,
          }}
        >
          {
            // For each post in data, build a card in the feed.
            SummaryCards(data as any, slugRoutingTo, path, heightFrom, heightTo)
          }
        </motion.div>
      </section>
    </Suspense>
  );
}
