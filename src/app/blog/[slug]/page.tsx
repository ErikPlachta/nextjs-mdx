// import ContentPage from "@/components/Content";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";
import { readFile, access, readdir } from "fs/promises";

import { notFound } from "next/navigation";

const CONTENT = [
  { type: "note", dir: path.join(process.cwd(), "./src/content/notes") },
  { type: "project", dir: path.join(process.cwd(), "./src/content/projects") },
];

// import { SortAndFilterPropTypes } from "@/utils/ObjectUtils";

// import Callout from "@/components/Callout";
// import Code from "@/components/Code";
// import ProsCard from "@/components/Card/ProsCard";
// import ConsCard from "@/components/Card/ConsCard";
// import RoundedImage from "@/components/image/RoundedImage";

const COMPONENTS = {
  // Callout,
  // Code,
  // ProsCard,
  // ConsCard,
  // RoundedImage,
};

async function readPostFile(contentType: string, slug: string) {
  // 1. Based on contentType, get directory and then files
  const contentDir = CONTENT.find(
    (content) => content.type === contentType
  )?.dir;
  if (!contentDir) {
    // Invalid request
    return null;
  }

  // 2. Get all the files in the content directory.
  const files = await readdir(contentDir);

  let filePath = null;

  // 2. Search for `slug` as an exact match of the file name, after removing extension and date prefix.
  files.forEach((file) => {
    // remove the YYYYMMDD_ prefix and the .mdx extension
    const fileName = file.replace(/^\d{8}_/, "").replace(/\.mdx$/, "");
    if (fileName === slug) {
      filePath = path.join(contentDir, file);
    }
  });

  // 3. If no file was found, return null.
  if (!filePath) {
    return null;
  }

  // 4. Verify the file exists and can read it.
  try {
    await access(filePath);
  } catch (err) {
    return null;
  }

  // 5. Get the file content.
  const fileContent = await readFile(filePath, { encoding: "utf8" });

  // 6. Return the file content.
  return fileContent;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const markdown = await readPostFile("note", params.slug);

  if (!markdown) {
    notFound();
  }

  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: markdown,
    options: { parseFrontmatter: true },
    components: {
      ...COMPONENTS,
    },
  });

  const sortAndFilterConfig_RelatedContentFeed: SortAndFilterPropTypes["config"] =
    {
      status: [],
      contentType: [],
      sortKey: undefined, //
      sortDataType: undefined,
      sortOrder: undefined,
    };
  // let post = allNotes.find(
  //   (project: { slug: string }) =>
  //     project.slug.toLowerCase() === `notes/${slug.toLowerCase()}`
  // );

  // do something with frontmatter, like set metadata or whatever

  // return <>{content}</>;

  return (
    <ContentPage
      type="single"
      path="notes"
      slug={params.slug}
      singleData={{
        frontmatter: {
          ...frontmatter,
        },
        content: content,
      }}
      feedData={undefined}
      heightFrom={200} // image height start px (when navigating back to feed)
      heightTo={400} // image height default px.
      slugRoutingTo={"/notes"}
      // TODO: Onboard to use as filtering the related content feed at bottom of single page.
      sortAndFilterConfig={sortAndFilterConfig_RelatedContentFeed}
      title=""
      description=""
    />
  );
}
