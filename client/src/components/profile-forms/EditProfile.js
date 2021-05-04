import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { createProfile, getCurrentProfile } from '../../actions/profile'
import Grid from '@material-ui/core/Grid'
import { useFormik } from 'formik'
import * as yup from 'yup'

import { CssTextField } from '../layout/CssTextField'
import { CssSelect } from '../layout/CssSelect'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

const validationSchema = yup.object({
    status: yup
        .string()
        .required('Status é obrigatório')
        .oneOf(['Estudante ou Aprendendo', 'QA Junior', 'QA Pleno', 'QA Senior', 'QAE Junior', 'QAE Pleno', 'QAE Senior', 'Especialista em QA', 
            'Gerente de Testes', 'Professor ou Instrutor', 'Outro'], 'Status é obrigatório'),
    website: yup
        .string()
        .url('Digite uma url válida'),
    skills: yup
        .string()
        .required('Conhecimentos é obrigatório'),
    twitter: yup
        .string()
        .url('Digite uma url válida'),
    facebook: yup
        .string()
        .url('Digite uma url válida'),
    linkedin: yup
        .string()
        .url('Digite uma url válida'),
    youtube: yup
        .string()
        .url('Digite uma url válida'),
    instagram: yup
        .string()
        .url('Digite uma url válida'),
    medium: yup
        .string()
        .url('Digite uma url válida'),
})

