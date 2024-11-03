"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useEffect, type JSX } from "react";

/**
 * Build a summary card from MDX content.
 */
export default function SummaryCards(
  data: any,
  slugRoutingTo: string | null | undefined,
  basePath: string | null,
  heightFrom: number,
  heightTo: number,
): JSX.Element[] {
  // No data, return empty array.
  if (!data) return [];
  // Else, get the data from the object to prepare to map to card
  const dataForFeed = data.data || data || [];

  const runTest = false;
  if (runTest) {
    // console.log("dataForFeed: ", dataForFeed);
    return dataForFeed.map((item: any, index: number) => {
      return (
        <motion.div
          {...{
            className: "w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4",
          }}
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`${basePath}/${item?.slug}`}>
            <div className="h-full rounded-lg bg-blue-700/20 p-6 shadow-md hover:shadow-lg">
              <h3 className="mb-2 text-lg font-semibold">{item?.title}</h3>
              <p className="text-sm text-gray-100">{item?.summary}</p>
            </div>
          </Link>
        </motion.div>
      );
    });
  }

  return dataForFeed.map((item: any, index: number) => {
    return (
      <Suspense key={item?.slug}>
        <Link
          key={item?.slug}
          href={`${basePath}/${item?.slug}`}
          passHref
          scroll={false}
          legacyBehavior
        >
          {/** * Parent Element around each item?. */}
          <motion.a
            {...{
              id: index + "_" + item?.slug,
              className: `relative -z-0 mx-2 mb-8 block h-full min-h-['fit-content'] break-words rounded-3xl bg-grid ${
                item?.blend ? ` ${item?.blend}` : ""
              }}`,
              onClick: () => {
                slugRoutingTo = item?.slug;
              },
            }}
            // id={item?.slug}
            layoutId={`post-card-${item?.slug}`}
            // className="relative block mx-2 overflow-hidden rounded-md shadow shadow-slate-900/40"
            initial="hidden"
            animate="showing"
            whileHover={"hover"}
            exit={item?.slug === slugRoutingTo ? "showing" : "hidden"}
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
            {/** * Container around image with gradient/blended background. */}
            <motion.div
              // layoutId={`image-wrapper-${item?.slug}`}
              {...{
                className:
                  `relative z-10 min-h-fit rounded-3xl border border-solid border-secondary shadow shadow-slate-900/40 dark:shadow-slate-500/20 ` /* space is intentional */ +
                  `${
                    item?.blend
                      ? item?.blend
                      : "bg-gradient-to-br from-slate-900/100 via-slate-900/90 to-slate-900/100"
                  }`,
                // + `bg-gradient-to-tr from-slate-700/20 to-blue-900/20`
              }}
              // className={`relative bg-repeat bg-grid border border-solid border-secondary rounded-xl shadow shadow-slate-900/40 overflow-hidden z-10`}
              // className={`relative bg-gradient-to-tr ${item?.blend}`}
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
               * Image of item?.
               */}
              {item?.image && (
                <motion.img
                  // layoutId={`image-${item?.slug}`}
                  // layout
                  {...{
                    // src={item?.image}
                    className:
                      "absolute min-h-[200px] w-full rounded-md bg-grid object-cover shadow shadow-slate-900/40",
                    src: "/assets/images/placeholder.svg",
                    alt: item?.title,
                  }}
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
                    // objectPosition: item?.position,
                  }}
                />
              )}
            </motion.div>

            {/* Container around Place Name. */}
            <motion.div
              // layoutId={`title-${item?.slug}`}
              {...{
                className:
                  "absolute top-0 z-10 flex h-full w-full flex-col justify-between rounded-3xl px-4 py-4",
              }}
              initial="hidden"
              animate="showing"
              variants={{
                hidden: { opacity: 0.7 },
                showing: { opacity: 1 },
              }}
            >
              <motion.div
                // layoutId={`title-${item?.slug}`}
                //TODO: 20231001 #EP || Add better way to handle if overflowing. For now clip keeps it in the parent.
                {...{
                  className: "flex h-full flex-col gap-2 overflow-hidden",
                }}
                animate={"showing"}
                variants={{
                  hidden: { opacity: 0 },
                  showing: { opacity: 1, color: "var(--text-primary)" },
                }}
              >
                {/* Title of the item?. */}
                <motion.h3
                  // layout
                  // layoutId={`title-header-${item?.slug}`}
                  {...{
                    className:
                      "block text-xl font-medium tracking-tighter md:text-2xl",
                  }}
                  animate="showing"
                  initial={"hidden"}
                  variants={{
                    hidden: { opacity: 0 },
                    showing: { opacity: 1 },
                  }}
                >
                  {item?.title}
                </motion.h3>

                {/* Text */}
                {item?.summary && (
                  <motion.p
                    {...{
                      className: "line-clamp-2 overflow-ellipsis",
                    }}
                    // layout
                  >
                    {item?.summary}
                  </motion.p>
                )}

                {/* Card footer */}
                <motion.span
                  {...{
                    className:
                      "mt-auto flex w-full justify-between gap-4 tracking-wide opacity-0",
                  }}
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
                  {item?.status && (
                    <motion.p
                      // layout
                      {...{
                        className: "flex flex-col flex-wrap text-sm",
                      }}
                    >
                      <span
                        data-role="key"
                        className="bold m-auto text-xs uppercase"
                      >
                        Status:
                      </span>
                      <span data-role="value">{item?.status}</span>
                    </motion.p>
                  )}

                  {/* Wrapper around Published and Updated dates to group together in footer. */}
                  {(item?.publishedAt || item?.updatedAt) && (
                    <motion.span
                      {...{
                        className:
                          "mt-auto flex justify-between gap-4 opacity-0",
                      }}
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
                      {item?.publishedAt && (
                        <motion.p
                          // layout
                          {...{
                            className:
                              "flex min-w-fit flex-col flex-wrap text-sm",
                          }}
                        >
                          <span
                            data-role="key"
                            className="bold m-auto text-xs uppercase"
                          >
                            Published:
                          </span>
                          <span data-role="value">{item?.publishedAt}</span>
                        </motion.p>
                      )}
                      {item?.updatedAt && (
                        <motion.p
                          // layout
                          {...{
                            className: "flex flex-col flex-wrap text-sm",
                          }}
                        >
                          <span
                            data-role="key"
                            className="bold m-auto text-xs uppercase"
                          >
                            Updated:
                          </span>
                          <span data-role="value">{item?.updatedAt}</span>
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
  });
}
