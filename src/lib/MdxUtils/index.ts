import { JSXElementConstructor, ReactElement } from "react";

// Work with the file system.
import path from "path";
import { readFile, access, readdir } from "fs/promises";

// Parses MDX file to get frontmatter (metadata) and content (body).
// import { MDXComponents } from "mdx/types"; // TODO: 20240615 #EP || Remove once verified not needed in COMPONENTS below
import { compileMDX } from "next-mdx-remote/rsc";
import { MdxContentSourceType, MdxContentType } from "@/types";

/**
 * The content directories to search for content files and their hard-coded paths from root directory.
 */
export const CONTENT: MdxContentSourceType[] = [
  { type: "blog", dir: path.join(process.cwd(), "./src/content/blog") },
  { type: "main", dir: path.join(process.cwd(), "./src/content/main") },
];

// TODO: Make sure ALL components that are used in ALL files are here and then in COMPONENTS below.
// import Callout from "@/components/Callout";
// import Code from "@/components/Code";
// import ProsCard from "@/components/Card/ProsCard";
// import ConsCard from "@/components/Card/ConsCard";
// import RoundedImage from "@/components/image/RoundedImage";

import SummaryCard from "@/components/mdx/card/summary";
import Hero from "@/components/hero";

/**
 * Components that are embedded in  MDX content.
 *
 * As a note, I had an issue with SummaryCard until I made it a client component.
 */
export const COMPONENTS: any =
  //| Readonly<MDXComponents>
  //| MDXComponents
  //| null
  //| undefined
  // TODO: 20240615 #EP || Resolve type casting here.
  {
    Hero,
    SummaryCard,
    // SummaryCard
    // Callout,
    // Code,
    // ProsCard,
    // ConsCard,
    // RoundedImage,
  };

export async function getPostSlugs(contentType: MdxContentType) {
  const contentDir = CONTENT.find(
    (content) => content.type === contentType
  )?.dir;
  if (!contentDir) {
    // Invalid request
    return [];
  }

  // 2. Get all the files in the content directory.
  const files = await readdir(contentDir);

  const slugs = files.map((file) => {
    // remove the YYYYMMDD_ prefix and the .mdx extension
    return file.replace(/^\d{8}_/, "").replace(/\.mdx$/, "");
  });

  return slugs;
}

/**
 * Text content from a MDX fiel if found based on the content type and slug.
 */
export type ReadPostFileByTypeBySlugResultsType = string | null;

/**
 *
 * @param contentType - The type of content to search for.
 * @param slug - The slug of the content to search for, which is a meta value within the content file.
 * @returns The content of the file if found, otherwise null.
 */
export async function readPostFileByTypeBySlug(
  contentType: MdxContentType,
  slug: string
): Promise<ReadPostFileByTypeBySlugResultsType> {
  console.log("readPostFile: ", contentType, slug);
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

export type CompileMDXContentResultsType = {
  content: ReactElement<any, string | JSXElementConstructor<any>>;
  frontmatter: { [key: string]: any };
};
/**
 * Convert the MDX file content into a React component.
 *
 */
export async function compileMDXContent({
  source,
}: {
  source: string;
}): Promise<CompileMDXContentResultsType> {
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: source,
    options: { parseFrontmatter: true },
    components: {
      ...COMPONENTS,
    },
  });

  return { content, frontmatter };
}