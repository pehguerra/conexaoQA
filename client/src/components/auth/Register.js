import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'

import { CssTextField } from '../layout/CssTextField'

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData

    const [errors, setErrors] = useState({})
    const [hasError, setHasError] = useState(true)
    const [nameTouched, setNameTouched] = useState(false)
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)
    const [password2Touched, setPassword2Touched] = useState(false)

    const validate = (e) => {
        if (e.key === 'Tab') {
            return
        }

        if (e.target.name === 'name') {
            setNameTouched(true)
        } else if (e.target.name === 'email') {
            setEmailTouched(true)
        } else if (e.target.name === 'password') {
            setPasswordTouched(true)
        } else if (e.target.name === 'password2') {
            setPassword2Touched(true)
        }

        let errors = {}

        if (name === '') {
            errors.name = 'Campo obrigatório'
        } else {
            errors.name = ''
        }

        if (email === '') {
            errors.email = 'Campo obrigatório'
        } else if (!(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email)) {
            errors.email = 'Email inválido'
        } else {
            errors.email = ''
        }

        if (password === '') {
            errors.password = 'Campo obrigatório'
        } else if (password.length < 6) {
            errors.password = 'Sua senha deve conter no mínimo 6 caracteres'
        } else {
            errors.password = ''
        }

        if (password2 === '') {
            errors.password2 = 'Campo obrigatório'
        } else if (password2.length < 6) {
            errors.password2 = 'Sua senha deve conter no mínimo 6 caracteres'
        } else {
            errors.password2 = ''
        }

        errors.name === '' && errors.email === '' && errors.password === '' && errors.password2 === '' ? setHasError(false) : setHasError(true)

        setErrors({ ...errors})
    }

    const handleChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = async e => {
        e.preventDefault()
        if(password !== password2) {
            setAlert('Senhas precisam ser idênticas', 'danger', 10000)
        } else {
            register({ name, email, password })
        }
    }

    // redirects if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
        
    return (
        <Fragment>
            <h1 className="large text-primary">Cadastrar</h1>
            <p className="lead"><i className="fas fa-user"></i> Criar Sua Conta</p>
            <form onSubmit={e => handleSubmit(e)} noValidate>
                <div className="my-1">
                    <CssTextField
                        type="text" 
                        label="Nome"
                        name="name" 
                        value={name} 
                        onChange={e => handleChange(e)}
                        required
                        fullWidth
                        autoFocus
                        autoComplete="name"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.name && nameTouched && { error: true, helperText: errors.name })}
                    />
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="email" 
                        label="Email" 
                        name="email"
                        value={email}
                        onChange={e => handleChange(e)}
                        required
                        fullWidth
                        autoComplete="email"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.email && emailTouched && { error: true, helperText: errors.email })}
                    />
                    <small className="form-text">
                        Este site usa Gravatar, então caso queira uma imagem para o perfil, user o email Gravatar
                    </small>
                </div>
                <div className="my-1">
                    <CssTextField
                        type="password"
                        label="Senha"
                        name="password"
                        value={password}
                        onChange={e => handleChange(e)}
                        minLength="6"
                        required
                        fullWidth
                        autoComplete="new-password"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.password && passwordTouched && { error: true, helperText: errors.password })}
                    />
                </div>
                <div className="my-1">
                    <CssTextField
                        type="password"
                        label="Confirmar Senha"
                        name="password2"
                        value={password2}
                        onChange={e => handleChange(e)}
                        minLength="6"
                        required
                        fullWidth
                        autoComplete="confirm-password"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.password2 && password2Touched && { error: true, helperText: errors.password2 })}
                    />
                </div>
                <input 
                    type="submit" 
                    className={hasError || !emailTouched || !passwordTouched ? 'btn-disabled' : 'btn btn-primary'} 
                    value="Cadastrar"
                    {...(hasError && { disabled: true })} 
                />
            </form>
            <p className="my-1">
                Já tem uma conta? <Link to="/login">Entrar</Link>
            </p>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register)
