"use client";
import { SortAndFilter, SortAndFilterPropTypes } from "@/lib/ObjectUtils";
import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense } from "react";

import { MdxDataType } from "@/types/index";

/**
 * Build a summary card for a note or project.
 *
 * @TODO 20240225 #EP || Update to work for anything, not just note and project.
 * @TODO 20240225 #EP || Cleanup rendering of card to be more flexible. Lots of hard-coded values related to Feeds and navigation.
 */
export default function SummaryCards(
  data: MdxDataType[],
  slugRoutingTo: string | null,
  heightFrom: number,
  heightTo: number,
  sortAndFilterConfig: SortAndFilterPropTypes["config"]
): JSX.Element[] {
  // No data, return empty array.
  if (!data) {
    <div></div>;
  }

  data = SortAndFilter({
    data,
    config: sortAndFilterConfig,
  }) as [];
  return (
    data &&
    data.map((post: MdxDataType) => {
      return (
        <Suspense key={post.frontmatter.slug}>
          <Link
            key={post.frontmatter.slug}
            href={`${post.frontmatter.slug}`}
            passHref
            scroll={false}
            legacyBehavior
          >
            {/**
             * Parent Element around each post.
             */}
            <motion.a
              id={post.frontmatter.slug}
              layoutId={`post-card-${post.frontmatter.slug}`}
              className={`relative block h-full -z-0 break-words mx-2 rounded-3xl mb-8 bg-grid min-h-['fit-content'] ${
                post.frontmatter.blend ? ` ${post.frontmatter.blend}` : ""
              }}`}
              // className="relative block mx-2 overflow-hidden rounded-md shadow shadow-slate-900/40"
              initial="hidden"
              animate="showing"
              whileHover={"hover"}
              onClick={() => {
                slugRoutingTo = post.frontmatter.slug;
              }}
              exit={
                post.frontmatter.slug === slugRoutingTo ? "showing" : "hidden"
              }
              variants={{
                hidden: { opacity: 0.7 },
                showing: { opacity: 1 },
                hover: { transform: "translateY(-2px)" },
              }}
              // transition={{ ease: "easeInOut" }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 10,
                mass: 0.5,
                duration: 0.1,
              }}
            >
              {/**
               * Container around image with gradient/blended background.
               */}
              <motion.div
                // layoutId={`image-wrapper-${post.slug}`}
                className={
                  `relative border border-solid border-secondary rounded-3xl shadow shadow-slate-900/40 dark:shadow-slate-500/20 z-10 min-h-fit ` /* space is intentional */ +
                  `${
                    post.frontmatter.blend
                      ? post.frontmatter.blend
                      : "bg-gradient-to-br from-slate-900/100 via-slate-900/90 to-slate-900/100"
                  }`
                  // + `bg-gradient-to-tr from-slate-700/20 to-blue-900/20`
                }
                // className={`relative bg-repeat bg-grid border border-solid border-secondary rounded-xl shadow shadow-slate-900/40 overflow-hidden z-10`}
                // className={`relative bg-gradient-to-tr ${post.blend}`}
                style={{ originX: 0.5 }}
                initial={"initial"}
                animate={"showing"}
                variants={{
                  initial: {
                    height: heightFrom,
                  },
                  showing: {
                    height: heightTo,
                  },
                }}
                transition={{ ease: "easeOut" }}
              >
                {/**
                 * Image of post.
                 */}
                {post.frontmatter.image && (
                  <motion.img
                    // layoutId={`image-${post.slug}`}
                    // layout
                    src={"/assets/images/placeholder.svg"} // TODO: update this so not ahrd-coded
                    // src={post.image}
                    alt={post.frontmatter.title}
                    className="absolute w-full object-cover rounded-md shadow shadow-slate-900/40 bg-grid min-h-[200px]"
                    initial={"initial"}
                    animate={"showing"}
                    whileHover={"hover"}
                    variants={{
                      initial: {
                        height: heightFrom,
                      },
                      showing: {
                        minHeight: heightTo,
                      },
                    }}
                    //-- This is what controls the speed of the image coming back in.
                    transition={{
                      // ease: "easeInOut",
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      mass: 0.5,
                      duration: 0.1,
                    }}
                    style={{
                      originX: 1,
                      objectPosition: "50%, 50%",
                      // objectPosition: post.position,
                    }}
                  />
                )}
              </motion.div>

              {/* Container around Place Name. */}
              <motion.div
                // layoutId={`title-${post.slug}`}
                className="absolute flex flex-col justify-between top-0 py-4 px-4 z-10 w-full h-full rounded-3xl"
                initial="hidden"
                animate="showing"
                variants={{
                  hidden: { opacity: 0.7 },
                  showing: { opacity: 1 },
                }}
                // transition={{
                //   type: "spring",
                //   stiffness: 150,
                //   damping: 10,
                //   mass: 1,
                //   duration: 0.1,
                // }}
              >
                <motion.div
                  // layoutId={`title-${post.slug}`}
                  //TODO: 20231001 #EP || Add better way to handle if overflowing. For now clip keeps it in the parent.
                  className="flex flex-col gap-2 h-full overflow-hidden"
                  animate={"showing"}
                  variants={{
                    hidden: { opacity: 0 },
                    showing: { opacity: 1, color: "var(--text-primary)" },
                  }}
                  // transition={{ ease: "easeOut" }}
                >
                  {/* Title of the post. */}
                  <motion.h3
                    // layout
                    // layoutId={`title-header-${post.slug}`}
                    className="block text-xl md:text-2xl font-medium tracking-tighter"
                    animate="showing"
                    initial={"hidden"}
                    variants={{
                      hidden: { opacity: 0 },
                      showing: { opacity: 1 },
                    }}
                  >
                    {post.frontmatter.title}
                  </motion.h3>

                  {/* Text */}
                  {post.frontmatter.summary && (
                    <motion.p
                      className="line-clamp-2 overflow-ellipsis"
                      // layout
                    >
                      {/* <motion.p className="overflow-wrap truncate ..." layout> */}
                      {post.frontmatter.summary}
                    </motion.p>
                  )}

                  {/* Card footer */}
                  <motion.span
                    className="flex justify-between w-full gap-4 mt-auto opacity-0 tracking-wide"
                    initial={"hidden"}
                    animate={"showing"}
                    variants={{
                      hidden: { opacity: 0 },
                      showing: { opacity: 1 },
                    }}
                    transition={{
                      delay: 0.5,
                    }}
                  >
                    {post.frontmatter.status && (
                      <motion.p
                        // layout
                        className="text-sm flex flex-col flex-wrap"
                      >
                        <span
                          data-role="key"
                          className="text-xs m-auto bold uppercase"
                        >
                          Status:
                        </span>
                        <span data-role="value">{post.frontmatter.status}</span>
                      </motion.p>
                    )}

                    {/* Wrapper around Published and Updated dates to group together in footer. */}
                    {(post.frontmatter?.publishedAt ||
                      post.frontmatter?.updatedAt) && (
                      <motion.span
                        className="flex justify-between gap-4 mt-auto opacity-0"
                        initial={"hidden"}
                        animate={"showing"}
                        variants={{
                          hidden: { opacity: 0 },
                          showing: { opacity: 1 },
                        }}
                        transition={{
                          delay: 0.5,
                        }}
                      >
                        {post.frontmatter.publishedAt && (
                          <motion.p
                            // layout
                            className="text-sm flex flex-col flex-wrap min-w-fit"
                          >
                            <span
                              data-role="key"
                              className="text-xs m-auto bold uppercase"
                            >
                              Published:
                            </span>
                            <span data-role="value">
                              {post.frontmatter.publishedAt}
                            </span>
                          </motion.p>
                        )}
                        {post.frontmatter.updatedAt && (
                          <motion.p
                            // layout
                            className="text-sm flex flex-col flex-wrap"
                          >
                            <span
                              data-role="key"
                              className="text-xs m-auto bold uppercase"
                            >
                              Updated:
                            </span>
                            <span data-role="value">
                              {post.frontmatter.updatedAt}
                            </span>
                          </motion.p>
                        )}
                      </motion.span>
                    )}
                  </motion.span>
                </motion.div>
              </motion.div>
            </motion.a>
          </Link>
        </Suspense>
      );
    })
  );
}
