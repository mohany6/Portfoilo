# Portfolio Assets

This folder contains all the static assets for the portfolio application.

## Structure

```
assets/
├── cv/
│   └── mohamed-hany-cv.pdf         # CV/Resume file (placeholder)
├── icons/
│   ├── angular.svg                 # Angular technology icon
│   ├── express.svg                 # Express.js technology icon
│   ├── nodejs.svg                  # Node.js technology icon
│   ├── postgresql.svg              # PostgreSQL technology icon
│   ├── react.svg                   # React technology icon
│   └── vue.svg                     # Vue.js technology icon
├── images/
│   ├── about-me.jpg                # About page image (SVG placeholder)
│   ├── blog-default.jpg            # Default blog post image
│   └── profile.jpg                 # Profile image for hero section
├── patterns/
│   └── dots.svg                    # Background pattern for hero section
└── projects/
    ├── cinema-booking.jpg          # Cinema booking system project image
    ├── ecommerce-store.jpg         # E-commerce store project image
    ├── healthcare-ai.jpg           # Healthcare AI project image
    ├── portfolio-cms.jpg           # Portfolio CMS project image
    ├── task-manager.jpg            # Task manager project image
    └── weather-dashboard.jpg       # Weather dashboard project image
```

## Notes

- All current images are SVG placeholders with professional designs
- Replace these placeholders with actual screenshots and photos for production
- The CV file is currently a text placeholder - replace with actual PDF
- Icons are custom SVG designs representing the technologies
- Project images include visual representations of each project type

## Replacing Assets

To replace any placeholder:

1. **Profile Image**: Replace `images/profile.jpg` with your actual photo (recommended: 300x300px)
2. **Project Screenshots**: Replace files in `projects/` with actual project screenshots
3. **CV**: Replace `cv/mohamed-hany-cv.pdf` with your actual resume PDF
4. **Tech Icons**: Replace files in `icons/` with official technology icons if needed

All paths are referenced from the Angular application and will be served from the `/assets/` URL path.
