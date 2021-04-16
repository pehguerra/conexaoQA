import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    })

    const [toDateDisabled, toggleDisabled] = useState(false)

    const { company, title, location, from, to, current, description } = formData

    const handleChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    return (
        <Fragment>
            <h1 className="large text-primary">
                <i className="fab fa-black-tie text-primary"></i> Adicionar Experiência Profissional
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Adicione suas experiências profissionais que você já teve no passado ou está no momento
            </p>
            <small>* = campos obrigatórios</small>
            <form className="form" onSubmit={e => {
                e.preventDefault()
                addExperience(formData, history)
            }}>
                <div className="form-group">
                    <input type="text" placeholder="* Posição" name="title" value={title} onChange={e => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Empresa" name="company" value={company} onChange={e => handleChange(e)} required />
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Localização" name="location" value={location} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <h4>Início</h4>
                    <input type="date" name="from" value={from} onChange={e => handleChange(e)} />
                </div>
                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {
                        setFormData({ ...formData, current: !current })
                        toggleDisabled(!toDateDisabled)
                        }} /> {' '}Emprego Atual</p>
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
                        placeholder="Descrição do trabalho"
                        value={description} 
                        onChange={e => handleChange(e)}
                    ></textarea>
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
