import { notFound } from "next/navigation";
// import { compileMDX } from "next-mdx-remote/rsc"; // build the MDX content and frontmatter from the remote file

// Custom Component to working with the MDX content based on my needs.
import Page from "@/components/mdx/page";
import {
  getMdxFileByContentTypeBySlug,
  compileMDXContent,
} from "@/libs/MdxUtils";
import {
  CompiledMDXContentResultsType,
  MdxContentSourceType,
} from "@/libs/context/types";
import { SortAndFilterPropTypes } from "@/libs/ObjectUtils";

/**
 * Render MDX Content for a single Blog post from slug.
 */
export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const markdown: string = await getMdxFileByContentTypeBySlug(
    "blog",
    params.slug
  );

  if (!markdown) {
    notFound(); // TODO: 20240615 #EP || Add a better 404 solution.
  }

  const { content, frontmatter }: CompiledMDXContentResultsType =
    await compileMDXContent({
      source: markdown,
    });

  /**
   * Configuration for how to sort and filter the related content feed.
   */
  const sortAndFilterConfig_RelatedContentFeed: SortAndFilterPropTypes["config"] =
    {
      status: [],
      contentType: [],
      sortKey: undefined, //
      sortDataType: undefined,
      sortOrder: undefined,
    };

  // console.log("frontmatter: ", frontmatter);
  // Render a single Markdown data into a Client Component.
  return (
    <Page
      path="blog"
      slug={params.slug}
      type={"single"} // single or feed
      singleData={{
        frontmatter: {
          ...frontmatter,
        },
        content: content,
      }}
      feedData={undefined}
      heightFrom={200} // image height start px (when navigating back to feed)
      heightTo={400} // image height default px.
      slugRoutingTo={"/blog/[slug]"} // TODO: verify MdxContent uses this for single/feed and update accordingly
      // TODO: Onboard to use as filtering the related content feed at bottom of single page.
      title="" // TODO: verify MdxContent uses this for single/feed and update accordingly
      description="" // TODO: verify MdxContent uses this for single/feed and update accordingly
      sortAndFilterConfig={sortAndFilterConfig_RelatedContentFeed}
    />
  );
}
