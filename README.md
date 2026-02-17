# Eric Sambu - Author Portfolio

Professional author portfolio website showcasing Dr. Eric Sambu's publications, credentials, and professional achievements.

## Project Structure

```
author-portfolio/
├── assets/
│   ├── css/
│   │   ├── main.css              # Common styles, animations, utilities
│   │   └── components.css        # Component-specific styles
│   ├── js/
│   │   ├── navigation.js         # Mobile menu functionality
│   │   ├── newsletter.js         # Supabase newsletter subscription
│   │   ├── credentials.js        # Credentials gallery & modal
│   │   ├── gallery.js            # Bento grid gallery
│   │   └── galleryData.js        # Gallery photo data
│   ├── images/                   # Book covers and photos
│   └── docs/                     # PDF publications
├── index.html                    # Main landing page
├── about-eric-sambu.html         # Biography and career timeline
├── book-detail.html              # Individual book details
├── collection.html               # All publications showcase
├── .env                          # Environment variables (not tracked)
└── .env.example                  # Environment variables template
```

## Technologies

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (ES6+)
- **Framework**: Tailwind CSS (CDN)
- **Database**: Supabase (newsletter subscriptions)
- **CDN**: Cloudinary (images and documents)
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Icons**: Material Icons

## Key Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Credentials Showcase**: 20+ professional certifications with modal viewer
- **Publication Gallery**: 24 books + 9 academic papers
- **Newsletter Integration**: Supabase-powered email subscriptions
- **Photo Gallery**: Bento grid layout with professional photos
- **Dark Mode**: Default dark theme optimized for readability

## Development

### Local Setup

1. Clone the repository
2. Copy `.env.example` to `.env` and configure Supabase credentials
3. Open `index.html` in a modern browser
4. No build process required - simple static site

### File Organization

All CSS and JavaScript have been modularized:
- **Styles**: Centralized in `assets/css/` to eliminate duplication
- **Scripts**: Separated by functionality in `assets/js/`
- **Assets**: Images and documents hosted on Cloudinary CDN

### Making Changes

- **Styling**: Edit `main.css` or `components.css` - changes apply to all pagesUser
- **Navigation**: Update `navigation.js` for menu behavior
- **Newsletter**: Configure in `newsletter.js` with Supabase credentials
- **Credentials**: Modify data array in `credentials.js`
- **Gallery**: Update `galleryData.js` for photo collection

## Color Scheme

```css
Primary: #3211d4
Background Light: #f6f6f8
Background Dark: #1a162e
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance

- Minimized HTTP requests through CSS/JS consolidation
- CDN-hosted images and documents
- Optimized for fast load times
- No external dependencies beyond CDN resources

## Contact

For questions or feedback, reach out to Dr. Eric Sambu:
- LinkedIn: [Eric Sambu](https://www.linkedin.com/in/eric-sambu-78750b3a/)
- Web of Science: [Profile](https://www.webofscience.com/wos/author/record/ODL-6728-2025)

---

© 2025 Eric Sambu. All Rights Reserved.
