import { withStyles } from '@material-ui/core/styles'

import Select from '@material-ui/core/Select';

export const CssSelect = withStyles({
    select: {
        '& .MuiInput-underline:after': {
            borderBottom: `2px solid '#17a2b8' !important`,
        }
    },
    icon: {
        fill: '#17a2b8'
    }
})(Select)