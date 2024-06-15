/**
 * @memberof  namespace.utils
 * @module    ObjectUtils
 * @exports   SortAndFilter
 * @exports   merge
 * @exports   mergeDeep
 * @exports   mergeShallow
 * @exports   isSameType
 *
 * @version   0.0.1
 * @created   2023-08-20
 */

// TODO: Update to not require relative path import.
// import { Projects, Notes } from "./../../../.contentlayer/generated";
const Projects: any = [];
const Notes: any = [];

/**
 * Valid status values data can be filtered by.
 */
export type statusTypes =
  | undefined
  | ""
  | "Draft"
  | "draft"
  | "Published"
  | "published"
  | "Archived"
  | "archived"
  | "Deleted"
  | "deleted"
  | "Hidden"
  | "hidden";

// Define a custom type with a string index signature
export type IndexedObjectType = { [key: string]: any };

/**
 * Sorts and filters data to be used in SortAndFilter utility function.
 *
 * @param {[]} data - Array of Note and Project objects from MDX managed by Content Layer to be built.
 * @param {object} config - Filter configuration parameters to manage how data is filtered and sorted.
 * @param {string[]} data.status - Array of status values to filter by.
 * @param {string[]} data.contentType - Array of content type values to filter by.
 * @param {string} data.sortKey - Key to sort by.
 * @param {string} data.sortDataType - Type of data to sort by.
 * @param {string} data.sortOrder - Order to sort by.
 * @param {boolean} data.noSortKey_Remove - `Optionally` remove record from results if it does not contain the sort key.
 * @param {boolean} data.noSortKey_Last - `Optionally` move record to end of results if it does not contain the sort key.`
 */
export type SortAndFilterPropTypes = {
  data: [] | (typeof Notes)[] | (typeof Projects)[];
  config: {
    status: statusTypes[];
    contentType: string[];
    sortKey: undefined | string;
    sortDataType: undefined | "date" | "number" | "string";
    sortOrder: undefined | "descending" | "ascending" | "none";
    noSortKey_Remove?: boolean;
    noSortKey_Last?: boolean;
  };
};

// -----------------------------------------------------------------------------
// Primary Export, ObjectUtils

const ObjectUtils = {
  pick,
  SortAndFilter,
  merge,
  mergeDeep,
  mergeShallow,
  isSameType,
};

// -----------------------------------------------------------------------------
// Pick

/**
 * Filters and picks specified keys from objects in an array based on a search term.
 *
 * @param {IndexedObject[]} data - The array of objects to filter and pick from.
 * @param {string[]} keys - An array of keys to pick from the objects.
 * @param {string} searchTerm - The search term to filter objects by.
 * @returns {IndexedObject[]} A new array of objects with only the picked keys and values that match the search term.
 */
