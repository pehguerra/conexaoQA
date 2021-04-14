const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')

// @route   GET api/auth
// @desc    Get Auth User
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-senha')
        res.json(user)
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

// @route   POST api/users
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [
    check('email', 'Por favor inclua um email válido')
        .isEmail(),
    check('senha', 'Senha é obrigatória')
        .exists()
], async (req, res) => {
    
    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, senha } = req.body

    try {
        // see if user exists
        let user = await User.findOne({ email })

        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Credenciais inválidas' }] })
        }

        // compare passwords
        const isMatch = await bcrypt.compare(senha, user.senha)

        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'Credenciais inválidas' }] })
        }

        // generates jwt
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 36000 },
            (err, token) => {
                if(err) throw err
                res.json({ token })
            })
    } catch(err) {
        console.error(err.message)
        res.status(500).send('Server error')
    }
})

module.exports = router