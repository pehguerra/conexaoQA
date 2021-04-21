import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

import { CssTextField } from '../layout/CssTextField'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

    const [errors, setErrors] = useState({})
    const [hasError, setHasError] = useState(true)
    const [emailTouched, setEmailTouched] = useState(false)
    const [passwordTouched, setPasswordTouched] = useState(false)

    const validate = (e) => {
        if (e.key === 'Tab') {
            return
        }

        if (e.target.name === 'email') {
            setEmailTouched(true)
        } else if (e.target.name === 'password') {
            setPasswordTouched(true)
        }

        let errors = {}

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

        errors.email === '' && errors.password === '' ? setHasError(false) : setHasError(true)

        setErrors({ ...errors})
    }

    const handleChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
        login(email, password)
    }
        
    // redirects if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Entrar</h1>
            <p className="lead"><i className="fas fa-user"></i> Acessar Conta</p>
            <form className="form-input" onSubmit={e => handleSubmit(e)} noValidate>
                <div className="my-1">
                    <CssTextField 
                        type="email"
                        label="Email" 
                        name="email"
                        value={email}
                        onChange={e => handleChange(e)}
                        required 
                        fullWidth
                        autoFocus
                        autoComplete="email"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.email && emailTouched && { error: true, helperText: errors.email })}
                    />
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
                        autoComplete="current-password"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.password && passwordTouched && { error: true, helperText: errors.password })}
                    />
                </div>
                <input 
                    type="submit" 
                    className={hasError || !emailTouched || !passwordTouched ? 'btn-disabled' : 'btn btn-primary'} 
                    value="Entrar"
                    {...(hasError && { disabled: true })} 
                />
            </form>
            <p className="my-1">
                Não tem uma conta? <Link to="/cadastrar">Cadastrar</Link>
            </p>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
