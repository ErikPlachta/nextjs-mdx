import React, { Suspense, type JSX } from "react";
import { getMdxFilesFrontmatterByContentTypeByStatus } from "@/libs/mdx/index";
import MdxFeed from "@/components/mdx/page/feed";
import { SortAndFilter } from "@/libs/ObjectUtils"; // Sorting and filtering data on server before sending up to client.

const defaults: any = {
  // TODO: import the correct type and add here
  title: "Blog | Next-Mdx",
  description: "Using next-mdx-remote to build a content feed from MDX files.",
  type: "feed",
  feedData: {
    data: [],
    config: {},
  },
  singleData: undefined,
  path: "blog",
  slug: "", // Empty by default
  slugRoutingTo: "/blog",

  // Cards in feed size management
  heightFrom: 400,
  heightTo: 200,

  sortAndFilterConfig: {
    status: ["published"],
    contentType: ["note"],
    sortKey: "publishedAt",
    sortDataType: "date",
    sortOrder: "ascending", // overriding default
    // noSortKey_Last: true,
    //noSortKey_Remove: true,
  },
};

// If in development, show all post statuses & content types.
if (process.env.NODE_ENV === "development") {
  // Note: Uncomment if want to display all content
  defaults.sortAndFilterConfig.status.push(
    "hidden",
    "draft",
    "archived",
    "deleted",
  );
  // Note: Uncomment to display templates. Keeping for dev purposes when updating templates.
  // defaults.sortAndFilterConfig.contentType.push("template");
}

// Setting the HTML Metadata.
export const metadata: any = {
  // TODO: Import metadata type and add here
  title: defaults.title,
  description: defaults.description,
};

async function getData(): Promise<{ allContent: [] }> {
  // console.log("test");
  return {
    allContent: (await getMdxFilesFrontmatterByContentTypeByStatus(
      "blog", // contentType
      defaults.sortAndFilterConfig.status, // visibleStatusTypes
    )) as [], // TODO: Update to use a type
  };
}

/**
 * Take MDX Content and generate a feed.
 *
 * @returns {JSX.Element} - The rendered MDX content for Blog.
 */
export default async function BlogFeed(): Promise<JSX.Element> {
  const args = { ...defaults };
  // deconstructing
  let {
    title,
    description,
    type,
    feedData,
    singleData,
    path,
    slug,
    heightFrom,
    heightTo,
    slugRoutingTo,
    sortAndFilterConfig,
  } = args;

  const content: any = await getData().then((data) => {
    // console.log(data.allContent);

    // Get all content
    let _allContent = data?.allContent;
    // Sort and filter data before sending to client.
    let sortedFilteredContent = SortAndFilter({
      data: _allContent,
      config: sortAndFilterConfig,
    });

    // return sorted and filtered data
    return sortedFilteredContent;
  });

  let dataForFeed = content;

  return (
    <Suspense>
      <MdxFeed
        title={title}
        description={description}
        data={dataForFeed}
        path={path}
        slugRoutingTo={"slugRoutingTo"}
        heightFrom={heightFrom}
        heightTo={heightTo}
        sortAndFilterConfig={sortAndFilterConfig}
        searchDataKeys={[
          "slug",
          "title",
          "summary",
          "author",
          "createdAt",
          "publishedAt",
          "updatedAt",
          "contentType",
        ]}
        hasFilter={true}
        hasSearch={true}
      />
    </Suspense>
  );
}
