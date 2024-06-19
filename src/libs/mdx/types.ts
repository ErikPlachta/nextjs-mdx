/**
 * Types for MDX Content related to MDX content directly.
 */
import { JSXElementConstructor, ReactElement } from "react";

// TODO: Simplify this type to only include the necessary properties and verify integrity.

/**
 * MDX file type definition for the project.
 */
export type MdxContentProcessedTypes = {
  content: string;
  frontmatter: MdxFrontmatterTypes;
};

/**
 * The content configuration for the application.
 */
export type MdxContentSourceTypes = {
  title: string;
  description: string;
  fileType: "mdx";
  contentType: string;
  source: string;
};

/**
 * Metadata within MDX files.
 */
export type MdxFrontmatterTypes = {
  slug: string | null | undefined;
  title: string;
  summary?: string;
  description?: string;
  author: string;
  image: string | null;
  blend: string | null;
  contentType: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt: string;
  tags?: string[];
  status: any;
};

/**
 * Status of MDX Content
 */
export type FrontmatterStatusTypes =
  | "draft"
  | "published"
  | "archived"
  | "deleted"
  | "hidden"
  | "private"
  | "unlisted"
  | "scheduled";

/**
 * Types for React Component using MDX content.
 */
export type MdxContentComponentTypes = {
  content: ReactElement<any, string | JSXElementConstructor<any>>;
  frontmatter: Partial<MdxFrontmatterTypes>;
};
