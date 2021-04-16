const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
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

        res.json(post)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
    try {

        // get posts sorting by most recent first
        const posts = await Post.find().sort({ date: -1 })
        res.json(posts)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
    try {

        // get posts sorting by most recent first
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
router.delete('/:id', auth, async (req, res) => {
    try {

        // get posts sorting by most recent first
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

        res.json(post.comments)
    } catch(err) {
        res.status(500).send('Server error')
    }
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment on a post
// @access  Private
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