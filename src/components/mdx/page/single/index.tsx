"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, animate, useAnimation } from "framer-motion";
import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { usePathname } from "next/navigation";
import useClientMetrics, { ElementToMonitor } from "@/hooks/useClientMetrics";

export interface SingleProps {
  data: undefined | any; // TODO: Update types to be more specific.
  path: string;
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

// Type definition for a single technology entry
export type Technology = {
  title: string | undefined | null;
  description: string | undefined;
  purpose: string | undefined;
  icon: string | undefined;
  link: string | undefined;
};

// Type definition for a single change log entry
export type ChangeLogEntry = {
  title: string | undefined;
  date: string | undefined;
  description: string | undefined;
  log: string[] | undefined;
};

/**
 * MDX File Content rendered into a single page.
 */
export default function MdxPage(params: SingleProps) {
  // console.log("params - single:", params);
  let slug = params.slug;
  let pathname = usePathname();
  let path = params.path;
  // let post = params.data;
  let post = params.data;

  const [pageHeaderFontSize, setPageHeaderFontSize] = useState("2.75rem");

  const targetRefWrapper = useRef(null);
  const targetRefPageTitle = useRef(null);

  /**
   * Elements to monitor by element Role definitions.
   */
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

  let animationDelay = 0.4;
  let handleAnimate = useAnimation();
  let variants = {
    h1: {
      hidden: { opacity: 0.9 },
      showing: { opacity: 1, color: "var(--info)" },
      exiting: { opacity: 0, color: "var(--text-primary)" },
    },
    contentPrimary: {
      hidden: { opacity: 0, scale: 0.95, y: 100 },
      showing: { opacity: 1, scale: 1, y: 0 },
      exiting: { opacity: 0 },
    },
  };

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
            },
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
    headerHeight,
    elements,
    isClient,
    elementsToMonitorRef,
    heightFrom,
    heightTo,
  ]);

  // If no post is found, return an error message.
  if (!post) {
    return (
      <div
        className={`mx-auto flex max-w-4xl flex-col gap-4 rounded-lg px-0 py-0`}
      >
        <h3 className="relative px-6">ERROR: id not found: `{slug}`</h3>
        <span>
          <Link href={`/${path}`} passHref scroll={false} legacyBehavior>
            <a className="text-md flex items-center gap-1 bg-slate-600 bg-opacity-10 px-4 py-2 font-medium text-gray-50 duration-100 ease-in-out hover:bg-opacity-70">
              <ChevronLeftIcon className="h-4 w-4" />
              Back
            </a>
          </Link>
        </span>
      </div>
    );
  }

  // Render MDX Content as a page.
  return (
    <article
      // ref={targetRefWrapper}
      data-role="content-wrapper"
      className={`w-100 relative z-0 m-auto mt-[2rem] flex max-w-4xl flex-col gap-4 overflow-hidden break-words rounded-lg rounded-tl-lg rounded-tr-lg bg-slate-100 shadow-sm shadow-slate-500 md:mt-[4rem] dark:bg-slate-800/30`}
    >
      <Link href={`/${path}`} passHref scroll={false} legacyBehavior>
        <motion.a
          data-role="button-back"
          className={`text-md absolute left-2 top-2 z-0 flex items-center gap-1 rounded-md bg-slate-600 bg-opacity-10 px-2 py-2 font-medium text-gray-50 duration-100 ease-in-out hover:bg-opacity-70`}
          initial="hidden"
          animate={handleAnimate}
          exit="exiting"
          variants={variants.contentPrimary}
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Back
        </motion.a>
      </Link>
      {post && (
        <>
          <motion.div
            layoutId={`post-card-${post.slug}`}
            className="flex h-full w-full flex-col"
            data-role="page-header"
            ref={targetRefWrapper}
          >
            {/* Image and Background at top of post */}
            <motion.div
              className={`pointer-events-none -z-10 mx-0 h-[100%] rounded-tl-lg rounded-tr-lg bg-grid bg-repeat pt-20`}
              layoutId={`image-wrapper-${post.slug}`}
              animate={handleAnimate}
              initial="hidden"
              exit="exiting"
              variants={variants.contentPrimary}
            >
              {/* The Background container image */}
              <motion.div
                className={`pointer-events-none absolute top-0 z-0 h-[100%] w-[100%] ${
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
                  initial: { height: heightFrom },
                  animated: {
                    minHeight: heightTo,
                    height: "100%",
                    // maxHeight: heightTo + 40,
                  },
                }}
              >
                {post.image && (
                  <motion.img
                    layoutId={`image-${post.slug}`}
                    className={`pointer-events-none w-full rounded-tl-lg rounded-tr-lg bg-gradient-to-tr bg-repeat object-cover shadow-md`}
                    src={post.image}
                    alt={`Cover photo for ${post.title}.`}
                    initial={"initial"}
                    animate={"animated"}
                    variants={{
                      initial: { height: heightFrom },
                      animated: { height: heightTo },
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
                className={`relative w-full px-4 font-semibold tracking-tighter [text-shadow:_0_2px_1px_rgb(0_0_0_/_70%)] md:text-5xl`}
                initial={"hidden"}
                animate={handleAnimate}
                style={{
                  fontSize: pageHeaderFontSize,
                }}
                variants={variants.h1}
              >
                {post.frontmatter.title}
              </motion.h1>

              {post.frontmatter.summary && (
                <p className="relative px-4 py-4">{post.frontmatter.summary}</p>
              )}

              {/* Spacer at bottom of the image with grid and blur. */}
              <div
                className={`relative mt-2 h-[7px] w-full bg-grid blur-sm`}
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
              className="px-6 py-4 text-base text-gray-700 dark:text-gray-100"
              transition={{ ease: "easeOut" }}
              variants={variants.contentPrimary}
            >
              {post.content}
            </motion.div>
          )}

          {post.technologies && (
            <motion.div
              initial="hidden"
              animate={handleAnimate}
              data-role="page-changelog"
              exit="exiting"
              className="px-6 py-4 text-base text-gray-700 dark:text-gray-100"
              transition={{ ease: "easeOut" }}
              variants={variants.contentPrimary}
            >
              <h2 className="my-4 text-4xl">Technologies</h2>
              {post.technologies.map((tech: Technology, index: React.Key) => (
                <div key={index} className="flex flex-col gap-2">
                  <details open>
                    <summary className="my-auto flex w-full flex-row items-center gap-2 text-center">
                      <h3 className="bold cursor-pointer pt-4 text-xl">
                        {tech.title}
                      </h3>
                    </summary>
                    <ul>
                      <li className="ml-8 list-disc pl-2">
                        {tech.description}
                      </li>
                      <li className="ml-8 list-disc pl-2">{tech.purpose}</li>
                      <li className="ml-8 list-disc pl-2">{tech.icon}</li>
                      <li className="ml-8 list-disc pl-2">{tech.link}</li>
                    </ul>
                  </details>
                </div>
              ))}
            </motion.div>
          )}

          {post.changeLog && (
            <motion.div
              initial="hidden"
              animate={handleAnimate}
              data-role="page-changelog"
              exit="exiting"
              className="px-6 py-4 text-base text-gray-700 dark:text-gray-100"
              transition={{ ease: "easeOut" }}
              variants={variants.contentPrimary}
            >
              <h2 className="pt-4 text-4xl">Change Log</h2>
              {post.changeLog.map((entry: ChangeLogEntry, index: React.Key) => (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="bold pt-8 text-xl">{entry.title}</h3>
                  <ul className="pl-4">
                    <li className="flex w-full">
                      <span>{entry.date}</span>
                      <span>{entry.description}</span>
                    </li>
                    {entry.log && (
                      <ul>
                        <h4 className="pt-2 text-lg">Changes</h4>
                        {entry.log.map((log, index) => (
                          <li key={index} className="ml-8 list-disc pl-2">
                            {log}
                          </li>
                        ))}
                      </ul>
                    )}
                  </ul>
                </div>
              ))}
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
  imageGrowFinished: any,
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
