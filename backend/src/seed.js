const mongoose = require('mongoose');
const Project = require('./models/project.model');
const Blog = require('./models/blog.model');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://goodm7030:0oeYxNsT7oBHOVmR@cluster0.nlpjq.mongodb.net/Portfolio');
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const sampleProjects = [
  {
    title: "Cinema Booking System",
    description: "A comprehensive movie ticket booking system with seat selection, payment processing, and admin dashboard. Features include real-time seat availability, multiple payment methods, and booking management.",
    shortDescription: "Booking movie tickets online.",
    image: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075106.png",
    technologies: ["Angular", "Node.js", "MongoDB", "Socket.io", "Stripe"],
    githubUrl: "https://github.com/mohany6/cinema-booking",
    screenshots: [
      {
        url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075106.png",
        caption: "Cinema homepage with featured movies and showtimes",
        type: "image"
      },
      {
        url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075044.png",
        caption: "Movie selection and booking interface",
        type: "image"
      },
      {
        url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075038.png",
        caption: "Seat selection and booking confirmation",
        type: "image"
      },
      {
        url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075031.png",
        caption: "Payment processing and booking summary",
        type: "image"
      },
      {
        url: "/assets/screenshots/cinema-booking/Screenshot 2025-08-27 075023.png",
        caption: "Admin dashboard for managing movies and bookings",
        type: "image"
      }
    ],
    featured: true,
    order: 1,
    status: "active"
  },

  {
    title: "Healthcare Management with AI-Powered Diagnostics",
    description: "A comprehensive healthcare management platform specializing in pulmonology with AI-powered medical image analysis and multi-role user management. Built a patient management system for appointment booking, medical history tracking, and prescriptions with real-time notifications. Integrated Python FastAPI-based AI service for chest X-ray & CT scan analysis with 95% confidence accuracy. Implemented JWT authentication with role-based access (Patients, Doctors, Admins) and 2FA. Designed a doctor verification workflow including document upload, ID validation, and license verification. Created a dynamic appointment scheduling system with reminders and conflict prevention. Built an analytics-driven admin dashboard for doctor approval workflows and system monitoring. Applied strong security practices including Helmet.js, CORS, validation, and secure file handling. Business Impact: Reduced manual verification time by 70%, streamlined appointment workflows, and improved diagnostic accuracy.",
    shortDescription: "AI-powered healthcare platform for pulmonology with medical image analysis.",
    image: "/assets/screenshots/healthcare-ai/Home/Home.png",
    technologies: ["Angular", "Node.js", "MongoDB", "Python", "FastAPI", "AI/ML"],
    githubUrl: "https://github.com/mohany6/Healthcare-Management",
    screenshots: [
      // Home/Patient Portal
      {
        url: "/assets/screenshots/healthcare-ai/Home/Home.png",
        caption: "Patient homepage with health dashboard and quick access to services",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/Home/find-doctor.png",
        caption: "Advanced doctor search with specialty and location filters",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/Home/ai.png",
        caption: "AI-powered medical diagnosis and health recommendations",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/Home/doctors-card.png",
        caption: "Doctor profiles with ratings, specialties, and availability",
        type: "image"
      },
      
      // Authentication & Security
      {
        url: "/assets/screenshots/healthcare-ai/auth/login.png",
        caption: "Secure login interface with multi-factor authentication",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/secruty/2fa.png",
        caption: "Two-factor authentication setup for enhanced security",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/secruty/security.png",
        caption: "Security settings and trusted device management",
        type: "image"
      },
      
      // Booking System
      {
        url: "/assets/screenshots/healthcare-ai/booking/booking1.png",
        caption: "Step 1: Doctor selection and appointment type",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/booking/booking2.png",
        caption: "Step 2: Date and time slot selection with availability",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/booking/booking4.png",
        caption: "Step 4: Appointment confirmation and payment processing",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/appointment-scheduler.png",
        caption: "Advanced appointment scheduler with conflict management",
        type: "image"
      },
      
      // Doctor Portal
      {
        url: "/assets/screenshots/healthcare-ai/doctor/doctor-home.png",
        caption: "Doctor dashboard with patient appointments and analytics",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/doctor/patient.png",
        caption: "Patient management system with medical records",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/doctor/my-appointemnt.png",
        caption: "Doctor's appointment calendar and scheduling management",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/doctor/analytics.png",
        caption: "Doctor analytics with patient statistics and performance metrics",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/doctor/rating-system.png",
        caption: "Patient feedback and rating system for quality assurance",
        type: "image"
      },
      
      // Admin Panel
      {
        url: "/assets/screenshots/healthcare-ai/admin/dashboard.png",
        caption: "Administrator dashboard with system overview and metrics",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/admin/doctors.png",
        caption: "Doctor verification and management system",
        type: "image"
      },
      {
        url: "/assets/screenshots/healthcare-ai/admin/analytics.png",
        caption: "Comprehensive analytics with usage statistics and trends",
        type: "image"
      }
    ],
    featured: true,
    order: 4,
    status: "active"
  },

  {
    title: "E-Commerce Store",
    description: "A full-featured e-commerce platform with product catalog, shopping cart, payment integration, and order management. Built with modern web technologies featuring responsive design, secure authentication, inventory management, and admin dashboard. Includes features like product search and filtering, user reviews, wishlist functionality, and comprehensive order tracking. Implemented with RESTful APIs, secure payment processing through Stripe, and real-time inventory updates.",
    shortDescription: "Complete e-commerce solution with modern features.",
    image: "/assets/projects/ecommerce-store.jpg",
    technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Redux"],
    githubUrl: "https://github.com/mohany6/ecommerce-store",
    screenshots: [
      {
        url: "/assets/screenshots/ecommerce-store/homepage.jpg",
        caption: "Homepage with featured products and categories",
        type: "image"
      },
      {
        url: "/assets/screenshots/ecommerce-store/product-catalog.jpg",
        caption: "Product catalog with search and filtering",
        type: "image"
      },
      {
        url: "/assets/screenshots/ecommerce-store/shopping-cart.jpg",
        caption: "Shopping cart with quantity management",
        type: "image"
      },
      {
        url: "/assets/screenshots/ecommerce-store/checkout.jpg",
        caption: "Secure checkout process with payment integration",
        type: "image"
      }
    ],
    featured: false,
    order: 2,
    status: "active"
  },

  {
    title: "Portfolio CMS",
    description: "A custom Content Management System built specifically for managing portfolio websites. Features include dynamic content management, blog posting capabilities, project showcase management, and SEO optimization tools. Built with a headless CMS architecture allowing for flexible front-end implementations. Includes user authentication, role-based access control, media management, and automated backup systems. Designed for developers and designers who want full control over their portfolio presentation.",
    shortDescription: "Custom CMS for portfolio and content management.",
    image: "/assets/projects/portfolio-cms.jpg",
    technologies: ["Angular", "Node.js", "MongoDB", "Express", "JWT"],
    githubUrl: "https://github.com/mohany6/portfolio-cms",
    screenshots: [
      {
        url: "/assets/screenshots/portfolio-cms/dashboard.jpg",
        caption: "Admin dashboard with content overview",
        type: "image"
      },
      {
        url: "/assets/screenshots/portfolio-cms/content-editor.jpg",
        caption: "Rich text editor for content creation",
        type: "image"
      },
      {
        url: "/assets/screenshots/portfolio-cms/media-manager.jpg",
        caption: "Media management and upload system",
        type: "image"
      },
      {
        url: "/assets/screenshots/portfolio-cms/seo-tools.jpg",
        caption: "SEO optimization and analytics tools",
        type: "image"
      }
    ],
    featured: false,
    order: 3,
    status: "active"
  },

  {
    title: "Task Manager Pro",
    description: "A comprehensive project and task management application with team collaboration features. Includes Kanban boards, Gantt charts, time tracking, and team communication tools. Built with real-time synchronization, allowing teams to collaborate seamlessly across different locations. Features include task assignment, deadline tracking, file attachments, project templates, and detailed reporting. Designed to improve team productivity and project visibility with intuitive user interface and powerful automation features.",
    shortDescription: "Professional task and project management solution.",
    image: "/assets/projects/task-manager.jpg",
    technologies: ["Vue.js", "Node.js", "MySQL", "Socket.io", "Chart.js"],
    githubUrl: "https://github.com/mohany6/task-manager-pro",
    screenshots: [
      {
        url: "/assets/screenshots/task-manager/kanban-board.jpg",
        caption: "Interactive Kanban board with drag-and-drop",
        type: "image"
      },
      {
        url: "/assets/screenshots/task-manager/gantt-chart.jpg",
        caption: "Project timeline with Gantt chart visualization",
        type: "image"
      },
      {
        url: "/assets/screenshots/task-manager/team-dashboard.jpg",
        caption: "Team collaboration dashboard",
        type: "image"
      },
      {
        url: "/assets/screenshots/task-manager/time-tracking.jpg",
        caption: "Time tracking and productivity analytics",
        type: "image"
      }
    ],
    featured: false,
    order: 5,
    status: "active"
  },

  {
    title: "Weather Dashboard",
    description: "An advanced weather forecasting application with interactive maps, detailed analytics, and location-based services. Features include 7-day forecasts, hourly updates, weather alerts, and historical data analysis. Built with responsive design supporting multiple cities, weather radar integration, and customizable widgets. Includes severe weather notifications, air quality monitoring, and UV index tracking. Designed for both casual users and weather enthusiasts with comprehensive meteorological data visualization.",
    shortDescription: "Advanced weather forecasting with interactive features.",
    image: "/assets/projects/weather-dashboard.jpg",
    technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js", "Mapbox"],
    githubUrl: "https://github.com/mohany6/weather-dashboard",
    screenshots: [
      {
        url: "/assets/screenshots/weather-dashboard/main-dashboard.jpg",
        caption: "Main dashboard with current weather and forecasts",
        type: "image"
      },
      {
        url: "/assets/screenshots/weather-dashboard/weather-map.jpg",
        caption: "Interactive weather map with radar overlay",
        type: "image"
      },
      {
        url: "/assets/screenshots/weather-dashboard/analytics.jpg",
        caption: "Weather analytics and historical data",
        type: "image"
      },
      {
        url: "/assets/screenshots/weather-dashboard/alerts.jpg",
        caption: "Weather alerts and notification system",
        type: "image"
      }
    ],
    featured: false,
    order: 6,
    status: "active"
  }
];

