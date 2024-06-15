"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Suspense, useEffect } from "react";

/**
 * Build a summary card from MDX content.
 */
export default function SummaryCards(
  data: any,
  slugRoutingTo: string | null,
  basePath: string | null,
  heightFrom: number,
  heightTo: number
): JSX.Element[] {
  // No data, return empty array.
  if (!data) return [];
  // Else, get the data from the object to prepare to map to card
  const dataForFeed = data.data || data || [];

  const runTest = false;
  if (runTest) {
    console.log("dataForFeed: ", dataForFeed);
    return dataForFeed.map((item: any, index: number) => {
      return (
        <motion.div
          key={index}
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`${basePath}/${item?.slug}`}>
            <div className="h-full p-6 rounded-lg shadow-md hover:shadow-lg bg-blue-700/20">
              <h3 className="text-lg font-semibold mb-2">{item?.title}</h3>
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
            id={index + "_" + item?.slug}
            // id={item?.slug}
            layoutId={`post-card-${item?.slug}`}
            className={`relative block h-full -z-0 break-words mx-2 rounded-3xl mb-8 bg-grid min-h-['fit-content'] ${
              item?.blend ? ` ${item?.blend}` : ""
            }}`}
            // className="relative block mx-2 overflow-hidden rounded-md shadow shadow-slate-900/40"
            initial="hidden"
            animate="showing"
            whileHover={"hover"}
            onClick={() => {
              slugRoutingTo = item?.slug;
            }}
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
              className={
                `relative border border-solid border-secondary rounded-3xl shadow shadow-slate-900/40 dark:shadow-slate-500/20 z-10 min-h-fit ` /* space is intentional */ +
                `${
                  item?.blend
                    ? item?.blend
                    : "bg-gradient-to-br from-slate-900/100 via-slate-900/90 to-slate-900/100"
                }`
                // + `bg-gradient-to-tr from-slate-700/20 to-blue-900/20`
              }
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
                  src={"/assets/images/placeholder.svg"}
                  // src={item?.image}
                  alt={item?.title}
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
                    // objectPosition: item?.position,
                  }}
                />
              )}
            </motion.div>

            {/* Container around Place Name. */}
            <motion.div
              // layoutId={`title-${item?.slug}`}
              className="absolute flex flex-col justify-between top-0 py-4 px-4 z-10 w-full h-full rounded-3xl"
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
                className="flex flex-col gap-2 h-full overflow-hidden"
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
                  className="block text-xl md:text-2xl font-medium tracking-tighter"
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
                    className="line-clamp-2 overflow-ellipsis"
                    // layout
                  >
                    {item?.summary}
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
                  {item?.status && (
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
                      <span data-role="value">{item?.status}</span>
                    </motion.p>
                  )}

                  {/* Wrapper around Published and Updated dates to group together in footer. */}
                  {(item?.publishedAt || item?.updatedAt) && (
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
                      {item?.publishedAt && (
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
                          <span data-role="value">{item?.publishedAt}</span>
                        </motion.p>
                      )}
                      {item?.updatedAt && (
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