export function pick(
  data: IndexedObjectType[],
  keys: string[],
  searchTerm: string
): IndexedObjectType[] {
  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return data
    .filter((obj) => {
      // Check if any of the specified keys contain the search term
      return keys.some((key) => {
        const value = obj[key];
        return (
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
    })
    .map((obj) => {
      // Create a new object with only the picked keys
      return keys.reduce((pickedObj, key) => {
        if (key in obj) {
          pickedObj[key] = obj[key];
        }
        return pickedObj;
      }, {} as IndexedObjectType);
    });
}

// -----------------------------------------------------------------------------
// Sort and Filter

/**
 * Filters and sorts data to be used in buildBlogData().
 *
 * @param {SortAndFilterProps} params - Object containing data and config.
 * @param {Object[]} params.data - Array of Note objects.
 * @param {object} params.config - contains status and content type values to filter by.
 * @param {string[]} params.data.status - Array of status values to filter by.
 * @param {string[]} param.data.contentType - Array of content type values to filter by.
 * @param {string} param.data.sortKey - Key to sort by.
 * @param {string} param.data.sortDataType - Type of data to sort by.
 * @param {string} param.data.sortOrder - Order to sort by.
 * @param {boolean} param.data.noSortKey_Remove - `Optionally` remove record from results if it does not contain the sort key.
 * @param {boolean} param.data.noSortKey_Last - `Optionally` move record to end of results if it does not contain the sort key.`
 *
 * @returns {Object[]} - Array of Note objects.
 *
 * TODO: 20230904 #EP || Move to utilities folder so can be used in other places once verified.
 */
export function SortAndFilter(params: SortAndFilterPropTypes): Object[] {
  //-- Deconstruct Params & Create Vars
  const { data, config } = params;

  //-- Data Validation
  if (!data) return [];
  if (data.length === 0) return []; //TODO: add default so if empty returns empty msg.

  //------------------------------------
  //-- Private utility functions

  /**
   * Filter data and return results that match status: (e.g. "published", "draft", etc.)
   *
   * @private
   * @function filterDataByStatus
   * @param {object[]} data - Array of objects to sort.
   * @param {string[]} status - Array of status values to filter by.
   *
   * @returns {object[]} - Sorted array of objects that match status.
   */
  function filterDataByStatus(data: object[], status: statusTypes[]): Object[] {
    // console.log("data.length", typeof data);
    if (!data) return [];
    //if (typeof data === "string") return [];
    //if (data.length === 0) return [];

    if (!Array.isArray(data) || data.length === 0) return [];

    console.log("info: ", typeof data, data.length, data);
    const results = data.filter((post: any) => {
      return status.includes(post?.status?.toLowerCase());
    }) as Object[];

    console.log("results", results);
    return results;
  }

  /**
   * Filter data and return results that match contentType: (e.g. "note", "project", etc.)
   *
   * @private
   * @function filterDataByContentType
   * @param {object[]} data - Array of objects to sort.
   * @param {string[]} contentType - Array of content type values to filter by.
   *
   * @returns {object[]} - Sorted array of objects that match content type.
   */
  function filterDataByContentType(
    data: object[],
    contentType: string[]
  ): Object[] {
    return data.filter((post: any) => {
      return contentType.includes(post.contentType.toLowerCase());
    });
  }

  /**
   * Utility for sorting object based on key and data-type.
   *
   * @private
   * @function sortDataByKeyTypeOrder
   * @param {object[]} data - Array of objects to sort.
   * @param {string} sortKey - Key to sort by.
   * @param {string} sortDataType - Type of data to sort by.
   * @param {string} sortOrder - Order to sort by.
   * @param {boolean} noSortKey_Remove - `Optionally` remove record from results if it does not contain the sort key.
   * @param {boolean} noSortKey_Last - `Optionally` move record to end of results if it does not contain the sort key.`
   *
   * @returns {object[]} - Sorted array of objects.
   *
   * @TODO 20230904 #EP || Add SortOrder logic.
   * @TODO 20240225 #EP || Add noSortKey logic.
   * */
  function sortDataByKeyTypeOrder(
    data: object[],
    sortKey: SortAndFilterPropTypes["config"]["sortKey"],
    sortDataType: SortAndFilterPropTypes["config"]["sortDataType"],
    // TODO: 20230904 #EP || Add SortOrder logic
    sortOrder: SortAndFilterPropTypes["config"]["sortOrder"],
    // TODO: 20240225 #EP ||  Add noSortKey logic.
    noSortKey_Remove: SortAndFilterPropTypes["config"]["noSortKey_Remove"],
    noSortKey_Last: SortAndFilterPropTypes["config"]["noSortKey_Last"]
  ): Object[] {
    try {
      let sortedData = []; // Array to hold sorted data.

      // ---------------------------------
      // 1. Invalid sortKey or sortDataType
      if (!sortKey || !sortDataType) return data;

      // ---------------------------------
      // 2. Optionally filter out records that do not contain the sort key.
      data = data
        .map((post: any) => {
          // 2.1 Remove record if it does not contain the sort key.
          if (noSortKey_Remove && !post?.[sortKey]) {
            return null;
          }
          return post;
        })
        .filter(Boolean); // Remove null values from the array

      // ---------------------------------
      // 3. Optionally Move record to end of results if it does not contain the sort key.
      if (noSortKey_Last) {
        let data_noSortKey = data.filter((post: any) => {
          return !post?.[sortKey];
        });
        let data_sortKey = data.filter((post: any) => {
          return post?.[sortKey];
        });
        data = data_sortKey.concat(data_noSortKey);
      }

      // ---------------------------------
      // 4. Sorting by a string
      if (sortDataType === "date") {
        sortedData = data.sort((a: any, b: any) => {
          if (new Date(a?.[sortKey]) > new Date(b?.[sortKey])) {
            return -1;
          }
          return 1;
        });
        // // check if sortOrder is ascending
        // if (sortOrder === "ascending") return sortedData.reverse();
        // else return sortedData
        // else return sortedData;
      }
      // 5. Sorting by a number
      else if (sortDataType === "number") {
        // Sort data by number in descending order.
        sortedData = data.sort((a: any, b: any) => {
          if (Number(a?.[sortKey]) > Number(b?.[sortKey])) {
            return -1;
          }
          return 1;
        });
      }
      //-- Type not defined above.
      else {
        throw new Error(`sortDataType "${sortDataType}" is not defined.`);
      }

      // check if sortOrder is ascending
      if (sortOrder === "ascending") return sortedData.reverse();
      // else return sortedData
      else return sortedData;
    } catch (error) {
      console.error("Error in sortDataByKeyTypeOrder: ", error);
      return [];
    }
  }

  //------------------------------------
  //-- Main functionality

  function main() {
    // 1. Create object to hold data to be returned
    let data_filtered: Object[] = [];

    // 2. Populates data_filtered array with posts that match status and content type
    if (config) {
      // 2.1 Filter data by status and content type.
      data_filtered = filterDataByStatus(data, config.status); // TODO: Remove this function once verified not wanted here. (I'm filtering on server side now so shouldn't be needed)

      // 2.2 Filter data by content type.
      data_filtered = filterDataByContentType(
        data_filtered,
        config.contentType
      );

      // 2.3. Sort filtered data by sortKey, sortDataType, and sortOrder.
      data_filtered = sortDataByKeyTypeOrder(
        data,
        config.sortKey,
        config.sortDataType,
        config.sortOrder,
        config.noSortKey_Remove,
        config.noSortKey_Last
      ) as Object[];

      console.log("!!!data", data_filtered);
      console.log("!!!data_filtered", data_filtered);

      // 4. Return filtered data to be be used, if any.
      return data_filtered;
    } else {
      throw new Error(
        "[util][SortAndFilter] Invalid request. No config object provided."
      );
    }
  }

  return main();
}

// -----------------------------------------------------------------------------
// Merging Objects

/**
 * Merges objects together. If the objects are not of the same type, an error is thrown.
 *
 * @module    merge
 * @exports   merge
 * @version   0.0.1
 * @created   2023-08-20
 * @modified  2023-08-20
 * @since     2023-08-20
 *
 *
 * @name    merge
 * @memberof namespace.utils
 * @module utils.merge
 * @param {'deep' | 'shallow'} mergeType The type of merge to perform. Either 'deep' or 'shallow'.
 * @param {any} baseObject The object to merge into.
 * @param {any[]} objects The objects to merge into the base object.
 * @returns {any} The merged object.
 * @throws {Error} If the objects are not of the same type.
 */
export function merge(
  mergeType: "deep" | "shallow",
  baseObject: any,
  ...objects: any[]
): any {
  let mergedResult = { ...baseObject };
  let invalidObjects = [];

  for (const obj of objects) {
    // If objects type is not the same as base object, throws error
    if (!isSameType(baseObject, obj)) {
      invalidObjects.push(obj);
      throw new Error("Objects are not alike and cannot be merged.");
    }

    // Execute deep merge
    if (mergeType === "deep") {
      mergedResult = mergeDeep(mergedResult, obj);
    }
    // Otherwise executes shallow merge
    else {
      mergedResult = mergeShallow(mergedResult, obj);
    }
  }
  return mergedResult;
}

export function mergeDeep(sourceObj: any, mergeObj: any): any {
  let mergedOutput = Object.assign({}, sourceObj);

  for (const key in mergeObj) {
    if (
      typeof mergeObj[key] === "object" &&
      !Array.isArray(mergeObj[key]) &&
      mergeObj[key] !== null
    ) {
      if (!(key in sourceObj)) mergedOutput[key] = mergeObj[key];
      else mergedOutput[key] = mergeDeep(sourceObj[key], mergeObj[key]);
    } else {
      mergedOutput[key] = mergeObj[key];
    }
  }
  return mergedOutput;
}

export function mergeShallow(sourceObj: any, mergeObj: any): any {
  return Object.assign({}, sourceObj, mergeObj);
}

export function isSameType(obj1: any, obj2: any): boolean {
  return Object.getPrototypeOf(obj1) === Object.getPrototypeOf(obj2);
}

// -----------------------------------------------------------------------------

export default ObjectUtils;
