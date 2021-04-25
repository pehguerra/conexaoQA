import { createMuiTheme } from "@material-ui/core"
import { primaryColor } from '../../utils/fieldColors'

export const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: primaryColor,
            light: primaryColor,
            dark: primaryColor,
        },
        secondary: {
            main: primaryColor,
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