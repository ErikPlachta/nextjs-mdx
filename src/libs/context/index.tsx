/**
 * Evaluates User Config against Application Default and returns validated Context.
 */

import { ContextDefault } from "./types";
import Config from "./getUserContextConfig"; // TODO: Update to move from root.
import Defaults from "./getContextDefaults";
import validateProps from "@/libs/ValidateProps";
import { merge } from "@/libs/ObjectUtils";

/**
 * Evaluates User Config against Application Default and returns validated Context.
 *
 * @name      Context
 * @memberof  module:context
 * @type      {Partial<ContextDefault> & Partial<ContextConfig>}
 * @returns   {ContextDefault} The validated context object.
 * @see       {@link '@/types/context'} for type definition reference.
 * @see       {@link '@/context/config'} to customize default values.
 * @see       {@link '@/context/defaults'} for default values.
 * @see       {@link '@/utils/ValidateProps'} for the function that validates config props against default types.
 * @see       {@link '@/utils/MergeObjects'} to see how defaults and config objects are being deep-merged.
 */
export default function Context(): ContextDefault {
  // 1. Get default context.
  const defaults = Defaults();

  // 2. Get user defined config values.
  const defaultTypes = Defaults();

  // 3. Get user defined config values.
  const config = Config();

  // 4. Pass into validateProps function and return validated props.
  const validateConfig = validateProps(defaultTypes, config);

  // 5. Merge validated props with defaults and return with deep merge.
  const validContext: ContextDefault = merge(
    "deep",
    defaults,
    validateConfig.validProps
  );
  return validContext;
}
