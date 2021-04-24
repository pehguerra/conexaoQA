import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import { useFormik } from 'formik'
import * as yup from 'yup'
import DateFnsUtils from "@date-io/date-fns";

import { CssTextField } from '../layout/CssTextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { materialTheme } from '../layout/CssDatePicker'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles"

const validationSchema = yup.object({
    title: yup
        .string()
        .required('Posição é obrigatória'),
    company: yup
        .string()
        .required('Empresa é obrigatória'),
    current: yup
        .boolean(),
    from: yup
        .date()
        .required('Início é obrigatório')
        .nullable(),
    to: yup
        .date()
        .nullable(true)
        .when('current', {
            is: false,
            then: yup.date().required("Até é obrigatório").nullable(true)
        })
})

const AddExperience = ({ addExperience, history }) => {
    const formik = useFormik({
        initialValues: {
            title: '',
            company: '',
            location: '',
            from: null,
            current: false,
            to: null,
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            addExperience(values, history)
        }
    })

    return (
        <Fragment>
            <h1 className="large text-primary">
                <i className="fab fa-black-tie text-primary"></i> Adicionar Experiência Profissional
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Adicione suas experiências profissionais que você já teve no passado ou está no momento
            </p>
            <small>* = campos obrigatórios</small>
            <form className="form-input" onSubmit={formik.handleSubmit} noValidate>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Posição" 
                        name="title"
                        fullWidth
                        autoComplete="title"
                        required
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Empresa" 
                        name="company"
                        fullWidth
                        autoComplete="company"
                        required
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.company && Boolean(formik.errors.company)}
                        helperText={formik.touched.company && formik.errors.company}
                    />
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Localização" 
                        name="location"
                        fullWidth
                        autoComplete="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.location && Boolean(formik.errors.location)}
                        helperText={formik.touched.location && formik.errors.location}
                    />
                </div>
                <div className="my-1">
                    <h4>Início</h4>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={materialTheme}>
                            <KeyboardDatePicker
                                id="from"
                                label="dd/MM/aaaa"
                                format="dd/MM/yyyy"
                                value={formik.values.from}
                                onChange={e => formik.setFieldValue("from", e)}
                                error={formik.touched.from && Boolean(formik.errors.from)}
                                helperText={formik.touched.from && formik.errors.from}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                                autoOk
                            />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                </div>
                <div className="my-1">
                    <p>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    size="small"
                                    name="current" 
                                    label="AAAAAAAA"
                                    checked={formik.values.current} 
                                    value={formik.values.current} 
                                    onChange={formik.handleChange} 
                                    disableRipple
                                    style ={{
                                        color: "#17a2b8",
                                    }}
                                /> 
                            }
                            label="Atual"
                        />
                    </p>
                </div>
                <div className="my-1">
                <h4>{formik.values.current ? 'Até' : 'Até *'}</h4>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <ThemeProvider theme={materialTheme}>
                            <KeyboardDatePicker
                                id="to"
                                label="dd/MM/aaaa"
                                format="dd/MM/yyyy"
                                disabled={formik.values.current ? true : false}
                                value={formik.values.to}
                                onChange={e => formik.setFieldValue("to", e)}
                                error={formik.touched.to && Boolean(formik.errors.to)}
                                helperText={formik.touched.to && formik.errors.to}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                                autoOk
                            />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Descrição da formação" 
                        name="description"
                        fullWidth
                        multiline
                        autoComplete="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Adicionar Experiência" />
                <Link className="btn btn-light my-1" to="/dashboard">Retornar</Link>
            </form>
        </Fragment>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience))
