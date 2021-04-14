const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    texto: {
        type: String,
        required: true
    },
    nome: {
        type: String
    },
    avatar: {
        type: String
    },
    likes: [
        {
            usuario: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comentarios: [
        {
            usuario: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user'
            },
            texto: {
                type: String,
                required: true
            },
            nome: {
                type: String
            },
            avatar: {
                type: String
            },
            data: {
                type: Date,
                default: Date.now
            }
        }
    ],
    data: {
        type: Date,
        default: Date.now
    }
})

module.exports = Post = mongoose.model('post', PostSchema)