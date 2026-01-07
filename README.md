# RiverRun-Camp 🏕️

A full-stack web application for discovering, reviewing, and sharing campgrounds. Users can explore campgrounds on an interactive map, view detailed information, leave reviews, and manage their own campground listings.

## ✨ Features

- 🔐 User authentication and authorization
- 🏕️ Create, read, update, and delete campgrounds
- ⭐ Review and rating system
- 🗺️ Interactive cluster map powered by Mapbox
- 📸 Image upload functionality with Cloudinary integration
- 🔒 Secure input validation and sanitization
- 📱 Responsive design with Tailwind CSS
- 🛡️ Protection against common security vulnerabilities

## 🛠️ Tech Stack

### Backend
- **JavaScript** - Core programming language for both server and client side.

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

### Frontend
- **EJS** - Templating engine
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Mapbox** - Interactive maps

### Additional Services
- **Cloudinary** - Image hosting and management
- **Express Session** - Session management
- **Passport.js** - Authentication middleware

## 📁 Project Structure

```
RiverRun-Camp/
├── app.js                  # Main application file
├── middleware.js           # Custom middleware functions
├── schemas.js              # Joi validation schemas
├── .env                    # Environment variables
├── package.json            # Project dependencies
├── cloudinary/
│   └── index.js           # Cloudinary configuration
├── controllers/
│   ├── campground.js      # Campground logic
│   ├── review.js          # Review logic
│   └── user.js            # User authentication logic
├── models/
│   ├── campground.js      # Campground schema
│   ├── review.js          # Review schema
│   └── user.js            # User schema
├── routes/
│   ├── campgroundsRoutes.js
│   ├── reviewsRoutes.js
│   └── userRoutes.js
├── public/
│   ├── js/                # Client-side JavaScript
│   └── styles/            # Static CSS files
├── views/                 # EJS templates
│   ├── campgrounds/
│   ├── users/
│   ├── layouts/
│   └── partials/
├── seeds/                 # Database seeding scripts
└── utils/                 # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account
- Mapbox account

### Installation

1. Clone the repository
```bash
git clone https://github.com/UmairStn/RiverRun-Camp.git
cd RiverRun-Camp
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables:
```env
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPBOX_TOKEN=your_mapbox_token
DB_URL=your_mongodb_connection_string
SECRET=your_session_secret
```

4. (Optional) Seed the database
```bash
node seeds/index.js
```

5. Start the development server
```bash
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_KEY` | Your Cloudinary API key |
| `CLOUDINARY_SECRET` | Your Cloudinary API secret |
| `MAPBOX_TOKEN` | Your Mapbox public token |
| `DB_URL` | MongoDB connection string |
| `SECRET` | Session secret for Express sessions |

## 🗺️ Routes

### Campgrounds
- `GET /campgrounds` - View all campgrounds
- `GET /campgrounds/new` - Form to create new campground
- `POST /campgrounds` - Create new campground
- `GET /campgrounds/:id` - View specific campground
- `GET /campgrounds/:id/edit` - Form to edit campground
- `PUT /campgrounds/:id` - Update campground
- `DELETE /campgrounds/:id` - Delete campground

### Reviews
- `POST /campgrounds/:id/reviews` - Add review to campground
- `DELETE /campgrounds/:id/reviews/:reviewId` - Delete review

### Users
- `GET /register` - Registration form
- `POST /register` - Create new user
- `GET /login` - Login form
- `POST /login` - Authenticate user
- `GET /logout` - Logout user

## 🔒 Security Features

- Input validation with Joi schemas ([schemas.js](schemas.js))
- MongoDB injection prevention with sanitization ([utils/mongoSanitizeV5.js](utils/mongoSanitizeV5.js))
- Authentication and authorization middleware ([middleware.js](middleware.js))
- Error handling with custom error class ([utils/ExpressError.js](utils/ExpressError.js))
- Async error catching ([utils/catchAsync.js](utils/catchAsync.js))

## 📝 Models

- **Campground** ([models/campground.js](models/campground.js)) - Campground listings with location, images, and details
- **Review** ([models/review.js](models/review.js)) - User reviews with ratings
- **User** ([models/user.js](models/user.js)) - User authentication and profile data

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Umair Sultan**
- GitHub: [@UmairStn](https://github.com/UmairStn)

## 🙏 Acknowledgments

- Mapbox for the mapping functionality
- Cloudinary for image hosting
- The open-source community for the amazing tools and libraries
