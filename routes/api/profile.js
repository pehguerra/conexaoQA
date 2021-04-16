const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')
const request = require('request')
const keys = require('../../config/keys')

const Profile = require('../../models/Profile')
const User = require('../../models/User')
const Post = require('../../models/Post')
const { restart } = require('nodemon')

// @route   GET api/profile/me
// @desc    Current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
    try {

        // checks if user has profile
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        
        if(!profile) {
            return res.status(400).json({ errors: [{ msg: 'Não há profile para este usuário' }] })
        }

        res.json(profile)
    } catch(err) {
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

    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body

    // builds profile object
    const profileFields = {}
    profileFields.user = req.user.id
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) {
        profileFields.skills = skills.split(',').map(skill => skill.trim())
    }

    // builds social object
    profileFields.social = {}
    youtube ? profileFields.social.youtube = youtube : profileFields.social.youtube = ''
    twitter ? profileFields.social.twitter = twitter : profileFields.social.twitter = ''
    facebook ? profileFields.social.facebook = facebook : profileFields.social.facebook = ''
    linkedin ? profileFields.social.linkedin = linkedin : profileFields.social.linkedin = ''
    instagram ? profileFields.social.instagram = instagram : profileFields.social.instagram = ''

    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if(profile) {
            //update
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
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
        res.status(500).send('Server error')
    }
})

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar'])

        res.json(profiles)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar'])

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: 'Perfil não encontrado' }] })
        }

        res.json(profile)
    } catch(err) {
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
        // removes user posts
        await Post.deleteMany({ user: req.user_id })

        // removes profile
        await Profile.findOneAndRemove({ user: req.user.id })

        // removes user
        await User.findOneAndRemove({ _id: req.user.id })

        res.json({ msg: 'Usuário removido' })
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put('/experience', [ auth, [
    check('title', 'Posição é obrigatório')
        .not()
        .isEmpty(),
    check('company', 'Empresa é obrigatório')
        .not()
        .isEmpty(),
    check('from', 'Início é obrigatório')
        .not()
        .isEmpty()
] ], async (req, res) => {

    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } = req.body

    // creates new experience
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        
        profile.experience.unshift(newExp)

        await profile.save()

        res.json(profile)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        // gets remove index
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)

        if(removeIndex == -1) {
            return res.status(404).json({ errors: [{ msg: 'Experiência não encontrada' }] })
        }

        // removes _ before id
        profile.experience.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put('/education', [ auth, [
    check('school', 'Escola é obrigatório')
        .not()
        .isEmpty(),
    check('degree', 'Grau é obrigatório')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'Área de estudo é obrigatório')
        .not()
        .isEmpty(),
    check('from', 'Início é obrigatório')
        .not()
        .isEmpty()
] ], async (req, res) => {

    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body

    // creates new experience
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({ user: req.user.id })
        
        profile.education.unshift(newEdu)

        await profile.save()

        res.json(profile)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id })

        // gets remove index
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)

        if(removeIndex == -1) {
            return res.status(404).json({ errors: [{ msg: 'Formação acadêmica não encontrada' }] })
        }

        // removes _ before id
        profile.education.splice(removeIndex, 1)

        await profile.save()

        res.json(profile)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   GET api/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${keys.githubClientId}&client_secret=${keys.githubSecret}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if(error) console.error(error)

            if(response.statusCode === 403) {
                return res.status(403).json({ errors: [{ msg: 'Limite de taxa de uso da API do GitHub excedido. Favor aguardar alguns minutos' }] })
            }

            if(response.statusCode !== 200) {
                return res.status(404).json({ errors: [{ msg: 'Usuário Github não encontrado' }] })
            }

            res.json(JSON.parse(body))
        })
    } catch(err) {
        res.status(500).send('Server error')
    }
})

module.exports = router