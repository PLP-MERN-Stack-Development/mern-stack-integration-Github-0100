const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const postsController = require('../controllers/postsController');
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const validate = (checks) => async (req, res, next) => {
  await Promise.all(checks.map(c => c.run(req)));
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
};

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPost);
router.post('/',
  auth,
  upload.single('featuredImage'),
  validate([ body('title').notEmpty(), body('content').notEmpty() ]),
  postsController.createPost);

router.put('/:id',
  auth,
  upload.single('featuredImage'),
  validate([ body('title').optional(), body('content').optional() ]),
  postsController.updatePost);

router.delete('/:id', auth, postsController.deletePost);

module.exports = router;
