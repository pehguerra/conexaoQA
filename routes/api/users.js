/**
 * @swagger
 *  components:
 *    schemas:
 *      Body - Register:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *            description: Nome completo do usuário
 *          email:
 *            type: string
 *            description: Email do usuário
 *          password:
 *            type: string
 *            description: Senha de acesso criptografada do usuário
 */
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

const User = require('../../models/User')

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: Cadastrar usuários
 */

// @route   POST api/users
// @desc    Register user
// @access  Public
/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Cadastrar usuário
 *     description: Cadastra um novo usuário na aplicação
 *     tags: [Users]
 *     requestBody:
 *       description: Informadar *nome*, *email* e *password*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Body - Register'
 *     responses:
 *       "201":
 *         description: Cadastra o usuario e retorna o token válido
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
 */
router.post('/', [
    check('name', 'Name é obrigatório')
        .not()
        .isEmpty(),
    check('email', 'Por favor inclua um email válido')
        .isEmail(),
    check('password', 'Por favor entre com uma senha de 6 caracteres ou mais')
        .isLength({ min: 6 })
], async (req, res) => {
    
    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
        // see if user exists
        let user = await User.findOne({ email })

        if(user) {
            return res.status(400).json({ errors: [{ msg: 'Usuário já registrado' }] })
        }

        // get users gravatar
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        // create user
        user = new User({
            name,
            email,
            avatar,
            password
        })
    
        // encrypt the password
        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)

        // saves user
        await user.save()

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
                res.status(201).json({ jwt: token })
            })
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router