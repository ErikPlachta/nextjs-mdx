"use client"; // Required because of the use of useRef and useEffect + working within DOM.

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useAnimationControls } from "framer-motion";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

// Custom Content
import useDebounce from "@/hooks/useDebounce";
import { IndexedObjectType, pick } from "@/libs/ObjectUtils";
import {
  SearchComponentDefaultsTypes,
  SearchComponentPropsTypes,
} from "./types";

//--------------------------------------------------------------------------------
// TYPES

export const search_Defaults: SearchComponentDefaultsTypes = {
  data: [],
  dataKeys: [],
  placeholder: "Search...",
  searchWhenTyping: false,
  autoFocus: true,
  styles: {
    // Wrapper around the search element.
    wrapper:
      "relative h-full w-full bg-transparent border-none focus:outline-none text-default placeholder-default",
    // The container holding the input and buttons
    container:
      "relative rounded-md w-full h-fit-content flex" +
      " border-solid border-2 border-secondary hover:border-secondary focus-within:border-secondary" +
      " bg-transparent" +
      " hover:shadow-within-md focus-within:shadow-within-md" +
      " rounded-r-xl" +
      " transition-all duration-300",

    // Input within Search container
    input:
      "w-full h-full p-2 border-none outline-none text-ellipsis " +
      " bg-secondary cursor-pointer " +
      " transition-all duration-300",

    // Button within Search container
    buttonSearch_wrapper:
      "flex text-center m-0 bg-blue-700 min-w-[35px] w-[35px] rounded-l-xl " +
      // TODO: Resolve  hover blue when onboarding styles to framer.
      " enabled:hover:blue-800 disabled:opacity-50 " +
      " transition-all duration-300",
    buttonSearch:
      " m-auto w-[35px] h-[35px] p-[8px] disabled:opacity-50 " +
      " transition-all duration-300",
    buttonClear_wrapper:
      "flex text-center m-0 min-w-[35px] w-[35px] rounded-r-xl" +
      " bg-red-700 hover:bg-red-800 " +
      " transition-all duration-300 ",
    buttonClear: "m-auto w-[35px] p-[8px] bg-transparent text-white ",
    // Results container to pick from when searching
    results:
      // TODO: update this
      "absolute flex flex-col z-50 min-h-[fit-content] max-h-[300px] overflow-scroll w-[100%] mt-[.25rem] " +
      " transition-all duration-300 " +
      " border-solid border-2 border-secondary bg-tertiary rounded-md shadow-md",
    result:
      "z-50 hover:bg-accent hover:cursor-pointer px-2 py-4 " +
      " border-solid border-2 border-secondary border-t-0 border-l-0 border-r-0",
  },
};

//--------------------------------------------------------------------------------
// CLASS COMPONENT

/**
 * Custom search component to search through data and display results.
 *
 * @param {SearchComponentPropsType} props - The props for the search component.
 * @returns
 */
