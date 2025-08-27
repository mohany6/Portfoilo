const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  shortDescription: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  githubUrl: {
    type: String,
    validate: {
      validator: function(v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: 'Please enter a valid URL'
    }
  },
  screenshots: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['image', 'gif'],
      required: true
    }
  }],
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['active', 'archived', 'draft'],
    default: 'active'
  }
}, {
  timestamps: true
});

// Index for efficient querying
projectSchema.index({ featured: -1, order: 1, createdAt: -1 });

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
