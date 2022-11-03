const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { 
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.trace(err);
    res.status(500).json(err);
  }
});

router.get('/blogs/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    const commentData = await Comment.findAll({
      where: {
        blog_id : req.params.id
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ]
    });
  
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render('blogs', {
      ...blog,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.trace(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  const blogData = await Blog.findAll({
    where: {
      user_id: req.session.user_id,
    },
    include: [
      {
        model: User,
        attributes: ['name'],
      },
    ],
  });

  const blogs = blogData.map((blog) => blog.get({ plain: true }));

  res.render('dashboard', {
    blogs,
    logged_in: req.session.logged_in
  });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;