export default function Search(props: SearchComponentPropsTypes) {
  const [isMounted, setIsMounted] = useState(false);

  // Destructure the props and set defaults
  const {
    data,
    dataKeys,
    placeholder,
    searchWhenTyping,
    autoFocus,
    styles,
  }: SearchComponentDefaultsTypes = {
    ...search_Defaults,
    ...props,
  };

  // Explicitly define the type for filteredData state
  const [filteredData, setFilteredData] = useState<IndexedObjectType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  // TODO: Onboard debounce or remove from here.
  //const [searchDebounceTimeoutId, setSearchDebounceTimeoutId] = useState<  number | null>(null);
  const controls = useAnimationControls();

  /**
   * Take value from input and search within dataset.
   *
   * @param {string} value - The value to search for within the dataset.
   * @returns
   */
  function handleSearch(value: string): void {
    // ---------------------------------
    // 1. Validation
    if (!value) {
      setFilteredData([]); // Remove filter if input cleared
      return;
    }
    if (!data) {
      throw new Error("[Components/Search] No data defined for search!");
    }
    if (!dataKeys || dataKeys.length === 0) {
      throw new Error("[Components/Search] No dataKeys defined for search");
    }
    // ---------------------------------
    // 2. Execute the search

    try {
      // 2.a Attempt search
      const filterValues = pick(data, dataKeys, value);
      setFilteredData(filterValues); // Set the filter based on input
    } catch (err) {
      // 2.b Handle error
      throw new Error(`[Components/Search] Unable to handleSearch: ${err}`);
    }
  }

  // -----------------------------------
  // Debounce the handleSearch function
  const debouncedHandleSearch = useDebounce(handleSearch, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Execute search if searchWhenTyping is true
    if (searchWhenTyping) {
      debouncedHandleSearch(value);
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      debouncedHandleSearch(searchTerm);
    }
  };

  /**
   * On-Click event for Search Button and Clear Button.
   *
   * @param ref
   * @param searchTerm
   */
  function handleOnClick(ref: any, searchTerm: string): void {
    if (searchTerm.length === 0) {
      ref.current.focus();
    } else {
      debouncedHandleSearch(searchTerm);
    }
  }

  /**
   * Clearing out search params because navigating away from the search results.
   **/
  function handleResultClick(slug: string): void {
    setSearchTerm("");
    setFilteredData([]);
  }

  /**
   * Start Framer Motion animations of the search input based on category.
   */
  function handleAnimation(type: string): void {
    controls.start(type === "focus" ? "isActive" : "isInactive");
  }

  //--------------------------------------------------------------------------------
  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [dataKeys, data, isMounted]);

  if (!isMounted) return null;

  //--------------------------------------------------------------------------------
  return (
    <div className={styles.wrapper} id="search-wrapper">
      <motion.div
        className={styles.container}
        id="search-container"
        animate={controls}
        initial={"isInactive"}
        onTap={() => handleAnimation("focus")}
        //TODO: Add FramerMotion animations
      >
        <motion.span
          id="button-search-wrapper"
          className={styles.buttonSearch_wrapper}
        >
          <motion.button
            className={styles.buttonSearch}
            id="button-search"
            disabled={searchTerm.length === 0}
            onClick={() => handleOnClick(searchInputRef.current, searchTerm)}
            //TODO: Add FramerMotion animations
          >
            <MagnifyingGlassIcon />
          </motion.button>
        </motion.span>

        <motion.input
          ref={searchInputRef}
          className={styles.input}
          disabled={data.length === 0 || dataKeys.length === 0 ? true : false}
          type="text"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => handleAnimation("focus")}
          onBlur={() => handleAnimation("blur")}
          variants={{
            isInactive: {
              backgroundColor: "var(--color-secondary)",
            },
            isActive: {
              backgroundColor: "var(--color-tertiary)",
            },
            // blur: {
            //   backgroundColor: "var(--color-secondary)",
            // },
          }}
        />

        {searchTerm && (
          <motion.span
            id="button-clear-wrapper"
            className={styles.buttonClear_wrapper}
          >
            <motion.button
              className={styles.buttonClear}
              onClick={() => setSearchTerm("")}
              //TODO: Add FramerMotion animations
            >
              <XMarkIcon />
            </motion.button>
          </motion.span>
        )}
      </motion.div>

      {/* Results */}
      {filteredData.length > 0 && (
        <motion.section
          className={styles.results}
          id="search-results"
          variants={{
            hidden: { opacity: 0, y: 10 },
            showing: { opacity: 1, y: 0 },
            blur: { height: 0, opacity: 0, y: 10 },
          }}
        >
          {filteredData.map((item, index) => (
            <Link
              onClick={() => handleResultClick(item.slug)}
              className={styles.result}
              href={`${item.contentType}/${item.slug}`}
              key={index}
            >
              <div>{item.title}</div>
            </Link>
          ))}
        </motion.section>
      )}
    </div>
  );
}
