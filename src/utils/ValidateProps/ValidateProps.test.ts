import {
    StyleProps,
    HeroProps
} from '@/types';


import validateProps from './index';


// Default Parameters
const defaultParams:HeroProps = {
    content: {
        title: "Default Title",
        description: "Default Description"
    },
    dataRole: {
        wrapper: 'hero-wrapper',
        title: 'hero-title',
        description: 'hero-description',
    },
    style: {
        description: {
            tailwinds: "pb-4 text-gray-500 text-md"
        },
        title: {
            tailwinds: "p-4 pb-0 text-gray-900 text-4xl"
        },
        wrapper: {
            tailwinds: "p-4 grid grid-cols-1 gap-4"
        }
    },
    layout: "1x1"
};

// Example Props
const props:Partial<HeroProps> = {
    content: {
        title: "Test Title",
        description: "Test Description"
    },
};


// Example of using the function
const validationResult = validateProps(defaultParams, props);
if (validationResult) {
    console.warn("Invalid props detected:", validationResult);
} else {
    console.log("Props are valid!");
}
