import React from 'react'
import { Link } from 'react-router-dom'

const DashboardActions = () => {
    return (
        <div className="dash-buttons">
        <Link to="/editar-perfil" className="btn btn-light" data-test="dashboard-editProfile">
          <i className="fas fa-user-circle text-primary"></i> Editar Perfil</Link>
        <Link to="/adicionar-experiencia" className="btn btn-light" data-test="dashboard-addExperience">
          <i className="fab fa-black-tie text-primary"></i> Adicionar Experiência</Link>
        <Link to="/adicionar-formacao" className="btn btn-light">
          <i className="fas fa-graduation-cap text-primary" data-test="dashboard-addEducation"></i> Adicionar Formação Acadêmica</Link>
      </div>
    )
}

export default DashboardActions
