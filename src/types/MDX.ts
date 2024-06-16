import { JSXElementConstructor, ReactElement } from "react";

/**
 * MDX file type definition for the project.
 */
export type MdxDataType = {
  frontmatter: FrontmatterType;
  content: string;
};

/**
 * The content configuration for the application.
 *
 * @property {string} title - Title of the content.
 * @property {string} description - Description of the content.
 * @property {"mdx"} fileType - Type of content supported by the app at this time. (should match the folder name and how it's referenced within the app).
 * @property {string} contentType - The type of content. (e.g. blog, main, etc.)
 * @property {string} source - Source of the content. (e.g. URL, file path, etc.) ex: `{ type: "blog", dir: path.join(process.cwd(), "./content/blog") }`
 */
export type MdxContentSourceType = {
  title: string;
  description: string;
  fileType: "mdx";
  contentType: string;
  source: string;
};

export type CompiledMDXContentResultsType = {
  content: ReactElement<any, string | JSXElementConstructor<any>>;
  frontmatter:
    | Partial<FrontmatterType>
    | Partial<BlogFrontmatterType>
    | Partial<MainFrontmatterType>;
};

/**
 * Metadata within MDX files.
 *
 * @property {string} slug - The URL slug of the content.
 * @property {string} title - The Title to be displayed.
 * @property {string} summary - A brief summary of the content to show in previews and on page description(s).
 * @property {string} author - The author of the content.
 * @property {string} image - Optional  image to display with the content.
 * @property {string} blend - Optional blend mode for the image.
 * @property {string} contentType - The parent level group the content belongs to. Ex: `blog`, `main`, etc.
 * @property {FrontmatterStatusType} status - The status of the content.
 * @property {string} createdAt - The date the content was created.
 * @property {string} updatedAt - The date the content was last updated.
 * @property {string} publishedAt - The date the content was published.
 */
export type FrontmatterType = {
  slug: string | null | undefined;
  title: string;
  summary: string;
  author: string;
  image: string | null;
  blend: string | null;
  contentType: string;
  status: FrontmatterStatusType;
  createdAt?: string;
  updatedAt?: string;
  publishedAt: string;
};

/**
 * Metadata within MDX files for main content.
 */
export type MainFrontmatterType = FrontmatterType; // TODO: 20240615 #EP || Ad more type info if needed.

/**
 * Metadata within MDX files for Blog content.
 */
export type BlogFrontmatterType = {
  tags: string[];
} & FrontmatterType;

/**
 * Status of MDX Content
 */
export type FrontmatterStatusType =
  | "draft"
  | "published"
  | "archived"
  | "deleted"
  | "hidden"
  | "private"
  | "unlisted"
  | "scheduled";
