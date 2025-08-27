const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 300
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Mohamed Hany'
  },
  tags: [{
    type: String,
    lowercase: true,
    trim: true
  }],
  category: {
    type: String,
    required: true,
    trim: true
  },
  featuredImage: {
    type: String,
    default: ''
  },
  published: {
    type: Boolean,
    default: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
  views: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for efficient querying
blogSchema.index({ published: 1, featured: -1, createdAt: -1 });
blogSchema.index({ tags: 1 });

// Pre-save middleware to generate slug from title if not provided
blogSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }
  next();
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
