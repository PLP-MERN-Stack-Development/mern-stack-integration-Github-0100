const Post = require('../models/Post');
const Category = require('../models/Category');
const slugify = require('slugify');

exports.getPosts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q, category } = req.query;
    const query = {};
    if (q) query.$or = [
      { title: new RegExp(q, 'i') },
      { content: new RegExp(q, 'i') }
    ];
    if (category) query.categories = category;

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('author', 'username')
      .populate('categories')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    res.json({ posts, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username').populate('categories');
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, categories = [] } = req.body;
    const post = new Post({
      title, content,
      slug: slugify(title, { lower: true }),
      author: req.user._id,
      categories
    });
    if (req.file) post.featuredImage = `/uploads/${req.file.filename}`;
    await post.save();
    res.status(201).json(post);
  } catch (err) { next(err); }
};

exports.updatePost = async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.title) updates.slug = slugify(updates.title, { lower: true });
    if (req.file) updates.featuredImage = `/uploads/${req.file.filename}`;
    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!post) return res.status(404).json({ message: 'Not found' });
    res.json(post);
  } catch (err) { next(err); }
};

exports.deletePost = async (req, res, next) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
};
