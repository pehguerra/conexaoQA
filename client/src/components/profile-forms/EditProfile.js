import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    })

    const [displaySocialInputs, toogleSocialInputs] = useState(false)

    useEffect(() => {
        getCurrentProfile()

        setFormData({
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            status: loading || !profile.status ? '' : profile.status,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram,
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const { company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram } = formData

    const handleChange = e => 
        setFormData({ ...formData, [e.target.name]: e.target.value })

    const handleSubmit = e => {
        e.preventDefault()
        createProfile(formData, history, true)
    }

    return (
        <Fragment>
            <h1 className="large text-primary">
                <i className="fas fa-user-circle text-primary"></i> Edite Seu Perfil
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Vamos coletar algumas informações para fazer seu perfil se destacar
            </p>
            <small>* = campos obrigatórios</small>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <div className="form-group">
                    <select name="status" value={status} onChange={e => handleChange(e)}>
                        <option value="0">* Selecione o status profissional</option>
                        <option value="Estudante ou Aprendendo">Estudante ou Aprendendo</option>
                        <option value="QA Junior">QA Junior </option>
                        <option value="QA Pleno">QA Pleno</option>
                        <option value="QA Senior">QA Senior</option>
                        <option value="QAE Junior">QAE Junior </option>
                        <option value="QAE Pleno">QAE Pleno</option>
                        <option value="QAE Senior">QAE Senior</option>
                        <option value="Especialista em QA">Especialista em QA</option>
                        <option value="Gerente de Testes">Gerente de Testes</option>
                        <option value="Instrutor">Instrutor ou Professor</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <small className="form-text">Nos dê uma ideia de onde você está em sua carreira</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Empresa" name="company" value={company} onChange={e => handleChange(e)} />
                    <small className="form-text">Pode ser sua própria empresa ou uma para a qual você trabalha</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Website" name="website" value={website} onChange={e => handleChange(e)} />
                    <small className="form-text">Pode ser o seu próprio site ou de alguma empresa</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Localização" name="location" value={location} onChange={e => handleChange(e)} />
                    <small className="form-text">Cidade e estado (ex. Sorocaba, SP)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Conhecimentos" name="skills" value={skills} onChange={e => handleChange(e)} />
                    <small className="form-text">Use vírgula para separar os valores por favor (ex. Testes de Integração, Automação de Testes, Cypress, Testes Manuais)</small>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Usuário GitHub" name="githubusername" value={githubusername} onChange={e => handleChange(e)} />
                    <small className="form-text">Se você quiser seus exibir seus repositórios mais recentes e um link para o GitHub, inclua seu nome de usuário</small>
                </div>
                <div className="form-group">
                    <textarea placeholder="Uma pequena biografia sobre você" name="bio" value={bio} onChange={e => handleChange(e)}></textarea>
                    <small className="form-text">Conte-nos um pouco sobre você</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toogleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Adicionar Redes Sociais
                    </button>
                    <span>Opcional</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className="form-group social-input">
                        <i className="fab fa-twitter fa-2x"></i>
                        <input type="text" placeholder="Twitter URL" name="twitter" value={twitter} onChange={e => handleChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-facebook fa-2x"></i>
                        <input type="text" placeholder="Facebook URL" name="facebook" value={facebook} onChange={e => handleChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-youtube fa-2x"></i>
                        <input type="text" placeholder="YouTube URL" name="youtube" value={youtube} onChange={e => handleChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-linkedin fa-2x"></i>
                        <input type="text" placeholder="Linkedin URL" name="linkedin" value={linkedin} onChange={e => handleChange(e)} />
                    </div>

                    <div className="form-group social-input">
                        <i className="fab fa-instagram fa-2x"></i>
                        <input type="text" placeholder="Instagram URL" name="instagram" value={instagram} onChange={e => handleChange(e)} />
                    </div>
                </Fragment>}
                <input type="submit" className="btn btn-primary my-1" value="Editar Perfil" />
                <Link className="btn btn-light my-1" to="/dashboard">Dashboard</Link>
            </form>
        </Fragment>
    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = ({ profile }) => ({
    profile
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile))