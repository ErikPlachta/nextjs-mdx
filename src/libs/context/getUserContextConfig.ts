/**
 * Utility for handling user configuration options in the application to override defaults
 *
 * @todo  //TODO: 20240620 #EP || Update to use fs to read from root directory for context-config.ts file.
 */

import { ContextConfig } from "@/libs/context/types";
import UserConfig from "UserConfig";

/**
 * Configuration for the application to pass down to components.
 *
 * @name        Config
 * @memberof    module:context
 * @returns     {ContextConfig} The configuration object for the application.
 **/
export default function getUserContextConfig(): ContextConfig {
  // 1. Look for file in root directory called context-config.ts with fs
  let config: ContextConfig = UserConfig || {};
  // 2. Return the config object
  return config;
}