const EditProfile = ({ profile: { profile, loading }, createProfile, getCurrentProfile, history }) => {   
    const [displaySocialInputs, toogleSocialInputs] = useState(false)

    const formik = useFormik({
        initialValues: {
            status: loading || !profile.status ? '' : profile.status,
            company: loading || !profile.company ? '' : profile.company,
            website: loading || !profile.website ? '' : profile.website,
            location: loading || !profile.location ? '' : profile.location,
            skills: loading || !profile.skills ? '' : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? '' : profile.githubusername,
            bio: loading || !profile.bio ? '' : profile.bio,
            twitter: loading || !profile.social ? '' : profile.social.twitter,
            facebook: loading || !profile.social ? '' : profile.social.facebook,
            linkedin: loading || !profile.social ? '' : profile.social.linkedin,
            youtube: loading || !profile.social ? '' : profile.social.youtube,
            instagram: loading || !profile.social ? '' : profile.social.instagram,
            medium: loading || !profile.social ? '' : profile.social.medium
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            createProfile(values, history, true)
        }
    })

    useEffect(() => {
        getCurrentProfile()
        // eslint-disable-next-line
    }, [])

    return (
        <Fragment>
            <h1 className="large text-primary">
                <i className="fas fa-user-circle text-primary"></i> Edite Seu Perfil
            </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Vamos coletar algumas informações para fazer seu perfil se destacar
            </p>
            <small>* = campos obrigatórios</small>
            <form className="form-input" onSubmit={formik.handleSubmit} noValidate>
                <div className="my-1">
                    <InputLabel 
                        id="status" 
                        required 
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        // helperText={formik.touched.status && formik.errors.status}
                    >Status
                    </InputLabel>
                    <CssSelect
                        labelId="status"
                        name="status"
                        fullWidth
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        error={formik.touched.status && Boolean(formik.errors.status)}
                        // helperText={formik.touched.status && formik.errors.status}
                        data-test="profile-status"
                    >
                        <MenuItem value={'Estudante ou Aprendendo'} data-test="status-0">Estudante ou Aprendendo</MenuItem>
                        <MenuItem value={'QA Junior'} data-test="status-1">QA Júnior</MenuItem>
                        <MenuItem value={'QA Pleno'} data-test="status-2">QA Pleno</MenuItem>
                        <MenuItem value={'QA Senior'} data-test="status-3">QA Sênior</MenuItem>
                        <MenuItem value={'QAE Junior'} data-test="status-4">QAE Júnior</MenuItem>
                        <MenuItem value={'QAE Pleno'} data-test="status-5">QAE Pleno</MenuItem>
                        <MenuItem value={'QAE Senior'} data-test="status-6">QAE Sênior</MenuItem>
                        <MenuItem value={'Especialista em QA'} data-test="status-7">Especialista em QA</MenuItem>
                        <MenuItem value={'Gerente de Testes'} data-test="status-8">Gerente de Testes</MenuItem>
                        <MenuItem value={'Professor ou Instrutor'} data-test="status-9">Professor ou Instrutor</MenuItem>
                        <MenuItem value={'Outro'} data-test="status-10">Outro</MenuItem>
                    </CssSelect>
                    <small className="form-text">Nos dê uma ideia de onde você está em sua carreira</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Empresa" 
                        name="company"
                        fullWidth
                        autoComplete="company"
                        value={formik.values.company}
                        onChange={formik.handleChange}
                        data-test="profile-company"
                    />
                    <small className="form-text">Pode ser sua própria empresa ou uma para a qual você trabalha</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Website" 
                        name="website"
                        fullWidth
                        autoComplete="website"
                        value={formik.values.website}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                        data-test="profile-webSite"
                    />
                    <small className="form-text">Pode ser o seu próprio site ou de alguma empresa</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Localização" 
                        name="location"
                        fullWidth
                        autoComplete="location"
                        value={formik.values.location}
                        onChange={formik.handleChange}
                        data-test="profile-location"
                    />
                    <small className="form-text">Cidade e estado (ex. Sorocaba, SP)</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Conhecimentos" 
                        name="skills"
                        required 
                        fullWidth
                        autoComplete="skills"
                        value={formik.values.skills}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.skills && Boolean(formik.errors.skills)}
                        helperText={formik.touched.skills && formik.errors.skills}
                        data-test="profile-skills"
                    />
                    <small className="form-text">Use vírgula para separar os valores por favor (ex. Testes de Integração, Automação de Testes, Cypress, Testes Manuais)</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Usuário GitHub" 
                        name="githubusername"
                        fullWidth
                        autoComplete="githubusername"
                        value={formik.values.githubusername}
                        onChange={formik.handleChange}
                        data-test="profile-gitHub"
                    />
                    <small className="form-text">Se você quiser seus exibir seus repositórios mais recentes e um link para o GitHub, inclua seu nome de usuário</small>
                </div>
                <div className="my-1">
                    <CssTextField 
                        type="text"
                        label="Uma pequena biografia sobre você" 
                        name="bio"
                        multiline
                        fullWidth
                        autoComplete="bio"
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                        data-test="profile-bio"
                    />
                    <small className="form-text">Conte-nos um pouco sobre você</small>
                </div>

                <div className="my-1">
                    <button onClick={() => toogleSocialInputs(!displaySocialInputs)} type="button" className="btn btn-light" data-test="profile-socials">
                        Adicionar Redes Sociais
                    </button>
                    <span>Opcional</span>
                </div>

                {displaySocialInputs && <Fragment>
                    <div className="my-1 social-input" data-test="profile-allSocials">
                        <Grid container spacing={1} alignItems="flex-end">
                            <Grid item style={{ minWidth: '5%'}}>
                                <i className="fab fa-twitter fa-2x"></i>
                            </Grid>
                            <Grid item style={{ minWidth: '95%'}}>
                                <CssTextField 
                                    type="text"
                                    label="Twitter URL" 
                                    name="twitter"
                                    fullWidth
                                    autoComplete="twitter"
                                    value={formik.values.twitter}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                                    helperText={formik.touched.twitter && formik.errors.twitter}
                                    data-test="profile-twitter"
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
                                    fullWidth
                                    autoComplete="facebook"
                                    value={formik.values.facebook}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.facebook && Boolean(formik.errors.facebook)}
                                    helperText={formik.touched.facebook && formik.errors.facebook}
                                    data-test="profile-facebook"
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
                                    fullWidth
                                    autoComplete="youtube"
                                    value={formik.values.youtube}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.youtube && Boolean(formik.errors.youtube)}
                                    helperText={formik.touched.youtube && formik.errors.youtube}
                                    data-test="profile-youtube"
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
                                    fullWidth
                                    autoComplete="linkedin"
                                    value={formik.values.linkedin}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                                    helperText={formik.touched.linkedin && formik.errors.linkedin}
                                    data-test="profile-linkedin"
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
                                    fullWidth
                                    autoComplete="instagram"
                                    value={formik.values.instagram}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.instagram && Boolean(formik.errors.instagram)}
                                    helperText={formik.touched.instagram && formik.errors.instagram}
                                    data-test="profile-instagram"
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
                                    fullWidth
                                    autoComplete="medium"
                                    value={formik.values.medium}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.medium && Boolean(formik.errors.medium)}
                                    helperText={formik.touched.medium && formik.errors.medium}
                                    data-test="profile-medium"
                                />
                            </Grid>
                        </Grid>
                    </div>
                </Fragment>}
                <input type="submit" className="btn btn-primary" value="Atualizar Perfil" data-test="profile-submit" />
                <Link className="btn btn-light my-1" to="/dashboard" data-test="profile-dashboard">Dashboard</Link>
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