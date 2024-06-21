# NextJs-MDX

Using MDX content within NextJs App and Page routes via next-mdx and next-mdx-remote.

## Requirements

Libraries required to use MDX content with NextJs natively.

- `@next/mdx` - NextJs MDX package for server-side rendering.
- `@next/mdx-remote` - NextJs MDX package for static site generation.
- `next` - NextJs framework.
- `react` - React library.
- `react-dom` - React DOM library.

## Optional Requirements

Additional libraries I used for this project that are not required for the core functionality.

- `tailwindcss` - Utility-first CSS framework.
- `typescript` - Typed JavaScript.

## Milestones

- [x] Research MDX content in NextJs.
- [x] Create NextJs project with MVP requirements and latest NextJs - 14.2.4.
- [ ] Build Content
  - [ ] `main` - to be used with `next-mdx`
  - [x] `blog` - to be used with `next-mdx-remote`
- [ ] Build App directory

  - [x] blog
    - [x] Feed - Get summary, generate cards of content that exists
    - [x] Page - Get full remote mdx content from slug
  - [ ] main

- [ ] Use Page directory
  - [ ] Generate MDX content from main with hard-coded content name.
  - [ ] Get MDX content summary for blog feed.
  - [ ] Get MDX content for page based on slug.
