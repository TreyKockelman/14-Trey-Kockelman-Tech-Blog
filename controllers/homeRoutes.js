const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    console.log(req.body);
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    console.log(blogData);
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render('homepage', { 
      blogs,
    });
  } catch (err) {
    console.trace(err);
    res.status(500).json(err);
  }
});

module.exports = router;


