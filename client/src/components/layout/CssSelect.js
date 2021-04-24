import { withStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select';

export const CssSelect = withStyles({
    root: {
        '& .MuiInput-underline:after': {
            borderBottomColor: '#17a2b8'
        }
    },
    icon: {
        fill: '#17a2b8'
    }
})(Select)