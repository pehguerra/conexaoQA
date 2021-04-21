import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

export const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#17a2b8',
        },
        '& label.Mui-error': {
            color: 'red',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#17a2b8',
        },
        '& .Mui-error:after': {
            borderBottomColor: 'red !important'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#17a2b8',
            },
        },
    }
})(TextField)