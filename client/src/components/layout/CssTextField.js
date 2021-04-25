import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { primaryColor } from '../../utils/fieldColors'

export const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: primaryColor,
        },
        '& label.Mui-error': {
            color: 'red',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: primaryColor,
        },
        '& .Mui-error:after': {
            borderBottomColor: 'red'
        }
    }
})(TextField)