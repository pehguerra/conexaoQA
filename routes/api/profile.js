/**
 * @swagger
 *  components:
 *    schemas:
 *      Response - User Profile:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *            description: ID do usuário dono do perfil
 *          company:
 *            type: string
 *            description: Empresa atual
 *          location:
 *            type: string
 *            description: Cidade que está localizada a empresa
 *          status:
 *            type: string
 *            description: Cargo atual
 *          website:
 *            type: string
 *            description: Site pessoal ou da empresa
 *          skills:
 *            type: array
 *            description: Conhecimentos/Habilidades, separados por vírgula
 *            items:
 *              type: string
 *          bio:
 *            type: string
 *            description: Resumo do perfil do usuário
 *          githubusername:
 *            type: string
 *            description: Usuário github
 *          experience:
 *            type: array
 *            description: Experiências profissionais
 *            items: 
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: ID gerado automaticamente da experiência
 *                title:
 *                  type: string
 *                  description: Nome do cargo
 *                company:
 *                  type: string
 *                  description: Empresa
 *                location:
 *                  type: string
 *                  description: Localização
 *                from:
 *                  type: string
 *                  format: date
 *                  description: Data de ínicio
 *                to:
 *                  type: string
 *                  format: date
 *                  description: Data da saída
 *                current:
 *                  type: boolean
 *                  default: false
 *                  description: Cargo atual
 *                description:
 *                  type: string
 *                  description: Descrição das atribuições
 *          education:
 *            type: array
 *            description: Formação acadêmica
 *            items:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: ID gerado automaticamente da formação acadêmica
 *                school:
 *                  type: string
 *                  description: Escola
 *                degree:
 *                  type: string
 *                  description: Grau
 *                fieldofstudy:
 *                  type: string
 *                  description: Curso
 *                from:
 *                  type: string
 *                  format: date
 *                  description: Data de ínicio
 *                to:
 *                  type: string
 *                  format: date
 *                  description: Data da saída
 *                current:
 *                  type: boolean
 *                  default: false
 *                  description: Cargo atual
 *                description:
 *                  type: string
 *                  description: Descrição do curso
 *          social:
 *            type: object
 *            description: Redes sociais
 *            properties:
 *              youtube:
 *                type: string
 *                format: url
 *                description: URL do perfil do Youtube
 *              twitter:
 *                type: string
 *                format: url
 *                description: URL do perfil do Twitter
 *              facebook:
 *                type: string
 *                format: url
 *                description: URL do perfil do Facebook
 *              linkedin:
 *                type: string
 *                format: url
 *                description: URL do perfil do LinkedIn
 *              instagram:
 *                type: string
 *                format: url
 *                description: URL do perfil do Instagram
 *          date:
 *            type: string
 *            format: date
 *            description: Data gerada automaticamente com a data de criação do usuário
 *      Response - Users Profiles:
 *        type: array
 *        description: Todos os perfis
 *        items:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              description: ID do usuário dono do perfil
 *            company:
 *              type: string
 *              description: Empresa atual
 *            location:
 *              type: string
 *              description: Cidade que está localizada a empresa
 *            status:
 *              type: string
 *              description: Cargo atual
 *            website:
 *              type: string
 *              description: Site pessoal ou da empresa
 *            skills:
 *              type: array
 *              description: Conhecimentos/Habilidades, separados por vírgula
 *              items:
 *                type: string
 *            bio:
 *              type: string
 *              description: Resumo do perfil do usuário
 *            githubusername:
 *              type: string
 *              description: Usuário github
 *            experience:
 *              type: array
 *              description: Experiências profissionais
 *              items: 
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: ID gerado automaticamente da experiência
 *                  title:
 *                    type: string
 *                    description: Nome do cargo
 *                  company:
 *                    type: string
 *                    description: Empresa
 *                  location:
 *                    type: string
 *                    description: Localização
 *                  from:
 *                    type: string
 *                    format: date
 *                    description: Data de ínicio
 *                  to:
 *                    type: string
 *                    format: date
 *                    description: Data da saída
 *                  current:
 *                    type: boolean
 *                    default: false
 *                    description: Cargo atual
 *                  description:
 *                    type: string
 *                    description: Descrição das atribuições
 *            education:
 *              type: array
 *              description: Formação acadêmica
 *              items:
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: ID gerado automaticamente da formação acadêmica
 *                  school:
 *                    type: string
 *                    description: Escola
 *                  degree:
 *                    type: string
 *                    description: Grau
 *                  fieldofstudy:
 *                    type: string
 *                    description: Curso
 *                  from:
 *                    type: string
 *                    format: date
 *                    description: Data de ínicio
 *                  to:
 *                    type: string
 *                    format: date
 *                    description: Data da saída
 *                  current:
 *                    type: boolean
 *                    default: false
 *                    description: Cargo atual
 *                  description:
 *                    type: string
 *                    description: Descrição do curso
 *            social:
 *              type: object
 *              description: Redes sociais
 *              properties:
 *                youtube:
 *                  type: string
 *                  format: url
 *                  description: URL do perfil do Youtube
 *                twitter:
 *                  type: string
 *                  format: url
 *                  description: URL do perfil do Twitter
 *                facebook:
 *                  type: string
 *                  format: url
 *                  description: URL do perfil do Facebook
 *                linkedin:
 *                  type: string
 *                  format: url
 *                  description: URL do perfil do LinkedIn
 *                instagram:
 *                  type: string
 *                  format: url
 *                  description: URL do perfil do Instagram
 *            date:
 *              type: string
 *              format: date
 *              description: Data gerada automaticamente com a data de criação do usuário
 *      Body - Profile:
 *        type: object
 *        required:
 *          - status
 *          - skills
 *        properties:
 *          company:
 *            type: string
 *            description: Empresa atual
 *          status:
 *            type: string
 *            description: Cargo atual
 *          location:
 *            type: string
 *            description: Cidade que está localizada a empresa
 *          website:
 *            type: string
 *            description: Site pessoal ou da empresa
 *          skills:
 *            type: array
 *            description: Conhecimentos/Habilidades, separados por vírgula
 *            items:
 *              type: string
 *          bio:
 *            type: string
 *            description: Resumo do perfil do usuário
 *          githubusername:
 *            type: string
 *            description: Usuário github
 *          youtube:
 *            type: string
 *            format: url
 *            description: URL do perfil do Youtube
 *          twitter:
 *            type: string
 *            format: url
 *            description: URL do perfil do Twitter
 *          facebook:
 *            type: string
 *            format: url
 *            description: URL do perfil do Facebook
 *          linkedin:
 *            type: string
 *            format: url
 *            description: URL do perfil do LinkedIn
 *          instagram:
 *            type: string
 *            format: url
 *            description: URL do perfil do Instagram
 *      Response - Delete Profile:
 *        type: object
 *        properties:
 *          msg:
 *            type: string
 *            description: Descrição da mensagem  
 *      Body - Experience:
 *        type: object
 *        required:
 *          - title
 *          - company
 *          - from
 *        properties:
 *          title:
 *            type: string
 *            description: Cargo
 *          company:
 *            type: string
 *            description: Empresa
 *          location:
 *            type: string
 *            description: Localização
 *          from:
 *            type: string
 *            format: date
 *            description: Data de ínicio
 *          to:
 *            type: string
 *            format: date
 *            description: Data da saída
 *          current:
 *            type: boolean
 *            default: false
 *            description: Cargo atual
 *          description:
 *            type: string
 *            description: Descrição das atribuições
 *      Body - Education:
 *        type: object
 *        required:
 *          - school
 *          - degree
 *          - fieldofstudy
 *          - from
 *        properties:
 *          school:
 *            type: string
 *            description: Escola
 *          degree:
 *            type: string
 *            description: Grau
 *          fieldofstudy:
 *            type: string
 *            description: Curso
 *          from:
 *            type: string
 *            format: date
 *            description: Data de ínicio
 *          to:
 *            type: string
 *            format: date
 *            description: Data da saída
 *          current:
 *            type: boolean
 *            default: false
 *            description: Cargo atual
 *          description:
 *            type: string
 *            description: Descrição das atribuições
 */

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

