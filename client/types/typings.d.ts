import { 
    Background, 
    BorderProps, 
    BorderRadius, Danger, 
    IPatientTypes, IconSize, 
    State, Typography 
} from '@/themes/CustomThemes';
// import { Theme } from '@mui/material/styles';
import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme extends MuiTheme {
    palette: {
      primary: Danger;
      background: Background;
      secondary: Danger;
      state: State;
      border: BorderProps;
    },
    drawerWidth: number;
    typography: any;
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
    labelxl: React.CSSProperties;
    labellg: React.CSSProperties;
    labelbase: React.CSSProperties;
    labelsm: React.CSSProperties;
    labelxs: React.CSSProperties;
    labelxxs: React.CSSProperties;
    paragraphxl: React.CSSProperties;
    paragraphlg: React.CSSProperties;
    paragraphbase: React.CSSProperties;
    paragraphsm: React.CSSProperties;
    paragraphxs: React.CSSProperties;
    paragraphxxs: React.CSSProperties;
    borderRadius: BorderRadius;
    iconSize: IconSize;
    spacing: any;
    fonts: string;
  }
  
  interface ThemeOptions extends MuiThemeOptions {
    palette: {
      primary: Danger;
      background: Background;
      secondary: Danger;
      state: State;
      border: BorderProps;
    };
    drawerWidth: number;
    typography: any;
    h1: React.CSSProperties;
    h2: React.CSSProperties;
    h3: React.CSSProperties;
    h4: React.CSSProperties;
    h5: React.CSSProperties;
    h6: React.CSSProperties;
    labelxl: React.CSSProperties;
    labellg: React.CSSProperties;
    labelbase: React.CSSProperties;
    labelsm: React.CSSProperties;
    labelxs: React.CSSProperties;
    labelxxs: React.CSSProperties;
    paragraphxl: React.CSSProperties;
    paragraphlg: React.CSSProperties;
    paragraphbase: React.CSSProperties;
    paragraphsm: React.CSSProperties;
    paragraphxs: React.CSSProperties;
    paragraphxxs: React.CSSProperties;
    borderRadius: BorderRadius;
    iconSize: IconSize;
    spacing: number[];
    fonts: string;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;
    labelxl: true;
    labellg: true;
    labelbase: true;
    labelsm: true;
    labelxs: true;
    labelxxs: true;
    paragraphxl: true;
    paragraphlg: true;
    paragraphbase: true;
    paragraphsm: true;
    paragraphxs: true;
    paragraphxxs: true;
  }
}
