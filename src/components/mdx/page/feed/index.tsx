"use client";
import React, { Suspense, type JSX } from "react";
// import ExtLink from '@/components/anchor/external';
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

// Importing card component to be used in feed.
import SummaryCards from "@/components/mdx/card/summary";
import Hero from "@/components/hero";
import Search from "@/components/search";

import { FeedComponentPropsTypes, FeedComponentDefaultsTypes } from "./types";

export const FeedComponent_DefaultProps: FeedComponentDefaultsTypes = {
  title: "NO_TITLE_DEFINED",
  description: "NO_DESCRIPTION_DEFINED",
  path: "NO_PATH_DEFINED",
  data: [],
  searchDataKeys: [],
  slugRoutingTo: undefined,
  heightFrom: 400,
  heightTo: 200,
  hasSearch: false,
  hasFilter: false,
  sortAndFilterConfig: {
    status: ["published"], // TODO: Update so this is pulled from context.
    contentType: ["blog", "main"], // TODO: Update so this is pulled from Context and/or more generic.
    sortKey: "publishedAt", // is initially managed at the page level using the feed
    sortDataType: "date",
    sortOrder: "descending", // Default is set to descending
    noSortKey_Last: true,
    noSortKey_Remove: true,
  },
};

/**
 * Generate a list of summary cards from an array of data.
 *
 * @param params
 * @returns
 */
export default function Feed(params: FeedComponentPropsTypes): JSX.Element {
  //----------------------------------------------------------------------------
  // Spread Default Props and then params to ensure all values are set.

  const props: FeedComponentDefaultsTypes = {
    ...FeedComponent_DefaultProps,
    ...params,
  };

  //if (path == "blog") title = "Blog";
  //if (path == "main") title = "Main";

  // console.log(FeedComponent_DefaultProps)

  //-- Used to determine element to remain visible on navigate to [slug]
  let slugRoutingTo: FeedComponentPropsTypes["slugRoutingTo"] =
    useSearchParams()?.get("slug");

  // if (process.env.NODE_ENV === "development") {
  //   console.log(`[Feed.tsx] - dev so printing params: `, params);
  // }

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
          title: props.title,
          description: props.description,
        }}
      />

      {/* Spacer  */}
      {/* <span className="p-2"></span> */}

      {/* Custom Search Component to search for content to navigate to instead of scroll click down below */}
      {props.hasSearch && (
        <div id="feed-search-wrapper" className="m-auto w-full p-6">
          <Search
            data={Array.isArray(props.data) ? props.data : []}
            dataKeys={props.searchDataKeys as any}
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
      <section className="m-auto mt-4 flex h-full w-full max-w-4xl flex-col gap-4 rounded-lg bg-slate-100 py-10 shadow-sm shadow-slate-500 dark:bg-slate-800/30">
        {/* Container holding cards */}
        <motion.div
          {...{
            className: "relative",
          }}
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
            SummaryCards(
              props.data as any,
              slugRoutingTo,
              props.path,
              props.heightFrom,
              props.heightTo,
            )
          }
        </motion.div>
      </section>
    </Suspense>
  );
}
