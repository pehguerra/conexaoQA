/**
 * @swagger
 *  components:
 *    schemas:
 *      Response - Post:
 *        type: object
 *        properties:
 *          _id:
 *            type: string
 *            description: ID do comentário gerado automaticamente
 *          text:
 *            type: string
 *            description: Texto postado
 *          name:
 *            type: string
 *            description: Nome do usuário
 *          avatar:
 *            type: string
 *            description: Imagem de perfil do usuário. URL do Gravatar
 *          user:
 *            type: string
 *            description: ID do usuário que fez o post
 *          likes:
 *            type: array
 *            description: Usuários que curtiram o post
 *            items:
 *              properties:
 *                _id:
 *                  type: string
 *                  description: ID do like gerado automaticamente
 *                user:
 *                  type: string
 *                  description: ID do usuário que curtiu o post
 *          comments:
 *            type: array
 *            description: Comentários do post
 *            items: 
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                  description: ID do comentário gerado automaticamente
 *                text:
 *                  type: string
 *                  description: Texto do comentário
 *                name:
 *                  type: string
 *                  description: Nome do usuário
 *                avatar:
 *                  type: string
 *                  description: Imagem de perfil do usuário. URL do Gravatar
 *                user:
 *                  type: string
 *                  description: ID do usuário que curtiu o post
 *                date:
 *                  type: string
 *                  format: date
 *                  description: Data gerada automaticamente com a data que o comentário foi realizado
 *          date:
 *            type: string
 *            format: date
 *            description: Data gerada automaticamente com a data que o post foi realizado
 *      Response - Posts:
 *        type: array
 *        description: Array com todos os posts
 *        items:
 *          properties:
 *            _id:
 *              type: string
 *              description: ID do comentário gerado automaticamente
 *            text:
 *              type: string
 *              description: Texto postado
 *            name:
 *              type: string
 *              description: Nome do usuário
 *            avatar:
 *              type: string
 *              description: Imagem de perfil do usuário. URL do Gravatar
 *            user:
 *              type: string
 *              description: ID do usuário que fez o post
 *            likes:
 *              type: array
 *              description: Usuários que curtiram o post
 *              items:
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: ID do like gerado automaticamente
 *                  user:
 *                    type: string
 *                    description: ID do usuário que curtiu o post
 *            comments:
 *              type: array
 *              description: Comentários do post
 *              items: 
 *                type: object
 *                properties:
 *                  _id:
 *                    type: string
 *                    description: ID do comentário gerado automaticamente
 *                  text:
 *                    type: string
 *                    description: Texto do comentário
 *                  name:
 *                    type: string
 *                    description: Nome do usuário
 *                  avatar:
 *                    type: string
 *                    description: Imagem de perfil do usuário. URL do Gravatar
 *                  user:
 *                    type: string
 *                    description: ID do usuário que curtiu o post
 *                  date:
 *                    type: string
 *                    format: date
 *                    description: Data gerada automaticamente com a data que o comentário foi realizado
 *            date:
 *              type: string
 *              format: date
 *              description: Data gerada automaticamente com a data que o post foi realizado
 *      Body - Post:
 *        type: object
 *        required:
 *          - text
 *        properties:
 *          text:
 *            type: string
 *            description: Texto a ser postado   
 *      Reponse - Likes:
 *        type: array
 *        description: Likes
 *        items:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              description: ID do like
 *            user:
 *              type: string
 *              description: ID do usuário que curtiu o post
 *      Response - Comments:
 *        type: array
 *        description: Comentários do post
 *        items:
 *          type: object
 *          properties:
 *            _id:
 *              type: string
 *              description: ID do comentário gerado automaticamente
 *            text:
 *              type: string
 *              description: Texto do comentário
 *            name:
 *              type: string
 *              description: Nome do usuário
 *            avatar:
 *              type: string
 *              description: Imagem de perfil do usuário. URL do Gravatar
 *            user:
 *              type: string
 *              description: ID do usuário que curtiu o post
 *            date:
 *              type: string
 *              format: date
 *              description: Data gerada automaticamente com a data que o comentário foi realizado
 */

const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

/**
 * @swagger
 * tags:
 *  name: Posts
 *  description: Posts
 */

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Selecionar todos os posts
 *     description: Seleciona todos os posts. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *     responses:
 *       "200":
 *         description: Todos os posts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Posts'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.get('/', auth, async (req, res) => {
    try {

        // get posts sorting by most recent first
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   POST api/posts
// @desc    Create a post
// @access  Private
/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: Criar um post
 *     description: Cria um post para o usuário com o token informado no header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *     requestBody:
 *       description: Texto que será postado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Body - Post'
 *     responses:
 *       "201":
 *         description: Post criado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Post'
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
 *      
 */
router.post('/', [ auth, [
    check('text', 'Texto é obrigatório')
        .not()
        .isEmpty()
] ], async (req, res) => {

    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        // gets user info
        const user = await User.findById(req.user.id).select('-password')
    
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save()

        res.status(201).json(post)
    } catch(err) {
        res.status(500).send('Server error')
    }
})


// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
/**
 * @swagger
 * /api/posts/{postId}:
 *   get:
 *     summary: Selecionar post pelo ID
 *     description: Seleciona o post pelo ID. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       "200":
 *         description: Post selecionado pelo ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Post'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.get('/:id', auth, async (req, res) => {
    try {

        // get posts
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
        }

        res.json(post)
    } catch(err) {
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
        }
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Private
/**
 * @swagger
 * /api/posts/{postId}:
 *   delete:
 *     summary: Deletar post pelo ID
 *     description: Deleta o post pelo ID. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       "200":
 *         description: Post excluído
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Delete Entity'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "404":
 *         description: Post não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.delete('/:id', auth, async (req, res) => {
    try {

        // get posts sorting
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
        }

        // checks user
        if(post.user.toString() !== req.user.id) {
            return res.status(403).json({ errors: [{ msg: 'Usuário não autorizado' }] })
        }

        await post.remove()

        res.json({ msg: 'Post removido' })
    } catch(err) {
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
        }
        res.status(500).send('Server error')
    }
})

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
/**
 * @swagger
 * /api/posts/like/{postId}:
 *   put:
 *     summary: Curtir um post
 *     description: Curte um post com o usuário informado no token do header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       "200":
 *         description: Post curtido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reponse - Likes'
 *       "400":
 *         description: Post já curtido
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
 *       "404":
 *         description: Post não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
        }

        // checks if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ errors: [{ msg: 'Você já curtiu este post' }] })
        }

        post.likes.unshift({ user: req.user.id })

        await post.save()

        res.json(post.likes)
    } catch(err) {
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
        }
        res.status(500).send('Server error')
    }
})

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
/**
 * @swagger
 * /api/posts/unlike/{postId}:
 *   put:
 *     summary: Descurtir um post
 *     description: Descurte um post com o usuário informado no token do header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *     responses:
 *       "200":
 *         description: Post descurtido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reponse - Likes'
 *       "400":
 *         description: Post não curtido
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
 *       "404":
 *         description: Post não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
        }

        // checks if the post has already been liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ errors: [{ msg: 'Você não curtiu este post' }] })
        }

        // gets remove index
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id)

        post.likes.splice(removeIndex, 1)

        await post.save()

        res.json(post.likes)
    } catch(err) {
        if(err.kind == 'ObjectId') {
            return res.status(404).json({ errors: [{ msg: 'Post não encontrado' }] })
        }
        res.status(500).send('Server error')
    }
})

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
/**
 * @swagger
 * /api/posts/comment/{postId}:
 *   post:
 *     summary: Criar um comentário
 *     description: Cria um comentário no post informado no path parameter com o usuário informado no token do header. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       description: Texto que será comentado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Body - Post'
 *     responses:
 *       "201":
 *         description: Todos os comentários do post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Comments'
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
 *       "404":
 *         description: Post/Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.post('/comment/:id', [ auth, [
    check('text', 'Texto é obrigatório')
        .not()
        .isEmpty()
] ], async (req, res) => {

    // validates request body
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {

        // gets user and post info
        const user = await User.findById(req.user.id).select('-password')
        const post = await Post.findById(req.params.id)
    
        const newCommand = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        }

        post.comments.unshift(newCommand)

        await post.save()

        res.status(201).json(post.comments)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment on a post
// @access  Private
/**
 * @swagger
 * /api/posts/comment/{postId}/{commentId}:
 *   delete:
 *     summary: Deletar comentário pelo ID
 *     description: Deleta o comentário do usuário pelo ID no post informado no ID. Pegar o token no serviço -> *Auth - [POST] /api/auth*
 *     tags: [Posts]
 *     parameters:
 *       - in: header
 *         name: x-auth-token
 *         schema:
 *           type: string
 *         required: true
 *         description: Token do usuário
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do post
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do comentário
 *     responses:
 *       "200":
 *         description: Todos os comentários do post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Comments'
 *       "401":
 *         description: O token informado não é válido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 *       "404":
 *         description: Post/Comentário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response - Error'
 */
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
    
        // pull out comment
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        // checks comment exists
        if(!comment) {
            return res.status(404).json({ errors: [{ msg: 'Comentário não encontrado' }] })
        }

        // checks user
        if(comment.user.toString() !== req.user.id) {
            return res.status(403).json({ errors: [{ msg: 'Usuário não autorizado' }] })
        }

         // gets remove index
         const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

         post.comments.splice(removeIndex, 1)
 
         await post.save()
 
         res.json(post.comments)
    } catch (err) {
        res.status(500).send('Server error')
    }
})

module.exports = router