/**
 * @swagger
 * tags:
 *  name: Profile
 *  description: Perfil dos usuários
 */

// @route   GET api/profile/me
// @desc    Current users profile
// @access  Private
/**
 * @swagger
 * /api/profile/me:
 *   get:
 *     summary: Selecionar o perfil do usuário logado
 *     description: Seleciona o perfil do usuário logado com base no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *     responses:
 *       "200":
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - User Profile'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.get('/me', auth, async (req, res) => {
    try {

        // checks if user has profile
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
        
        if(!profile) {
            return res.json({ noProfile: 'Não há profile para este usuário' })
        }

        res.json(profile)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
/**
 * @swagger
 * /api/profile:
 *   post:
 *     summary: Criar/Atualizar perfil
 *     description: Cria ou atualiza um perfil existente para o usuário com base no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *     requestBody:
 *       description: Informações do perfil
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Body - Profile'
 *     responses:
 *       "200":
 *         description: Perfil do usuário atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - User Profile'
 *       "201":
 *         description: Perfil do usuário criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - User Profile'
 *       "400":
 *         description: O body enviado não contém todas as chaves obrigatórias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "401":
 *         description: Usuário ou senha incorretos/inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
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
        res.status(201).json(profile)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Selecionar todos os perfis cadastrados
 *     description: Seleciona todos os perfis cadastrados no banco
 *     tags: [Profile]
 *     responses:
 *       "200":
 *         description: Array com os perfis dos usuários
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Users Profiles'
 */
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
/**
 * @swagger
 * /api/profile/user/{userId}:
 *   get:
 *     summary: Selecionar o perfil do usuário pelo ID
 *     description: Seleciona o perfil do usuário logado com base no ID informado no parâmetro de path
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do usuário cadastrado no banco
 *     responses:
 *       "200":
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - User Profile'
 *       "401":
 *         description: Perfil não encontrado/existe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
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
/**
 * @swagger
 * /api/profile:
 *   delete:
 *     summary: Deletar conta do usuário
 *     description: Deleta o perfil, posts e a conta do usuário com base no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *     responses:
 *       "200":
 *         description: Usuário excluído
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Delete Profile'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
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
/**
 * @swagger
 * /api/profile/experience:
 *   put:
 *     summary: Adicionar experiência profissional
 *     description: Adiciona experiência profissional no perfil com base no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *     requestBody:
 *       description: Informações da experiência profissional
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Body - Experience'
 *     responses:
 *       "200":
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - User Profile'
 *       "400":
 *         description: O body enviado não contém todas as chaves obrigatórias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
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
/**
 * @swagger
 * /api/profile/experience/{expId}:
 *   delete:
 *     summary: Deletar experiência profissional
 *     description: Deleta experiência profissional com base no ID informado no path parameter e no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *       - in: path
 *         name: expId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da experiência profissional
 *     responses:
 *       "200":
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - User Profile'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "404":
 *         description: Experiência não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
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
/**
 * @swagger
 * /api/profile/education:
 *   put:
 *     summary: Adicionar formação acadêmica
 *     description: Adiciona formação acadêmica no perfil com base no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *     requestBody:
 *       description: Informações da formação acadêmica
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Body - Education'
 *     responses:
 *       "200":
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - User Profile'
 *       "400":
 *         description: O body enviado não contém todas as chaves obrigatórias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
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
/**
 * @swagger
 * /api/profile/education/{eduId}:
 *   delete:
 *     summary: Deletar formação acadêmica
 *     description: Deleta formação acadêmica com base no ID informado no path parameter e no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Profile]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *       - in: path
 *         name: eduId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da formação acadêmica
 *     responses:
 *       "200":
 *         description: Perfil do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - User Profile'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "404":
 *         description: Experiência não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
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
/**
 * @swagger
 * /api/profile/github/{gitHubUsername}:
 *   get:
 *     summary: Selecionar repositórios GitHub
 *     description: Seleciona o perfil do usuário logado com base no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: gitHubUsername
 *         schema:
 *           type: string
 *         required: true
 *         description: Usuário GitHub
 *     responses:
 *       "200":
 *         description: Repositórios GitHub
 *       "403":
 *         description: Limite de requests na API do GitHub excedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "404":
 *         description: Usuário GitHub não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${keys.githubClientId}&client_secret=${keys.githubSecret}`,
            method: 'GET',
            headers: { 'user-agent': 'node.js' }
        }

        request(options, (error, response, body) => {
            if(error)  res.status(500).send('Server error')

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