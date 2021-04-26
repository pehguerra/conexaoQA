import React, { Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { CssTextField } from '../layout/CssTextField'

const validationSchema = yup.object({
    email: yup
        .string('Digite seu email')
        .email('Digite um email válido')
        .required('Email é obrigatório'),
    password: yup
        .string('Digite sua senha')
        .min(6, 'A senha deve conter no mínimo 6 caracteres')
        .required('Senha é obrigatória')
})


const Login = ({ login, isAuthenticated }) => {
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: validationSchema,
        onSubmit: ({ email, password }) => {
            login(email, password)
        }
    })
    
    // const handleChange = e => 
    //     setFormData({ ...formData, [e.target.name]: e.target.value })
        
    // redirects if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Login</h1>
            <p className="lead"><i className="fas fa-user"></i> Acessar Conta</p>
            <form className="form-input" onSubmit={formik.handleSubmit} noValidate>
                <div className="my-1">
                    <CssTextField 
                        type="email"
                        label="Email" 
                        name="email"
                        required 
                        fullWidth
                        autoComplete="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        data-test="login-email"
                    />
                </div>
                <div className="my-1">
                    <CssTextField
                        type="password"
                        label="Senha"
                        name="password"
                        minLength="6"
                        required
                        fullWidth
                        autoComplete="current-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        data-test="login-password"
                    />
                </div>
                <input className="btn btn-primary" type="submit"  value="Login" data-test="login-submit" />
            </form>
            <p className="my-1">
                Não tem uma conta? <Link to="/cadastrar" data-test="login-register">Cadastrar</Link>
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
