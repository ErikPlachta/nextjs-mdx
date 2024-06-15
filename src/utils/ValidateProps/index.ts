/**
 * @name ValidateProps
 * @type {function}
 * @memberof namespace.utils
 * @module ValidateProps
 * @description Validates the props passed to a component.
 * @param {object} defaultParams  - The default parameters for the component.
 * @param {object} props - The props passed to the component.
 * @returns {object} - Returns an object of invalid props, or null if all props are valid.
 */
export default function validateProps(
  defaultParams: { [title: string]: any },
  props: { [title: string]: any }
): { invalidProps: any; validProps: any } {
  const invalidProps: any = {};
  const validProps: any = {
    ...defaultParams,
  };

  // Loop over each type title in defaultParams (e.g., 'HeroProps')
  Object.keys(defaultParams).forEach((typeTitle) => {
    const defaultProps = defaultParams[typeTitle];

    if (!props[typeTitle]) {
      invalidProps[typeTitle] = "Props missing for this type title";
      return;
    }

    // Loop through all properties of the type definition
    Object.keys(defaultProps).forEach((property) => {
      const propValue = props[typeTitle][property];
      const defaultPropValue = defaultProps[property];

      // Check if prop exists in both props and defaults
      if (propValue && defaultPropValue) {
        // Check if prop type matches the expected type from defaults
        if (typeof propValue !== typeof defaultPropValue) {
          invalidProps[`${typeTitle}.${property}`] = {
            message: `Expected ${typeof defaultPropValue}, got ${typeof propValue}`,
            expectedType: typeof defaultPropValue,
            receivedType: propValue,
          };
        } else {
          validProps[`${typeTitle}`][`${property}`] = propValue;
        }
      } else if (propValue && !defaultPropValue) {
        invalidProps[`${typeTitle}.${property}`] = {
          message: `Property not found in default parameters`,
          value: propValue,
          path: `${typeTitle}.${property}`,
        };
      } else {
        validProps[`${typeTitle}`][`${property}`] = propValue;
      }
    });
  });

  return {
    invalidProps,
    validProps,
  };
}
