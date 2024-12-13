export interface Theme {
    colors: {
      darkBlue: string;
      white: string;
      mediumBlue: string;
      lightBlue: string;
      logoBlue: string;
      gray: string;
      lightGray1: string;
      lightGray2: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
    spacings: {
      small: string;
      medium: string;
      large: string;
    };
    radii: {
      small: string;
      medium: string;
      large: string;
    };
  }
  
  const theme: Theme = {
    colors: {
      darkBlue: '#003B75',
      white: '#ffffff',
      mediumBlue: '#0082f5',
      lightBlue: '#4AC0FF',
      logoBlue: '#3fa1ff',
      gray: '#666666',
      lightGray1: '#efefef',
      lightGray2: '#f9f9f9',
    },
    fonts: {
      heading: `'Roboto', sans-serif`,
      body: `'Roboto', sans-serif`,
    },
    spacings: {
      small: '8px',
      medium: '16px',
      large: '24px',
    },
    radii: {
      small: '4px',
      medium: '8px',
      large: '16px',
    },
  };
  
  export default theme;
  