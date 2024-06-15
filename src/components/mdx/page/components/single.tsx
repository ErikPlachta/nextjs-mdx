"use client";

// TODO: Verify these should import here. (I think so if I want to be able to embed into MDX and use [slug] to render dynamically.)
// import Callout from "@/components/Callout";
// import Code from "@/components/Code";
// import ConsCard from "@/components/Card/ConsCard";
// import ProsCard from "@/components/Card/ProsCard";
// import RoundedImage from "@/components/image/RoundedImage";

import React, { useEffect, useState, useRef } from "react";
import { motion, animate, useAnimation } from "framer-motion";
import Link from "next/link";
import {
  // ArrowDownIcon,
  // ArrowRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
// import { Projects, Notes } from "contentlayer/generated";
const Notes: any = [];
const Projects: any = [];
import { usePathname } from "next/navigation";
import useClientMetrics, { ElementToMonitor } from "@/hooks/useClientMetrics";
// import { getMdxContent } from "@/components/mdx/utils";
// import { MDXRemote } from "next-mdx-remote";

export interface SingleProps {
  data: undefined | typeof Notes | typeof Projects;
  path: string | "notes" | "projects";
  slug: string;
  heightFrom: number;
  heightTo: number;
  hasSearch?: boolean;
}

const SingleDefaults: SingleProps = {
  data: undefined,
  path: "/",
  slug: "",
  heightFrom: 200,
  heightTo: 400,
  hasSearch: false,
};

export default function Single(params: SingleProps) {
  // console.log("params - single:", params);
  let slug = params.slug;
  let pathname = usePathname();
  let path = params.path;
  // let post = params.data;
  let post = params.data;

  const [pageHeaderFontSize, setPageHeaderFontSize] = useState("2.75rem");

  const targetRefWrapper = useRef(null);
  const targetRefPageTitle = useRef(null);

  // TODO: 20231001 #EP || Update to allow Page Title to be sticky and sit below header when scrolling down.
  const elementsToMonitorRef = useRef<ElementToMonitor[]>([
    // {
    //   role: "header-wrapper",
    //   orderId: 1,
    // },
    // {
    //   role: "header-branding-wrapper",
    //   orderId: 2,
    // },
    // // {
    // //   role: "page-title-wrapper",
    // //   ref: targetRefWrapper,
    // //   orderId: 3,
    // // },
    // {
    //   role: "page-header",
    //   ref: targetRefWrapper,
    //   orderId: 3,
    // },
    // {
    //   role: "page-title",
    //   ref: targetRefPageTitle,
    //   orderId: 4,
    // },
  ]);

  const { elements, isClient } = useClientMetrics(elementsToMonitorRef.current);

  // Utility to get the bottom pixel of the post header.
  // TODO: Remove once verified not needed.
  let pageHeaderBottomPixel: String =
    elements?.["page-title"]?.height &&
    elements?.["header-wrapper"]?.height &&
    elements?.["header-branding-wrapper"]?.height
      ? isClient && window.innerWidth >= 768
        ? `${
            // elements?.["header-wrapper"].height + elements?.["page-title"].height
            0
          }px`
        : `${
            // elements["page-title"].height  + elements["header-branding-wrapper"].height
            0
          }px`
      : `0px`;

  let animationDelay = 0.4;
  let handleAnimate = useAnimation();
  let imageGrowFinished = useRef(false);
  let heightFrom: number = params.heightFrom || SingleDefaults.heightFrom;
  let heightTo: number = params.heightTo || SingleDefaults.heightTo;
  // Utility to identify the height of the header so content is below it.
  let headerHeight: number = elements?.["header-branding-wrapper"]?.height || 0;

  // useEffect
  useEffect(() => {
    let id = setTimeout(async () => {
      if (!imageGrowFinished.current) {
        if (pathname && slug) {
          // Add null check for pathname and slug
          await startResizeImage(pathname, slug, imageGrowFinished).then(
            async () => {
              await handleAnimate.start("showing");
            }
          );
        }
      }
    }, animationDelay);

    // Handling scroll events to change the header font size. This works interactively with  elements to monitor, above.
    const isEnabled = false; // TODO: Remove this and update to work with new header.
    const handleScroll = () => {
      if (
        isEnabled &&
        elements &&
        elements["page-title"]?.height != null &&
        window.scrollY >= elements["page-title"]?.height
      ) {
        // TODO: Update so changes once verified sticky part of this too.
        setPageHeaderFontSize("2.75rem");
      } else {
        // TODO: Update so changes once verified sticky part of this too.
        setPageHeaderFontSize("2.75rem");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(id);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    animationDelay,
    handleAnimate,
    pathname,
    imageGrowFinished,
    slug,
    params,
    pageHeaderBottomPixel,
    headerHeight,
    elements,
    isClient,
    elementsToMonitorRef,
    heightFrom,
    heightTo,
  ]);

  // console.log("post: ", post);
  // console.log("params", params);

  // useEffect(() => {

  // }, [elements, headerHeight]);

  // If no post is found, return an error message.
  if (!post) {
    return (
      <div
        className={`flex flex-col py-0 px-0 mx-auto gap-4 rounded-lg max-w-4xl`}
      >
        <div className="relative px-6">ERROR: id not found: `{slug}`</div>
      </div>
    );
  }

  // console.log("params:", params);
  // return <div>{post}</div>;
  // return <>{post}</>;

  // Otherwise returns the single post.
  return (
    <article
      // ref={targetRefWrapper}
      data-role="content-wrapper"
      className={`z-0 flex flex-col gap-4 overflow-hidden rounded-lg max-w-4xl w-100 m-auto relative break-words bg-slate-100 dark:bg-slate-800/30 shadow-sm shadow-slate-500 rounded-tl-lg rounded-tr-lg`}
    >
      <Link href={`/${path}`} passHref scroll={false} legacyBehavior>
        <motion.a
          data-role="button-back"
          className={`absolute flex items-center top-2 left-2 z-0 gap-1 rounded-md px-2 py-2 bg-slate-600 bg-opacity-10 hover:bg-opacity-70 ease-in-out duration-100 text-gray-50 text-md font-medium`}
          initial="hidden"
          animate={handleAnimate}
          exit="exiting"
          variants={{
            hidden: { opacity: 0.7 },
            showing: { opacity: 1 },
            exiting: { opacity: 0 },
          }}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back
        </motion.a>
      </Link>
      {post && (
        <>
          <motion.div
            layoutId={`post-card-${post.slug}`}
            className="flex flex-col h-full w-full"
            data-role="page-header"
            ref={targetRefWrapper}
          >
            {/* Image and Background at top of post */}
            <motion.div
              className={`pt-20 -z-10 pointer-events-none mx-0 rounded-tl-lg h-[100%] rounded-tr-lg bg-repeat bg-grid`}
              layoutId={`image-wrapper-${post.slug}`}
              animate={handleAnimate}
              initial="hidden"
              exit="exiting"
              variants={{
                hidden: { opacity: 1 },
                showing: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  // minHeight: heightTo, // TODO: 20231001 #EP || Verify not needed in a different way. Removed because causing Auto to 200px error.
                },
                exiting: { opacity: 0 },
              }}
            >
              {/* The Background container image */}
              <motion.div
                className={`absolute top-0 z-0 h-[100%] w-[100%] pointer-events-none ${
                  post.blend
                    ? post.blend
                    : "bg-gradient-to-br from-slate-800/80 to-slate-900/80"
                }`}
                onLayoutAnimationStart={() =>
                  startResizeImage(pathname || "", slug, imageGrowFinished)
                }
                initial={"initial"}
                animate={"animated"}
                variants={{
                  initial: {
                    height: heightFrom,
                  },
                  animated: {
                    minHeight: heightTo,
                    height: "100%",
                    // maxHeight: heightTo + 40,
                  },
                }}
                // transition={{ ease: "easeOut" }}
              >
                {post.image && (
                  <motion.img
                    layoutId={`image-${post.slug}`}
                    className={` pointer-events-none w-full object-cover rounded-tl-lg rounded-tr-lg shadow-md bg-gradient-to-tr bg-repeat`}
                    src={post.image}
                    alt={`Cover photo for ${post.title}.`}
                    initial={"initial"}
                    animate={"animated"}
                    variants={{
                      initial: {
                        height: heightFrom,
                      },
                      animated: {
                        height: heightTo,
                      },
                    }}
                    style={{
                      originX: 0.5,
                      objectPosition: 0,
                    }}
                    transition={{ ease: "easeOut" }}
                  />
                )}
              </motion.div>

              <motion.h1
                ref={targetRefPageTitle}
                data-role={`page-title`}
                // id="page-title"
                // layoutId={`title-header-${post.slug}`}
                className={`relative px-4 w-full [text-shadow:_0_2px_1px_rgb(0_0_0_/_70%)] md:text-5xl font-semibold tracking-tighter`}
                initial={"hidden"}
                animate={handleAnimate}
                style={{
                  fontSize: pageHeaderFontSize,
                }}
                variants={{
                  hidden: {
                    opacity: 0.9,
                  },
                  showing: { opacity: 1, color: "var(--info)" },
                  exiting: { opacity: 0, color: "var(--text-primary)" },
                }}
              >
                {post.frontmatter.title}
              </motion.h1>

              {post.frontmatter.summary && (
                <p className="relative px-4 py-4">{post.frontmatter.summary}</p>
              )}

              {/* Spacer at bottom of the image with grid and blur. */}
              <div
                className={`mt-2 relative bg-grid blur-sm h-[7px] w-full`}
              ></div>
            </motion.div>
          </motion.div>

          {/* Body / Built from MDX Data */}

          {post?.content && (
            <motion.div
              initial="hidden"
              animate={handleAnimate}
              data-role="page-body"
              exit="exiting"
              className="py-4 px-6 text-base text-gray-700 dark:text-gray-100"
              transition={{ ease: "easeOut" }}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 100 },
                showing: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                },
                exiting: { opacity: 0 },
              }}
            >
              {post.content}
            </motion.div>
          )}

          {/*  TECHNOLOGIES */}
          {post.technologies && (
            <motion.div
              initial="hidden"
              animate={handleAnimate}
              data-role="page-changelog"
              exit="exiting"
              className="py-4 px-6 text-base text-gray-700 dark:text-gray-100"
              transition={{ ease: "easeOut" }}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 100 },
                showing: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                },
                exiting: { opacity: 0 },
              }}
            >
              <h2 className="text-4xl my-4">Technologies</h2>
              {post.technologies.map(
                (
                  tech: {
                    title:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    description:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    purpose:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    icon:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    link:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  },
                  index: React.Key | null | undefined
                ) => {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <details open>
                        <summary className="flex w-full flex-row gap-2 text-center my-auto items-center">
                          {/* <ArrowRightIcon className="h-4 w-4 mt-auto" /> */}
                          {/* <ArrowDownIcon className="h-4 w-4 mt-auto " /> */}
                          <h3 className="cursor-pointer text-xl bold pt-4">
                            {tech.title}
                          </h3>
                        </summary>
                        <ul>
                          <li className="ml-8 pl-2 list-disc">
                            {tech.description}
                          </li>
                          <li className="ml-8 pl-2 list-disc">
                            {tech.purpose}
                          </li>
                          <li className="ml-8 pl-2 list-disc">{tech.icon}</li>
                          <li className="ml-8 pl-2 list-disc">{tech.link}</li>
                        </ul>
                      </details>
                    </div>
                  );
                }
              )}
            </motion.div>
          )}

          {/*  CHANGE LOG */}
          {/* {console.log(post, post?.changeLog)} */}
          {post.changeLog && (
            <motion.div
              initial="hidden"
              animate={handleAnimate}
              data-role="page-changelog"
              exit="exiting"
              className="py-4 px-6 text-base text-gray-700 dark:text-gray-100"
              transition={{ ease: "easeOut" }}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 100 },
                showing: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                },
                exiting: { opacity: 0 },
              }}
            >
              <h2 className="text-4xl pt-4">Change Log</h2>
              {post.changeLog.map(
                (
                  entry: {
                    title:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    date:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    description:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                    log: any[];
                  },
                  index: React.Key | null | undefined
                ) => {
                  return (
                    <div key={index} className="flex flex-col gap-2">
                      <h3 className="text-xl bold pt-8">{entry.title}</h3>
                      <ul className="pl-4">
                        <li className="flex w-full">
                          <span>{entry.date}</span>
                          <span>{entry.description}</span>
                        </li>

                        <li>
                          {entry.log && (
                            <ul>
                              <h4 className="text-lg pt-2">Changes</h4>
                              {entry.log.map((log, index) => {
                                return (
                                  <li
                                    key={index}
                                    className="ml-8 pl-2 list-disc"
                                  >
                                    {log}
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </li>
                      </ul>
                    </div>
                  );
                }
              )}
            </motion.div>
          )}
        </>
      )}
    </article>
  );
}

async function startResizeImage(
  pathname: string,
  slug: string,
  imageGrowFinished: any
): Promise<boolean> {
  let current = document.documentElement.scrollTop;
  let scrollToPixelFromTop = 0;
  return animate(current, scrollToPixelFromTop, {
    ease: "easeInOut",
    duration: 0.35,
    onUpdate(latest) {
      requestAnimationFrame(() => {
        window.scrollTo(scrollToPixelFromTop, latest);
      });
    },
    onComplete() {
      imageGrowFinished.current = true;
      return true;
    },
  });
}
