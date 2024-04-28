import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { createTheme } from '@mui/material';

// @ts-ignore
const ipatientTheme: IPatientTypes = createTheme({
    palette: {
      //@ts-ignore
      primary: { main: '#05CC7E', darker: '#004146' },
      secondary: {
        main: "#252525",
        light: "#68727D",
        //@ts-ignore
        lighter: "#F2F4F6",//#D9DBDD
        lightest: "#F8F9FB"
      },
      background: {
        //@ts-ignore
        main: '#05CC7E',
        white: '#FFFFFF'
      },
      state: {
        success: '#05CC7E',
        warning: '#EAA108',
        error: '#EF4444',
        information: '#06ACD4',
        away: '#EAA108',
        feature: '#AA55F7',
        neutral: '#5D6C7D',
        verified: '#3B76F6',
      },
      border: {
        main: '#D1D5DB',
      }
    },
    typography: {
        h1: {
          fontSize: '60px',
          lineHeight: 1.2,
          fontWeight: 800,
        },
        h2: {
          fontSize: '48px',
          lineHeight: 1.2,
          fontWeight: 800,
        },
        h3: {
          fontSize: '36px',
          lineHeight: 1.2,
          fontWeight: 800,
        },
        h4: {
          fontSize: '30px',
          lineHeight: 1.2,
          fontWeight: 800,
        },
        h5: {
          fontSize: '24px',
          lineHeight: 1.2,
          fontWeight: 800,
        },
        h6: {
          fontSize: '16px',
          lineHeight: 1.2,
          fontWeight: 800,
        },
        // @ts-ignore
        labelxl: {
          fontSize: '20px',
          lineHeight: 1.5,
          fontWeight: 600,
        },
        labellg: {
          fontSize: '18px',
          lineHeight: 1.5,
          fontWeight: 600,
        },
        labelbase: {
          fontSize: '16px',
          lineHeight: 1.5,
          fontWeight: 600,
        },
        labelsm: {
          fontSize: '14px',
          lineHeight: 1.5,
          fontWeight: 600,
        },
        labelxs: {
          fontSize: '12px',
          lineHeight: 1.5,
          fontWeight: 600,
        },
        labelxxs: {
          fontSize: '10px',
          lineHeight: 1.5,
          fontWeight: 600,
        },
        paragraphxl: {
          fontSize: '20px',
          lineHeight: 1.5,
          fontWeight: 400,
        },
        paragraphlg: {
          fontSize: '18px',
          lineHeight: 1.5,
          fontWeight: 400,
        },
        paragraphbase: {
          fontSize: '16px',
          lineHeight: 1.5,
          fontWeight: 400,
        },
        paragraphsm: {
          fontSize: '14px',
          lineHeight: 1.5,
          fontWeight: 400,
        },
        paragraphxs: {
          fontSize: '12px',
          lineHeight: 1.5,
          fontWeight: 400,
        },
        paragraphxxs: {
          fontSize: '10px',
          lineHeight: 1.5,
          fontWeight: 400,
        },
    },
    borderRadius: {
      none: '0px',
      xs: '4px',
      sm: '10px',
      base: '12px',
      md: '14px',
      lg: '20px',
      full: '50%',
    },
    iconSize: {
        xs: '8px',
        sm: '14px',
        md: '16px',
        lg: '20px',
        l: '24px',
        xl: '36px',
        xxl: '48px',
    },
    spacing: [0, 4, 8, 16, 24, 32, 64, 84, 98, 120, 144],
    // @ts-ignore
    fonts: 'Roboto Condensed, sans-serif',
});

export interface IPatientTypes{
    palette?: Palette;
    typography?: { [key: string]: Typography };
    borderRadius?: BorderRadius;
    iconSize?: IconSize;
    spacing?: number[];
    fonts?: string;
};

export interface Palette {
    primary?: Danger;
    secondary?: Danger;
    state?: State;
    background?: Background;
    border?: BorderProps;
};

export interface BorderProps {
    main?: string;
}

export interface BorderRadius {
    none?: string;
    xs?: string;
    sm?: string;
    base?: string;
    md?: string;
    lg?: string;
    full?: string;
}

export interface IconSize {
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    l?: string;
    xl?: string;
    xxl?: string;
}

export interface State {
    success?: string;
    warning?: string;
    error?: string;
    information?: string;
    away?: string;
    feature?: string;
    neutral?: string;
    verified?: string;
}

export interface Background {
    main: string;
    darkest: string;
    darker: string;
    dark: string;
    base: string;
    light: string;
    lighter: string;
    lightest: string;
    primary: string;
    secondary: string;
    white: string;
}

export interface Danger {
    main?: string;
    darkest?: string;
    darker?: string;
    dark?: string;
    base?: string;
    light?: string;
    lighter?: string;
    lightest?: string;
};

export interface Typography {
    fontSize?: string;
    lineHeight?: number;
    fontWeight?: number;
}

export default ipatientTheme;