import React, { Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'
import { useFormik } from 'formik'
import * as yup from 'yup'
import DateFnsUtils from "@date-io/date-fns";

import { CssTextField } from '../layout/CssTextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles"
import { materialTheme } from '../layout/CssDatePicker'


const validationSchema = yup.object({
    school: yup
        .string()
        .required('Escola é obrigatória'),
    degree: yup
        .string()
        .required('Grau é obrigatório'),
    fieldofstudy: yup
        .string()
        .required('Curso é obrigatório'),
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

const AddEducation = ({ addEducation, history }) => {
    const formik = useFormik({
        initialValues: {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: null,
            current: false,
            to: null,
            description: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            addEducation(values)
            history.push('/dashboard')
        }
    })

    return (
        <Fragment>
            <h1 className="large text-primary">
                <i className="fas fa-graduation-cap text-primary"></i> Adicionar Formação Acadêmica
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Adicione suas formações acadêmicas para turbinar seu perfil
            </p>
            <small>* = campos obrigatórios</small>
            
            <form className="form-input" onSubmit={formik.handleSubmit} noValidate>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Escola" 
                        name="school"
                        fullWidth
                        autoComplete="school"
                        required
                        value={formik.values.school}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.school && Boolean(formik.errors.school)}
                        helperText={formik.touched.school && formik.errors.school}
                        data-test="education-school"
                    />
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Grau" 
                        name="degree"
                        fullWidth
                        autoComplete="degree"
                        required
                        value={formik.values.degree}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.degree && Boolean(formik.errors.degree)}
                        helperText={formik.touched.degree && formik.errors.degree}
                        data-test="education-degree"
                    />
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Curso" 
                        name="fieldofstudy"
                        fullWidth
                        autoComplete="fieldofstudy"
                        required
                        value={formik.values.fieldofstudy}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.fieldofstudy && Boolean(formik.errors.fieldofstudy)}
                        helperText={formik.touched.fieldofstudy && formik.errors.fieldofstudy}
                        data-test="education-fieldOfStudy"
                    />
                </div>
                <div className="my-1">
                    <h4>Início *</h4>
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
                                data-test="education-from"
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
                                    data-test="education-current"
                                /> 
                            }
                            label="Cursando"
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
                                data-test="education-to"
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
                        data-test="education-description"
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Adicionar Formação" data-test="education-submit" />
                <Link className="btn btn-light my-1" to="/dashboard" data-test="education-dashboard">Retornar</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
