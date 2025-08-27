# 🚀 Mohamed Hany - Full-Stack Developer Portfolio

A modern, responsive portfolio website showcasing my projects, skills, and professional experience. Built with Angular 19 frontend and Node.js/Express backend.

## ✨ Features

- **Modern Design** - Clean, professional UI with smooth animations
- **Responsive Layout** - Optimized for all devices and screen sizes
- **Project Showcase** - Interactive project gallery with screenshots
- **Contact Form** - Email integration with auto-reply functionality
- **Blog System** - Content management for articles and posts
- **Real-time Updates** - Dynamic content loading and updates

## 🛠️ Tech Stack

### Frontend
- **Angular 19** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe JavaScript development
- **SCSS** - Advanced CSS with variables and mixins
- **FontAwesome** - Professional icon library
- **Responsive Design** - Mobile-first approach

### Backend
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Nodemailer** - Email sending functionality
- **JWT Authentication** - Secure user authentication

### Development Tools
- **Git** - Version control
- **npm** - Package management
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohany6/Portfoilo.git
   cd Portfoilo
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the backend directory:
   ```env
   EMAIL_USER=mahamedhany8@gmail.com
   EMAIL_APP_PASSWORD=your_gmail_app_password
   FRONTEND_URL=http://localhost:4200
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   ```

5. **Database Setup**
   ```bash
   cd backend
   npm run seed
   ```

6. **Start Development Servers**
   
   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   
   **Frontend (Terminal 2):**
   ```bash
   cd frontend
   ng serve
   ```

7. **Open your browser**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
Portfolio/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/    # API route controllers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic services
│   │   └── seed.js         # Database seeding script
│   ├── config/             # Configuration files
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── frontend/               # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/       # Core services and guards
│   │   │   ├── modules/    # Feature modules
│   │   │   ├── shared/     # Shared components
│   │   │   └── layouts/    # Layout components
│   │   ├── assets/         # Static assets
│   │   └── environments/   # Environment configuration
│   └── package.json        # Frontend dependencies
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

## 🎯 Key Features

### Home Page
- Hero section with personal introduction
- Featured projects showcase
- Skills and technologies overview
- Call-to-action sections

### About Page
- Personal background and experience
- Skills and technologies grid
- Professional achievements
- Contact information

### Projects Page
- Interactive project gallery
- Screenshot viewer with navigation
- Technology stack display
- GitHub and live demo links

### Blog System
- Article management
- Category and tag filtering
- Search functionality
- Responsive reading experience

### Contact Form
- Professional contact form
- Email integration with Nodemailer
- Auto-reply functionality
- Form validation and feedback

## 📧 Email Setup

The contact form includes email functionality. To set it up:

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password** for "Portfolio Contact Form"
3. **Add credentials** to your `.env` file
4. **Test the form** by sending a message

See `backend/EMAIL_SETUP.md` for detailed instructions.

## 🚀 Deployment

### Frontend (Angular)
```bash
cd frontend
ng build --configuration production
```

### Backend (Node.js)
```bash
cd backend
npm run build
npm start
```

### Environment Variables
- Set production environment variables
- Configure production database
- Update frontend API endpoints
- Set up SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

- **Email**: mahamedhany8@gmail.com
- **Location**: Cairo, Egypt
- **GitHub**: [@mohany6](https://github.com/mohany6)
- **LinkedIn**: [Mohamed Hany](https://linkedin.com/in/mohamed-hany)

## 🙏 Acknowledgments

- Angular team for the amazing framework
- Express.js community for the robust backend framework
- MongoDB for the flexible database solution
- FontAwesome for the beautiful icons
- All contributors and supporters

---

**Built with ❤️ by Mohamed Hany**
