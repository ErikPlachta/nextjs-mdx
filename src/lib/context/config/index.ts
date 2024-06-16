// "use server";
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
 * @requires    {ContextConfig} from 'context/types'
 * //@requires    {HomeIcon, PencilIcon} from "@heroicons/react/20/solid";
 * @exports     Config
 *
 * @changelog
 *  - 0.0.1 | 2023-08-19 | Erik Plachta | feat: Initial Commit of concept.
 *  - 0.0.2 | 2023-08-20 | Erik Plachta | feat: Add final draft config framework for context. chore: Add docs.
 *  - 0.1.0 | 2024-06-16 | Erik Plachta | feat: Get config file from root, if defined. Updated to handle context-config.ts in the root dir vs having hard-coded values here. Goal is to prevent the need to modify this library file for each project.
 */

import { ContextConfig } from "context/types";
import UserConfig from "UserConfig";

/**
 * Configuration for the application to pass down to components.
 *
 * @name        Config
 * @memberof    module:context
 * @type        {ContextConfig}
 **/
export default function Config(): ContextConfig {
  // 1. Look for file in root directory called context-config.ts with fs
  let config: ContextConfig = UserConfig || {}; // Default to empty object.

  // 2. Return the config object
  return config;
}
