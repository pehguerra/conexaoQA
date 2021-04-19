import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField';

const CssTextField = withStyles({
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
    },
})(TextField)

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData

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
            <form action="create-profile.html" onSubmit={e => handleSubmit(e)}>
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
                        error={email === ""}
                        helperText={email === "" ? 'Campo obrigatório' : ''}
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
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Entrar" />
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
