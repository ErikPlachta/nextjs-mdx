import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  experimental: {
    reactCompiler: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  extension: /\.mdx?$/,
  // options: {
  //   remarkPlugins: [],
  //   rehypePlugins: [],
  // },
});

// module.exports = nextConfig;
export default withMDX(nextConfig);
