import { createMuiTheme } from "@material-ui/core"

export const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#17a2b8',
            light: '#17a2b8',
            dark: '#17a2b8',
        },
        secondary: {
            main: '#17a2b8',
        },
    },
    overrides: {
        MuiDialogActions: {
            root: {
                display: 'none',
            },
        },
        MuiPickersSlideTransition: {
            transitionContainer: {
                marginBottom: 12,
            },
        },
    }
})