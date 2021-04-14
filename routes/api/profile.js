const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const request = require('request')
const config = require('config')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const { restart } = require('nodemon')

// @route   GET api/profile/me
// @desc    Current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {

        // checks if user has profile
        const profile = await Profile.findOne({ usuario: req.user.id }).populate('usuario', ['nome', 'avatar'])
        
        if(!profile) {
            return res.status(400).json({ errors: [{ msg: 'Não há profile para este usuário' }] })
        }

    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', [ auth, [
    check('status', 'Status é obrigatório')
        .not()
        .isEmpty(),
    check('skills', 'Skills é obrigatória')
        .not()
        .isEmpty()
] ], async (req, res) => {

    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { empresa, website, localizacao, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body

    // builds profile object
    const profileFields = {}
    profileFields.usuario = req.user.id
    if (empresa) profileFields.empresa = empresa
    if (website) profileFields.website = website
    if (localizacao) profileFields.localizacao = localizacao
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    // builds social object
    profileFields.sociais = {}
    if (youtube) profileFields.sociais.youtube = youtube
    if (twitter) profileFields.sociais.twitter = twitter
    if (facebook) profileFields.sociais.facebook = facebook
    if (linkedin) profileFields.sociais.linkedin = linkedin
    if (instagram) profileFields.sociais.instagram = instagram

    try {
        let profile = await Profile.findOne({ usuario: req.user.id })

        if(profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                { usuario: req.user.id }, 
                { $set: profileFields },
                { new: true }
            )

            return res.json(profile)
        }

        // create
        profile = new Profile(profileFields)

        await profile.save()
        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('usuario', ['nome', 'avatar'])

        res.json(profiles)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ usuario: req.params.user_id }).populate('usuario', ['nome', 'avatar'])

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: 'Perfil não encontrado' }] })
        }

        res.json(profile)
    } catch(err) {
        console.error(err.message)
        if(err.kind == 'ObjectId') {
            return res.status(400).json({ errors: [{ msg: 'Perfil não encontrado' }] })
        }
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/profile
// @desc    Delete profile, user & posts
// @access  Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove users posts

        // removes profile
        await Profile.findOneAndRemove({ usuario: req.user.id })

        // removes user
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: 'Usuário removido' })
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [ auth, [
    check('posicao', 'Posição é obrigatório')
        .not()
        .isEmpty(),
    check('empresa', 'Empresa é obrigatório')
        .not()
        .isEmpty(),
    check('inicio', 'Início é obrigatório')
        .not()
        .isEmpty()
] ], async (req, res) => {

    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { posicao, empresa, localizacao, inicio, fim, atual, descricao } = req.body

    // creates new experience
    const newExp = {
        posicao,
        empresa,
        localizacao,
        inicio,
        fim,
        atual,
        descricao
    }

    try {
        const profile = await Profile.findOne({ usuario: req.user.id })
        
        profile.experiencias.unshift(newExp)

        await profile.save()

        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ usuario: req.user.id })

        // gets remove index
        const removeIndex = profile.experiencias.map(item => item.id).indexOf(req.params.exp_id)

        if(removeIndex == -1) {
            return res.status(404).json({ errors: [{ msg: 'Experiência não encontrada' }] })
        }

        // removes _ before id
        profile.experiencias.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [ auth, [
    check('escola', 'Escola é obrigatório')
        .not()
        .isEmpty(),
    check('grau', 'Grau é obrigatório')
        .not()
        .isEmpty(),
    check('areaestudo', 'Área de estudo é obrigatório')
        .not()
        .isEmpty(),
    check('inicio', 'Início é obrigatório')
        .not()
        .isEmpty()
] ], async (req, res) => {

    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { escola, grau, areaestudo, inicio, fim, atual, descricao } = req.body

    // creates new experience
    const newEdu = {
        escola,
        grau,
        areaestudo,
        inicio,
        fim,
        atual,
        descricao
    }

    try {
        const profile = await Profile.findOne({ usuario: req.user.id })
        
        profile.formacaoAcademica.unshift(newEdu)

        await profile.save()

        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ usuario: req.user.id })

        // gets remove index
        const removeIndex = profile.formacaoAcademica.map(item => item.id).indexOf(req.params.edu_id)

        if(removeIndex == -1) {
            return res.status(404).json({ errors: [{ msg: 'Formação acadêmica não encontrada' }] })
        }

        // removes _ before id
        profile.formacaoAcademica.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if(error) console.error(error)

            if(response.statusCode !== 200) {
                return res.status(404).json({ errors: [{ msg: 'Usuário Github não encontrado' }] })
            }

            res.json(JSON.parse(body))
        })
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router