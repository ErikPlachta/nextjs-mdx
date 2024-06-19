/**
 * Type reference for how styles are managed within the project via context.
 * @typedef     {object} Styles
 * @property    {string} tailwinds - The Tailwind CSS styles for the project. @see {@link https://tailwindcss.com/docs Tailwind CSS}
 */
export default interface StylesType {
  [key: string]: {
    tailwinds: string;
  };
}

// type StylePropsKeys = keyof StyleProps;
