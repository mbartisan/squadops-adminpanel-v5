import { createMuiTheme } from "@material-ui/core/styles";
export default createMuiTheme({
    palette: {
        type: 'dark',
        logo: '#dec32d',
        primary: {
            light: '#ded15f',
            main: '#bfaa29',
            dark: '#a59113',
            contrastText: '#838a93' //838a93 ccc
        },
        gray: {
            light: '#353c46', //353c46 353c46
            mid: '#232932', //232932 252832
            dark: '#12161E' //12161E 1b1d23
        },
        background: {
            paper: '#12161E',
            default: '#232932'
        }
    },
    typography: {
        logo: ['"gunplay"'].join(","),
        fontFamily: ['"Noto Sans"', '"Helvetica"', "sans-serif"].join(","),
        subtitle1: {
            fontFamily: ['"Noto Sans"', '"Helvetica"', "sans-serif"].join(","),
            fontSize: '0.95rem',
            fontWeight: '700',
            color: 'rgba(255,255,255,0.7)'
        },
        body1: {
            fontSize: '16px',
            color: 'rgba(255,255,255,0.95)'
        }
    }
});

