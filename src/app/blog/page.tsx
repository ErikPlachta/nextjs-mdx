import React, { Suspense } from "react";
import { getMdxFilesFrontmatterByContentTypeByStatus } from "@/lib/MdxUtils/index";
import Page from "@/components/mdx/page";
// import { SortAndFilter } from "@/lib/ObjectUtils/index";

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
    sortKey: "updatedAt",
    sortDataType: "date",
    sortOrder: "descending",
    // noSortKey_Last: true,
    noSortKey_Remove: true,
  },
};

// If in development, show all post statuses & content types.
if (process.env.NODE_ENV === "development") {
  // Note: Uncomment if want to display all content
  defaults.sortAndFilterConfig.status.push(
    "hidden",
    "draft",
    "archived",
    "deleted"
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
      defaults.sortAndFilterConfig.status // visibleStatusTypes
    )) as [], // TODO: Update to use a type
  };
}

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
    // console.log("data: ", data.allContent);
    return data.allContent;
  });

  // Building the feedData based on the sortAndFilterConfig
  //let dataForFeed2 = SortAndFilter({
  //  // ...feedData,
  //  data: content,
  //  config: sortAndFilterConfig,
  //}) as any;

  let dataForFeed = content;
  //{
  //  // ...feedData,
  //  data: content,
  //  config: sortAndFilterConfig,
  //} as any;

  //console.log("!!!!: content: ", content);
  //console.log("!!!!: feedData: ", feedData);
  // console.log("!!!!: config: ", sortAndFilterConfig);

  return (
    <Suspense>
      <Page
        title={title}
        description={description}
        type={type}
        feedData={dataForFeed}
        singleData={singleData}
        path={path}
        slug={slug}
        slugRoutingTo={"slugRoutingTo"}
        heightFrom={heightFrom}
        heightTo={heightTo}
        sortAndFilterConfig={sortAndFilterConfig}
        hasSearch={true}
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
      />
      {/* TODO: 20230826 | Remove this console log once done testing. */}
      {/* {console.log("feedData", content)}{" "} */}
    </Suspense>
  );
}
