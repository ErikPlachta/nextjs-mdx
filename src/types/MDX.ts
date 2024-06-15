/**
 * MDX file type definition for the project.
 */
export type MdxDataType = {
  frontmatter: FrontmatterType;
  content: string;
};

export type MdxContentSourceType = {
  type: MdxContentType;
  dir: string;
};

export type MdxContentType = "main" | "blog";

/**
 * Metadata within MDX files.
 */
export type FrontmatterType = {
  slug: string;
  title: string;
  summary: string;
  author: string;
  image: string | null;
  blend: string | null;
  type: MdxContentType;
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
