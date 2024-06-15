/**
 * Evaluates User Config against Application Default and returns validated Context.
 *
 * @module    context
 * @exports   Context
 * @version   0.0.1
 * @created   2023-08-20
 * @modified  2023-08-20
 * @since     2023-08-20
 * @changelog
 *  - 0.0.1 | Erik Plachta | feat: Initial commit of concept fully working and integrated into app/layout.
 */

import { ContextDefault } from "@/types";
import Config from "@/context/config";
import Defaults from "@/context/defaults";
import validateProps from "@/utils/ValidateProps";
import { merge } from "@/utils/ObjectUtils";

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
 *
 */
export default function Context(): ContextDefault {
  // Get default context.
  const defaults = Defaults();
  // console.log('defaults: ', defaults)

  // Get user defined config values.
  const defaultTypes = Defaults();
  // Get user defined config values.
  const config = Config();
  // Pass into validateProps function and return validated props.
  const validateConfig = validateProps(defaultTypes, config);
  // Merge validated props with defaults and return with deep merge.
  const validContext: ContextDefault = merge(
    "deep",
    defaults,
    validateConfig.validProps
  );
  return validContext;
}
