/**
 * Type reference for how styles are managed within the project.
 *
 * @namespace   types.styles
 * @memberof    types
 * @description Type reference for how styles are managed within the project.
 * @typedef     {object} Styles
 * @property    {string} tailwinds - The Tailwind CSS styles for the project. @see {@link https://tailwindcss.com/docs Tailwind CSS}
 */
export default interface StyleConfig {
  [key: string]: {
    tailwinds: string;
  };
}

// type StylePropsKeys = keyof StyleProps;