import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import Grid from '@material-ui/core/Grid'

import { CssTextField } from '../layout/CssTextField'

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
        instagram: '',
        medium: ''
    })
    
    const { company, website, location, status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram, medium } = formData
    
    const [displaySocialInputs, toogleSocialInputs] = useState(false)

    const [errors, setErrors] = useState({})
    const [hasError, setHasError] = useState(false)
    const [statusTouched, setStatusTouched] = useState(false)
    const [skillsTouched, setSkillsTouched] = useState(false)
    const [locationTouched, setLocationTouched] = useState(false)
    const [twitterTouched, setTwitterTouched] = useState(false)
    const [facebookTouched, setFacebookTouched] = useState(false)
    const [linkedinTouched, setLinkedinTouched] = useState(false)
    const [youtubeTouched, setYoutubeTouched] = useState(false)
    const [instagramTouched, setInstagramTouched] = useState(false)
    const [mediumTouched, setMediumTouched] = useState(false)

    const URL_REGEX = /^((ftp|http|https):\/\/)?([A-z]+)\.([A-z]{2,})/

    const validate = (e) => {
        if (e.key === 'Tab') {
            return
        }

        if (e.target.name === 'status') {
            setStatusTouched(true)
        } else if (e.target.name === 'skills') {
            setSkillsTouched(true)
        } else if (e.target.name === 'location') {
            setLocationTouched(true)
        } else if (e.target.name === 'twitter') {
            setTwitterTouched(true)
        } else if (e.target.name === 'facebook') {
            setFacebookTouched(true)
        } else if (e.target.name === 'linkedin') {
            setLinkedinTouched(true)
        } else if (e.target.name === 'youtube') {
            setYoutubeTouched(true)
        } else if (e.target.name === 'instagram') {
            setInstagramTouched(true)
        } else if (e.target.name === 'medium') {
            setMediumTouched(true)
        }

        let errors = {}

        if (status === '') {
            errors.status = 'Campo obrigatório'
        } else {
            errors.status = ''
        }

        if (skills === '') {
            errors.skills = 'Campo obrigatório'
        } else {
            errors.skills = ''
        }

        if (!(/^.*[,].*$/).test(location) && location !== '') {
            errors.location = 'Digita a cidade e o estado separados por vírgula'
        } else {
            errors.location = ''
        }

        if (!(URL_REGEX).test(twitter) && twitter !== '') {
            errors.twitter = 'URL inválida'
        } else {
            errors.twitter = ''
        }

        if (!(URL_REGEX).test(facebook) && facebook !== '') {
            errors.facebook = 'URL inválida'
        } else {
            errors.facebook = ''
        }

        if (!(URL_REGEX).test(youtube) && youtube !== '') {
            errors.youtube = 'URL inválida'
        } else {
            errors.youtube = ''
        }

        if (!(URL_REGEX).test(linkedin) && linkedin !== '') {
            errors.linkedin = 'URL inválida'
        } else {
            errors.linkedin = ''
        }

        if (!(URL_REGEX).test(instagram) && instagram !== '') {
            errors.instagram = 'URL inválida'
        } else {
            errors.instagram = ''
        }

        if (!(URL_REGEX).test(medium) && medium !== '') {
            errors.medium = 'URL inválida'
        } else {
            errors.medium = ''
        }

        errors.status === '' && errors.skills === '' && errors.location === '' && errors.twitter === '' 
        && errors.facebook === '' && errors.youtube === '' && errors.linkedin === '' && errors.instagram === ''
        && errors.medium === '' ? setHasError(false) : setHasError(true)

        setErrors({ ...errors})
    }

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
            medium: loading || !profile.social ? '' : profile.social.medium
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


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
            <form className="form-input" onSubmit={e => handleSubmit(e)} noValidate>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Status" 
                        name="status"
                        value={status}
                        onChange={e => handleChange(e)}
                        fullWidth
                        autoComplete="status"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.status && statusTouched && { error: true, helperText: errors.status })}
                    />
                    <small className="form-text">Nos dê uma ideia de onde você está em sua carreira</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Empresa" 
                        name="company"
                        value={company}
                        onChange={e => handleChange(e)}
                        fullWidth
                        autoComplete="company"
                    />
                    <small className="form-text">Pode ser sua própria empresa ou uma para a qual você trabalha</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Website" 
                        name="website"
                        value={website}
                        onChange={e => handleChange(e)}
                        fullWidth
                        autoComplete="website"
                    />
                    <small className="form-text">Pode ser o seu próprio site ou de alguma empresa</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Localização" 
                        name="location"
                        value={location}
                        onChange={e => handleChange(e)}
                        fullWidth
                        autoComplete="location"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.location && locationTouched && { error: true, helperText: errors.location })}
                    />
                    <small className="form-text">Cidade e estado (ex. Sorocaba, SP)</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Conhecimentos" 
                        name="skills"
                        value={skills}
                        onChange={e => handleChange(e)}
                        required 
                        fullWidth
                        autoComplete="skills"
                        onBlur={e => validate(e)}
                        onKeyUp={e => validate(e) }
                        {...(errors?.skills && skillsTouched && { error: true, helperText: errors.skills })}
                    />
                    <small className="form-text">Use vírgula para separar os valores por favor (ex. Testes de Integração, Automação de Testes, Cypress, Testes Manuais)</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Usuário GitHub" 
                        name="githubusername"
                        value={githubusername}
                        onChange={e => handleChange(e)}
                        fullWidth
                        autoComplete="githubusername"
                    />
                    <small className="form-text">Se você quiser seus exibir seus repositórios mais recentes e um link para o GitHub, inclua seu nome de usuário</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Uma pequena biografia sobre você" 
                        name="bio"
                        value={bio}
                        onChange={e => handleChange(e)}
                        multiline
                        fullWidth
                        autoComplete="bio"
                    />
                    <small className="form-text">Conte-nos um pouco sobre você</small>
                </div>

                <div className="my-2">
                    <button onClick={() => toogleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                        Adicionar Redes Sociais
                    </button>
                    <span>Opcional</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className="my-1 social-input">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item style={{ minWidth: '5%'}}>
                                <i className="fab fa-twitter fa-2x"></i>
                            </Grid>
                            <Grid item style={{ minWidth: '95%'}}>
                                <CssTextField 
                                    type="text"
                                    label="Twitter URL" 
                                    name="twitter"
                                    value={twitter}
                                    onChange={e => handleChange(e)}
                                    fullWidth
                                    autoComplete="twitter"
                                    onBlur={e => validate(e)}
                                    onKeyUp={e => validate(e) }
                                    {...(errors?.twitter && twitterTouched && { error: true, helperText: errors.twitter })}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className="my-1 social-input">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item style={{ minWidth: '5%'}}>
                                <i className="fab fa-facebook fa-2x"></i>
                            </Grid>
                            <Grid item style={{ minWidth: '95%'}}>
                                <CssTextField 
                                    type="text"
                                    label="Facebook URL" 
                                    name="facebook"
                                    value={facebook}
                                    onChange={e => handleChange(e)}
                                    fullWidth
                                    autoComplete="facebook"
                                    onBlur={e => validate(e)}
                                    onKeyUp={e => validate(e) }
                                    {...(errors?.facebook && facebookTouched && { error: true, helperText: errors.facebook })}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className="my-1 social-input">
                    <Grid container spacing={1} alignItems="flex-end">
                        <Grid item style={{ minWidth: '5%'}}>
                                <i className="fab fa-youtube fa-2x"></i>
                            </Grid>
                            <Grid item style={{ minWidth: '95%'}}>
                                <CssTextField 
                                    type="text"
                                    label="YouTube URL" 
                                    name="youtube"
                                    value={youtube}
                                    onChange={e => handleChange(e)}
                                    fullWidth
                                    autoComplete="youtube"
                                    onBlur={e => validate(e)}
                                    onKeyUp={e => validate(e) }
                                    {...(errors?.youtube && youtubeTouched && { error: true, helperText: errors.youtube })}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className="my-1 social-input">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item style={{ minWidth: '5%'}}>
                                <i className="fab fa-linkedin fa-2x"></i>
                            </Grid>
                            <Grid item style={{ minWidth: '95%'}}>
                                <CssTextField 
                                    type="text"
                                    label="Linkedin URL" 
                                    name="linkedin"
                                    value={linkedin}
                                    onChange={e => handleChange(e)}
                                    fullWidth
                                    autoComplete="linkedin"
                                    onBlur={e => validate(e)}
                                    onKeyUp={e => validate(e) }
                                    {...(errors?.linkedin && linkedinTouched && { error: true, helperText: errors.linkedin })}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className="my-1 social-input">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item style={{ minWidth: '5%'}}>
                                <i className="fab fa-instagram fa-2x"></i>
                            </Grid>
                            <Grid item style={{ minWidth: '95%'}}>
                                <CssTextField 
                                    type="text"
                                    label="Instagram URL" 
                                    name="instagram"
                                    value={instagram}
                                    onChange={e => handleChange(e)}
                                    fullWidth
                                    autoComplete="instagram"
                                    onBlur={e => validate(e)}
                                    onKeyUp={e => validate(e) }
                                    {...(errors?.instagram && instagramTouched && { error: true, helperText: errors.instagram })}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <div className="my-1 social-input">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item style={{ minWidth: '5%'}}>
                                <i className="fab fa-medium fa-2x"></i>
                            </Grid>
                            <Grid item style={{ minWidth: '95%'}}>
                                <CssTextField 
                                    type="text"
                                    label="Medium URL" 
                                    name="medium"
                                    value={medium}
                                    onChange={e => handleChange(e)}
                                    fullWidth
                                    autoComplete="medium"
                                    onBlur={e => validate(e)}
                                    onKeyUp={e => validate(e) }
                                    {...(errors?.medium && mediumTouched && { error: true, helperText: errors.medium })}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Fragment>}
                <input 
                    type="submit" 
                    value="Editar Perfil" 
                    className={hasError ? 'btn-disabled' : 'btn btn-primary my-1'} 
                    {...(hasError && { disabled: true })} 
                />
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