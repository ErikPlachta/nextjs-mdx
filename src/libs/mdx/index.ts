// "use server";
// Work with the file system.
import path from "path";
import { readFile, access, readdir } from "fs/promises";
// import Content from 'context/content' // TODO: Update path for content to come from context.

// Parses MDX file to get frontmatter (metadata) and content (body).
// import { MDXComponents } from "mdx/types"; // TODO: 20240615 #EP || Remove once verified not needed in COMPONENTS below
import { compileMDX } from "next-mdx-remote/rsc";
import { MdxContentComponentTypes } from "@/libs/context/types";

/**
 * The content directories to search for content files and their hard-coded paths from root directory.
 */
export const CONTENT: any[] = [
  // TODO: Update this to pull from ContextConfig
  { type: "blog", dir: path.join(process.cwd(), "./content/blog") },
  { type: "main", dir: path.join(process.cwd(), "./content/main") },
];

// TODO: Make sure ALL components that are used in ALL files are here and then in COMPONENTS below.
// import Callout from "@/components/Callout";
// import Code from "@/components/Code";
// import ProsCard from "@/components/Card/ProsCard";
// import ConsCard from "@/components/Card/ConsCard";
// import RoundedImage from "@/components/image/RoundedImage";

import SummaryCard from "@/components/mdx/card/summary";
import Hero from "@/components/hero";
import Callout from "@/components/callout";

/**
 * Components that are embedded in  MDX content.
 *
 * As a note, I had an issue with SummaryCard until I made it a client component.
 */
export const COMPONENTS: any = {
  Hero,
  SummaryCard,
  // SummaryCard
  Callout,
  // Code,
  // ProsCard,
  // ConsCard,
  // RoundedImage,
};

/**
 * Text content from a MDX file if found based on the content type and slug.
 */

/**
 * Get ALL data for a single MDX file based on the content type and slug.
 *
 * @param contentType - The type of content to search for.
 * @param slug - The slug of the content to search for, which is a meta value within the content file.
 * @returns The content of the file if found, otherwise null.
 */
export async function getMdxFileByContentTypeBySlug(
  contentType: string,
  slug: string,
): Promise<any> {
  // TODO: 20240616 #EP || Add type here once finalized concept
  // console.log("readPostFile: ", contentType, slug);
  // 1. Based on contentType, get directory and then files
  const contentDir = CONTENT.find(
    (content) => content.type === contentType,
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

/**
 * Get the front matter of all the files in the content directory based on the content type.
 *
 * @param {MdxContentType} contentType - The type of content to search for.
 * @param {string[]} visibleStatusTypes - The status types to filter the content.
 * @returns {Promise<any[]>} - The front matter of the files in the content directory.
 */
export async function getMdxFilesFrontmatterByContentTypeByStatus(
  contentType: string,
  visibleStatusTypes: string[],
): Promise<any[]> {
  const contentDir = CONTENT.find(
    (content) => content.type === contentType,
  )?.dir;
  if (!contentDir) {
    // Invalid request
    return [];
  }

  // 2. Get all the files in the content directory by filtering for MDX files.
  const files = (await readdir(contentDir)).filter((file) =>
    file.endsWith(".mdx"),
  );

  // 3. Compile the MDX Content, and extract just the front matter filtering by status
  const allContent = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(contentDir, file);
      const fileContent = await readFile(filePath, { encoding: "utf8" });
      const { frontmatter } = await compileMDXContent({ source: fileContent });

      if (
        visibleStatusTypes.includes(
          (frontmatter.status as string).toLowerCase().trim(),
        )
      ) {
        return frontmatter;
      }
      // If the status is not in the visibleStatusTypes, return null
      return null;
    }),
  );

  // Filter out null values and return the front matter
  return allContent.filter((content) => content !== null);
}

/**
 * Convert the MDX file content into a React component.
 *
 */
export async function compileMDXContent({
  source,
}: {
  source: string;
}): Promise<MdxContentComponentTypes> {
  const { content, frontmatter } = await compileMDX({
    source: source,
    options: { parseFrontmatter: true },
    components: {
      ...COMPONENTS,
    },
  });

  return { content, frontmatter };
}
