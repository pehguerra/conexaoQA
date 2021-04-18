import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

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

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { school, degree, fieldofstudy, from, to, current, description } = formData

    const handleChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <Fragment>
            <h1 className="large text-primary">
                <i className="fas fa-graduation-cap text-primary"></i> Adicionar Formação Acadêmica
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Adicione suas formações acadêmicas para turbinar seu perfil
            </p>
            <small>* = campos obrigatórios</small>
            <form className="form" onSubmit={e => {
                e.preventDefault()
                addEducation(formData, history)
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* Escola" name="school" value={school} onChange={e => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Grau" name="degree" value={degree} onChange={e => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Curso" name="fieldofstudy" value={fieldofstudy} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <h4>Início</h4>
                    <input type="date" name="from" value={from} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                        setFormData({ ...formData, current: !current })
                        toggleDisabled(!toDateDisabled)
                        }} /> {' '}Cursando</p>
                </div>
                <div className="form-group">
                    <h4>Até</h4>
                    <input type="date" name="to" value={to} onChange={e => handleChange(e)} disabled={toDateDisabled ? 'disabled' : ''} />
                </div>
                <div className="form-group">
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Descrição da formação"
                        value={description} 
                        onChange={e => handleChange(e)}
                    ></textarea>
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
