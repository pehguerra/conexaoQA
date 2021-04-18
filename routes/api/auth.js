/**
 * @swagger
 *  components:
 *    schemas:
 *      AuthResponse:
 *        type: object
 *        required:
 *          - _id:
 *          - name
 *          - email
 *          - password
 *          - date
 *        properties:
 *          _id:
 *            type: integer
 *            description: ID gerado automaticamente do usuário
 *          name:
 *            type: string
 *            description: Nome completo do QA
 *          email:
 *            type: string
 *            description: Email do usuário
 *          password:
 *            type: string
 *            description: Senha de acesso criptografada do usuário
 *          avatar:
 *            type: string
 *            format: url
 *            description: Imagem do usuário. URL do Gravatar gerada automaticamente com base no email da pessoa
 *          date:
 *            type: string
 *            format: date
 *            description: Data gerada automaticamente com a data de criação do usuário
 *        example:
 *           _id: 609688tr7bc7fp32c8c014db
 *           name: Test User
 *           email: testuser@test.com
 *           avatar: //www.gravatar.com/avatar/p17f2485e95e6bae54932a61baf60b97?s=200&r=pg&d=mm
 *           date: 2021-04-15T00:28:58.416Z
 *      ErrorResponse:
 *        type: object
 *        required:
 *          - errors
 *        properties:
 *          errors:
 *            type: array
 *            description: Array de objetos com mensagens de erro que retornaram da aplicação
 *            items: 
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  description: Mensagem de erro retornada da API
 *        example:
 *          errors: [msg: Mensagem de erro]
 *      LoginBody:
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
 *      LoginResponse:
 *        type: object
 *        required:
 *          - jwt
 *        properties:
 *          jwt:
 *            type: string
 *            description: Token válido do usuário
 *        example:
 *          jwt: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjA3Nzg4Y2E3YmM3YmYzZmM4YzA0NWRiIn0sImlhdCI6MTYxODc2OTEwNSwiZXhwIjoxNjE4NzcyNzA1fQ.CgO0TK4cTT3fX_JgM776dznXHJd4nmO_A37RncBGQvU
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
 *  description: Login de usuários
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
 *               $ref: '#/components/schemas/AuthResponse'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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
 *             $ref: '#/components/schemas/LoginBody'
 *     responses:
 *       "200":
 *         description: Token válido do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *       "400":
 *         description: O body enviado não contém todas as chaves
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       "401":
 *         description: Usuário ou senha incorretos/inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
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