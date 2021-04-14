const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    empresa: {
        type: String
    },
    website: {
        type: String
    },
    localizacao: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experiencias: [
        {
            posicao: {
                type: String,
                required: true
            },
            empresa: {
                type: String,
                required: true
            },
            localizacao: {
                type: String
            },
            inicio: {
                type: Date,
                required: true
            },
            fim: {
                type: Date
            },
            atual: {
                type: Boolean,
                default: false
            },
            descricao: {
                type: String
            }
        }
    ],
    formacaoAcademica: [
        {
            escola: {
                type: String,
                required: true
            },
            grau: {
                type: String,
                required: true
            },
            areaestudo: {
                type: String,
                required: true
            },
            inicio: {
                type: Date,
                required: true
            },
            fim: {
                type: Date
            },
            atual: {
                type: Boolean,
                default: false
            },
            descricao: {
                type: String
            }
        }
    ],
    sociais: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)