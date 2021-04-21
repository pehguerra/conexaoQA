import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

import { CssTextField } from '../layout/CssTextField'
import Luxon from '@date-io/luxon'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers"

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })
    
    const { school, degree, fieldofstudy, from, to, current, description } = formData

    const [toDateDisabled, toggleDisabled] = useState(false)

    const [errors, setErrors] = useState({})
    const [hasError, setHasError] = useState(false)
    const [schoolTouched, setSchoolTouched] = useState(false)
    const [degreeTouched, setDegreeTouched] = useState(false)
    const [fieldofstudyTouched, setFieldOfStudyTouched] = useState(false)
    const [fromTouched, setFromTouched] = useState(false)

    const validate = (e) => {
        if (e.key === 'Tab') {
            return
        }

        console.log(`AAAAAAAAAAAAAAAAA: ${from}`)

        if (e.target.name === 'school') {
            setSchoolTouched(true)
        } else if (e.target.name === 'degree') {
            setDegreeTouched(true)
        } else if (e.target.name === 'fieldofstudy') {
            setFieldOfStudyTouched(true)
        } else if (e.target.name === 'fromTouched') {
            setFromTouched(true)
        }

        let errors = {}

        if (school === '') {
            errors.school = 'Campo obrigatório'
        } else {
            errors.school = ''
        }

        if (degree === '') {
            errors.degree = 'Campo obrigatório'
        } else {
            errors.degree = ''
        }

        if (fieldofstudy === '') {
            errors.fieldofstudy = 'Campo obrigatório'
        } else {
            errors.fieldofstudy = ''
        }

        if (from === '') {
            errors.from = 'Campo obrigatório'
        } else {
            errors.from = ''
        }

        errors.school === '' && errors.degree === '' && errors.fieldofstudy === '' && errors.from ? setHasError(false) : setHasError(true)

        setErrors({ ...errors})
    }

    const handleChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
        addEducation(formData, history)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                <i className="fas fa-graduation-cap text-primary"></i> Adicionar Formação Acadêmica
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Adicione suas formações acadêmicas para turbinar seu perfil
            </p>
            <small>* = campos obrigatórios</small>
            <form className="form-input" onSubmit={e => handleSubmit(e)} noValidate>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Escola" 
                        name="school"
                        value={school}
                        onChange={e => handleChange(e)}
                        fullWidth
                        autoComplete="school"
                        required
                        autoFocus
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.school && schoolTouched && { error: true, helperText: errors.school })}
                    />
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Degree" 
                        name="degree"
                        value={degree}
                        onChange={e => handleChange(e)}
                        fullWidth
                        autoComplete="degree"
                        required
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.degree && degreeTouched && { error: true, helperText: errors.degree })}
                    />
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Curso" 
                        name="fieldofstudy"
                        value={fieldofstudy}
                        onChange={e => handleChange(e)}
                        fullWidth
                        autoComplete="fieldofstudy"
                        required
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.fieldofstudy && fieldofstudyTouched && { error: true, helperText: errors.fieldofstudy })}
                    />
                </div>
                <div className="my-1">
                    <h4>Início *</h4>
                    <MuiPickersUtilsProvider utils={Luxon}>
                    <KeyboardDatePicker
                        placeholder="2018/10/10"
                        value={from}
                        onChange={date => console.log(`${date.day}/${date.month}/${date.year}`)}
                        format="yyyy/MM/dd"
                    />
                    </MuiPickersUtilsProvider>
                </div>
                <div className="my-1">
                    <p>
                        <input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                        setFormData({ ...formData, current: !current })
                        toggleDisabled(!toDateDisabled)
                        }} /> {' '}Cursando
                    </p>
                </div>
                <div className="my-1">
                    <h4>Até</h4>
                    
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Descrição da formação" 
                        name="description"
                        value={description}
                        onChange={e => handleChange(e)}
                        fullWidth
                        multiline
                        autoComplete="description"
                    />
                </div>
                <input type="submit" className="btn btn-primary my-1" value="Adicionar Formação" />
                <Link className="btn btn-light my-1" to="/dashboard">Retornar</Link>
            </form>
        </Fragment>
    )
}

AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
