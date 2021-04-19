/**
 * @swagger
 *  components:
 *    schemas:
 *      Response - Auth:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *            description: ID gerado automaticamente do usuário
 *          name:
 *            type: string
 *            description: Nome completo do QA
 *          email:
 *            type: string
 *            description: Email do usuário
 *          avatar:
 *            type: string
 *            format: url
 *            description: Imagem do usuário. URL do Gravatar gerada automaticamente com base no email da pessoa
 *          date:
 *            type: string
 *            format: date
 *            description: Data gerada automaticamente com a data de criação do usuário
 *      Response - Error:
 *        type: object
 *        properties:
 *          errors:
 *            type: array
 *            description: Objetos com mensagens de erro que retornaram da aplicação
 *            items: 
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  description: Mensagem de erro retornada da API
 *      Body - Login:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            description: Email do usuário
 *          password:
 *            type: string
 *            description: Senha de acesso criptografada do usuário
 *        example:
 *          email: testuser@test.com
 *          password: pass1234
 *      Response - Login:
 *        type: object
 *        properties:
 *          jwt:
 *            type: string
 *            description: Token válido do usuário
 */

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const User = require('../../models/User')

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Login
 */

// @route   GET api/auth
// @desc    Get Auth User
// @access  Private
/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Selecionar o usuário logado
 *     description: Seleciona o usuário logado com base no token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Auth]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *     responses:
 *       "200":
 *         description: Dados do usuário logado, menos a senha
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Auth'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } catch(err) {
        res.status(500).send('Server error')
    }
})


// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Logar na aplicação
 *     description: Loga na aplicação por meio de login e senha
 *     tags: [Auth]
 *     requestBody:
 *       description: Informadar *email* e *password*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Body - Login'
 *     responses:
 *       "200":
 *         description: Token válido do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Login'
 *       "400":
 *         description: O body enviado não contém todas as chaves obrigatórias
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "401":
 *         description: Credenciais inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.post('/', [
    check('email', 'Por favor inclua um email válido')
        .isEmail(),
    check('password', 'Senha é obrigatória')
        .exists()
], async (req, res) => {
    
    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
        // see if user exists
        let user = await User.findOne({ email })

        if(!user) {
            return res.status(401).json({ errors: [{ msg: 'Credenciais inválidas' }] })
        }

        // compare passwords
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.status(401).json({ errors: [{ msg: 'Credenciais inválidas' }] })
        }

        // generates jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            keys.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err
                res.json({ jwt: token })
            })
    } catch(err) {
        res.status(500).send('Server error')
    }
})

module.exports = router