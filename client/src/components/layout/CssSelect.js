import { withStyles } from '@material-ui/core/styles'
import Select from '@material-ui/core/Select';
import { primaryColor } from '../../utils/fieldColors'

export const CssSelect = withStyles({
    select: {
        '&.MuiInput-underline:after': {
            borderBottomColor: primaryColor
        }
    },
    icon: {
        fill: primaryColor
    }
})(Select)