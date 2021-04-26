import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { setAlert } from '../../actions/alert'
import { register } from '../../actions/auth'
import PropTypes from 'prop-types'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { CssTextField } from '../layout/CssTextField'

const validationSchema = yup.object({
    name: yup
        .string('Digite seu nome')
        .required('Email é obrigatório'),
    email: yup
        .string('Digite seu email')
        .email('Digite um email válido')
        .required('Email é obrigatório'),
    password: yup
        .string('Digite sua senha')
        .min(6, 'A senha deve conter no mínimo 6 caracteres')
        .required('Senha é obrigatória'),
    password2: yup
        .string('Confirme a senha digitada')
        .min(6, 'A senha deve conter no mínimo 6 caracteres')
        .required('Confirmar senha é obrigatória')
        .oneOf([yup.ref("password")], "Senhas precisam ser idênticas")
})

const Register = ({ register, isAuthenticated }) => {
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            password2: ''
        },
        validationSchema: validationSchema,
        onSubmit: ({ name, email, password }) => {
            register({ name, email, password })
        }
    })

    // redirects if logged in
    if(isAuthenticated) {
        return <Redirect to="/dashboard" />
    }
        
    return (
        <Fragment>
            <h1 className="large text-primary">Cadastrar</h1>
            <p className="lead"><i className="fas fa-user"></i> Criar Sua Conta</p>
            <form className="form-input" onSubmit={formik.handleSubmit} noValidate>
                <div className="my-1">
                    <CssTextField
                        type="text" 
                        label="Nome"
                        name="name" 
                        required
                        fullWidth
                        autoComplete="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        data-test="register-name"
                    />
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="email" 
                        label="Email" 
                        name="email"
                        required
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        data-test="register-email"
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
                        minLength="6"
                        required
                        fullWidth
                        autoComplete="new-password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        data-test="register-password"
                    />
                </div>
                <div className="my-1">
                    <CssTextField
                        type="password"
                        label="Confirmar Senha"
                        name="password2"
                        minLength="6"
                        required
                        fullWidth
                        value={formik.values.password2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password2 && Boolean(formik.errors.password2)}
                        helperText={formik.touched.password2 && formik.errors.password2}
                        data-test="register-password2"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Cadastrar" data-test="register-submit" />
            </form>
            <p className="my-1">
                Já tem uma conta? <Link to="/login" data-test="register-login">Login</Link>
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