const sampleBlogs = [
  {
    title: "Building Scalable Web Applications with Node.js",
    slug: "building-scalable-web-applications-nodejs",
    excerpt: "Learn the best practices for creating scalable backend applications using Node.js and Express.",
    content: "In this comprehensive guide, we'll explore the fundamentals of building scalable web applications using Node.js...",
    category: "Web Development",
    tags: ["nodejs", "express", "javascript", "backend"],
    published: true,
    featured: true,
    readTime: 8
  },
  {
    title: "Modern Angular Development Techniques",
    slug: "modern-angular-development-techniques",
    excerpt: "Discover the latest Angular features and best practices for building modern web applications.",
    content: "Angular has evolved significantly over the years. In this article, we'll explore the latest features...",
    category: "Frontend",
    tags: ["angular", "typescript", "frontend"],
    published: true,
    featured: false,
    readTime: 6
  },
  {
    title: "Database Design for MongoDB",
    slug: "database-design-mongodb-best-practices",
    excerpt: "Best practices for designing efficient and scalable MongoDB databases.",
    content: "MongoDB offers flexibility in data modeling, but with great power comes great responsibility...",
    category: "Database",
    tags: ["mongodb", "database", "nosql"],
    published: true,
    featured: false,
    readTime: 10
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Project.deleteMany({});
    await Blog.deleteMany({});

    // Insert sample projects
    await Project.insertMany(sampleProjects);
    console.log('Sample projects inserted successfully');

    // Insert sample blogs
    await Blog.insertMany(sampleBlogs);
    console.log('Sample blogs inserted successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
