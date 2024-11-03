"use client";
import React, { useEffect, type JSX } from "react";
import { motion, useAnimationControls, Variants } from "framer-motion";

/**
 * Callout Card component with modular and dynamic design.
 *
 * @param {string} props.emoji - Emoji to display in the callout card
 * @param {string} props.children - Children to display in the callout card
 * @returns {JSX.Element} - Callout card component
 */
export default function Callout({
  emoji,
  title,
  children,
  styles,
  minStyle,
  noStyle,
  headingLevel = 3, //-- defaulted to 3
  framer = {
    variants: {
      initial: {
        // y: ['-10%', '0%'],
        transition: {
          delay: 1.5,
          repeat: 1,
          duration: 0.5,
        },
      },
    },
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 1,
      duration: 0.3,
      delay: 0.2,
    },
  },
  controlButton,
}: {
  emoji?: string | "👋" | "🫠" | "📣" | "❗️" | "🔐";
  title?: string;
  children?: any;
  styles?: {
    wrapper?: string;
    children?: string;
    header?: string;
    emoji?: string;
    title?: string;
  };
  minStyle?: boolean;
  noStyle?: boolean;
  headingLevel?: number | 1 | 2 | 3 | 4 | 5 | 6;
  framer?: {
    animate?: string;
    handleAnimation?: (animation: string | undefined) => void;
    variants?: Variants;
    initial?: Variants | string;
    transition?: any;
    controls?: any;
  };
  controlButton?: any;
}): JSX.Element {
  /***
   * @param animation
   * @returns
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleAnimation(animate: string) {
    if (framer?.variants) {
      Object.entries(framer?.variants).forEach((variant) => {
        if (variant[0] === animate) {
          // console.log('running variant[0]: ', variant[0]);
          if (variant !== undefined && framer?.variants?.[variant[0]]) {
            // console.log(
            //   'running framer.variants[variant[0]]: ',
            //   framer.variants[variant[0]]
            // );
            controls.start(framer.variants[variant[0]]);
          }
        }
      });
    }
    //-- Otherwise default animations
    else {
      switch (animate) {
        case "initial":
          return controls.start("initial");
        case "animate":
          return controls.start("animate");
        case "exit":
          return controls.start("exit");
        default:
          return controls.start("initial");
      }
    }
  }

  let initial = framer?.initial || "initial";

  let variants = framer?.variants || {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 100,
    },
  };

  //-- setting controls here so it can be used.
  let controls = useAnimationControls();
  if (framer?.controls) {
    controls = framer.controls;
  }

  //-- HEADER MANAGEMENT
  /** Generate header for callout based on headerLevel. `H3` by default. */
  const generateHeader = (): any => {
    let defaultHeaderStyle =
      "block text-2xl m-auto md:m-0 md:pl-[1rem] md:mr-auto text-center tracking-wide text-slate-100 text-primary dark:text-blue-500 drop-shadow-lg shadow-black dark:shadow-white"; // 20230405 #EP || Removed overflow-y-auto ,
    // console.log(headingLevel)
    switch (Number(headingLevel)) {
      case 1:
        return (
          <h1 className={`${styles?.header || defaultHeaderStyle}`}>{title}</h1>
        );
      case 2:
        return (
          <h2 className={`${styles?.header || defaultHeaderStyle}`}>{title}</h2>
        );
      case 3:
        return (
          <h3 className={`${styles?.header || defaultHeaderStyle}`}>{title}</h3>
        );
      case 4:
        return (
          <h4 className={`${styles?.header || defaultHeaderStyle}`}>{title}</h4>
        );
      case 5:
        return (
          <h5 className={`${styles?.header || defaultHeaderStyle}`}>{title}</h5>
        );
      case 6:
        return (
          <h6 className={`${styles?.header || defaultHeaderStyle}`}>{title}</h6>
        );
      default:
        return (
          <h3 className={`${styles?.header || defaultHeaderStyle}`}>{title}</h3>
        );
    }
  };

  useEffect(() => {
    if (!framer?.animate) {
      handleAnimation("initial");
    }
  }, [framer.animate, handleAnimation]);

  // if(typeof window !== 'undefined') {
  //--------------------------------------------------------------------------
  //-- PRIMARY RETURN
  return (
    <motion.section
      {...{
        className:
          `c_callout ${styles?.wrapper ? `${styles?.wrapper} ` : ``}` +
          `${
            !minStyle && !noStyle
              ? "border-b-1 border-l-1 border-r-1 border-t-1 my-8 flex break-before-auto flex-wrap gap-4 rounded border border-solid border-neutral-200/70 bg-white/70 p-6 dark:border-neutral-800 dark:bg-neutral-900"
              : ""
          }` +
          `${
            minStyle && !noStyle
              ? "flex break-before-auto flex-wrap overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-800 dark:bg-neutral-900"
              : ""
          }`,
      }}
      animate={controls}
      // initial='initial'
      // initial={
      //   typeof window !== 'undefined' && window.innerWidth < 768
      //   ? 'initial'
      //   : undefined
      // }
      variants={{ ...variants }}
      transition={framer?.transition || { duration: 0.5 }}
    >
      {controlButton && (
        <span onClick={() => handleAnimation(framer?.animate || "animate")}>
          {controlButton}
        </span>
      )}
      <div
        className={`${styles?.header ? `${styles.header} ` : "m-auto flex w-full flex-row gap-6 text-center text-2xl tracking-wide text-primary text-slate-100 shadow-black drop-shadow-lg md:m-0 md:mr-auto md:pl-[1rem] dark:text-blue-500 dark:shadow-white"}`}
      >
        {emoji && (
          <span
            className={
              `${styles?.emoji ? `${styles?.emoji} ` : ``}` +
              `${!noStyle ? "mr-4 flex w-4 items-center" : ""}`
            }
          >
            {emoji}
          </span>
        )}

        {title && generateHeader()}
      </div>
      <div
        className={
          `${styles?.children ? `${styles?.children} ` : ``}` +
          `${!noStyle ? "callout w-full" : ""}`
        }
      >
        {children}
      </div>
    </motion.section>
  );
  // }
}
