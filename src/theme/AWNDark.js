import { createMuiTheme } from "@material-ui/core/styles";

export const colors = {
    primary: {
        light: '#d3584d',
        main: '#ae3b3b',
        dark: '#912b2b',
        contrastText: '#838a93' //838a93 ccc
    },
    gray: {
        light: '#353c46', //353c46 353c46
        mid: '#232932', //232932 252832
        dark: '#12161E' //12161E 1b1d23
    },
    logo: '#f14033'
};

export default createMuiTheme({
    palette: {
        type: 'dark',
        primary: colors.primary,
        gray: {
            light: '#353c46', //353c46 353c46
            mid: '#232932', //232932 252832
            dark: '#12161E' //12161E 1b1d23
        },
        logo: '#f14033',
        background: {
            paper: colors.gray.dark,
            default: colors.gray.mid
        }
    },
    typography: {
        fontFamily: ['"Noto Sans"', '"Helvetica"', "sans-serif"].join(",")
    }
});

