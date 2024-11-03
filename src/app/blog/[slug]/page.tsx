import { notFound } from "next/navigation";
// import { compileMDX } from "next-mdx-remote/rsc"; // build the MDX content and frontmatter from the remote file

// Custom Component to working with the MDX content based on my needs.
import MdxSinglePage from "@/components/mdx/page/single";
import { getMdxFileByContentTypeBySlug, compileMDXContent } from "@/libs/mdx";
import { MdxContentComponentTypes } from "@/libs/context/types";
import { SortAndFilterPropTypes } from "@/libs/ObjectUtils";

/**
 * Render MDX Content for a single Blog post from slug.
 */
export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const markdown: string = await getMdxFileByContentTypeBySlug(
    "blog",
    params.slug,
  );

  if (!markdown) {
    notFound(); // TODO: 20240615 #EP || Add a better 404 solution.
  }

  const { content, frontmatter }: MdxContentComponentTypes =
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
  // return <span>test</span>;

  return (
    <MdxSinglePage
      path="blog"
      slug={params.slug}
      data={{
        frontmatter: {
          ...frontmatter,
        },
        content: content,
      }}
      heightFrom={200} // image height start px (when navigating back to feed)
      heightTo={400} // image height default px.
    />
  );
}
