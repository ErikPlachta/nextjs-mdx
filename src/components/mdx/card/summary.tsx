"use client";
import { SortAndFilter, SortAndFilterPropTypes } from "@/lib/ObjectUtils";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useEffect } from "react";

import { MdxDataType } from "@/types/index";

/**
 * Build a summary card for a note or project.
 *
 * @TODO 20240225 #EP || Update to work for anything, not just note and project.
 * @TODO 20240225 #EP || Cleanup rendering of card to be more flexible. Lots of hard-coded values related to Feeds and navigation.
 */
export default function SummaryCards(
  data: any,
  slugRoutingTo: string | null,
  basePath: string | null,
  heightFrom: number,
  heightTo: number,
  sortAndFilterConfig: SortAndFilterPropTypes["config"]
): JSX.Element[] {
  // No data, return empty array.
  if (!data) {
    return [];
  }

  // data = SortAndFilter({
  //   data,
  //   config: sortAndFilterConfig,
  // }) as [];

  // useEffect(() => {
  //   // console.log("data: ", data);
  // }, [data]);
  console.log("data: ", data);
  let dataForFeed: any = data.data;
  console.log("dataForFeed: ", dataForFeed);

  return dataForFeed.map((item: any, index: number) => {
    return (
      <motion.div
        key={index}
        className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 }}
      >
        <Link href={`${basePath}/${item.slug}`}>
          <div className="h-full p-6 rounded-lg shadow-md hover:shadow-lg bg-blue-700/20">
            {/* <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.description}</p> */}
            {JSON.stringify(item)}
          </div>
        </Link>
      </motion.div>
    );
  });
}
