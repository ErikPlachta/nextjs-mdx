"use server";
/**
 * Utility for handling user configuration options in the application to override defaults
 *
 * @file        index.tsx
 * @name        config
 * @module      context.config
 * @memberof    module:context
 * @author      Erik Plachta
 * @created     2023-08-19
 * @modified    2023-08-20
 * @version     0.1.0
 *
 * @requires    {ContextConfig} from '@/types'
 * //@requires    {HomeIcon, PencilIcon} from "@heroicons/react/20/solid";
 * @exports     Config
 *
 * @changelog
 *  - 0.0.1 | 2023-08-19 | Erik Plachta | feat: Initial Commit of concept.
 *  - 0.0.2 | 2023-08-20 | Erik Plachta | feat: Add final draft config framework for context. chore: Add docs.
 *  - 0.1.0 | 2024-06-16 | Erik Plachta | feat: Get config file from root, if defined. Updated to handle context-config.ts in the root dir vs having hard-coded values here. Goal is to prevent the need to modify this library file for each project.
 */

import { ContextConfig } from "@/types";

// For getting user config from the root directory, if it exists
import path from "path";
// import { readFile, access, readdir } from "fs/promises";
import { readFileSync, accessSync } from "fs";

/**
 * Configuration for the application to pass down to components.
 *
 * @name        Config
 * @memberof    module:context
 * @type        {ContextConfig}
 **/
export default async function Config(): Promise<ContextConfig> {
  let config: ContextConfig = {};
  // 1. Look for file in root directory called context-config.ts with fs
  //let defaultConfigPath = path.join(process.cwd(), "context-config.tsx");

  // 1.a - File does exist. Read the file.
  //try {
  //  accessSync(defaultConfigPath);
  //} catch (error) {
  //  // 1.b. Doesn't exist
  //  console.log(
  //    "[lib/context/config/index.tsx] No context-config.ts file found in root directory. Returning {} and using defaults."
  //  );
  //  // return {};
  //}

  // 2. Read the file.
  try {
    // const data = readFileSync(defaultConfigPath, "utf8");
    const data = {};
    //config = JSON.parse(data);
    config = {};
    console.log("[lib/context/config/index.tsx] data: ", data);
  } catch (error) {
    console.log(
      "[lib/context/config/index.tsx] Error reading context-config.ts file: ",
      error
    );
    // return {};
  }

  // 3. Return the config object
  return config;
}
