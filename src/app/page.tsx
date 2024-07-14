// "use client";
import type { Metadata } from "next";

// @ts-ignore - This is a Next.js specific import to allow extraction of metadata
import HomepageMdx, { frontmatter } from "/content/main/homepage.mdx";

// let page = HomepageMdx({});
// console.log("pageMeta: ", pageMeta);

export const metadata: Metadata = {
  ...frontmatter,
  title: frontmatter?.title,
  description: frontmatter?.summary,
};

export default function Homepage(props: any): JSX.Element {
  //console.log("HomepageMdx", HomepageMdx({}));
  //console.log("params", props);
  // console.log("frontmatter", frontmatter);
  return <HomepageMdx />;
}
