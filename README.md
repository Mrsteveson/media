# Media
API for a media project. Intended to be used for a photo gallery idea.

# Idea
The basis of the idea behind this project is to create a platform that will allow users to upload images and quotes, (potentially videos in future iterations).
These uploads will then be used in a front-end client designed to be used for collage and custom card creation. Users will be able to use their uploads to mix and match
their favorite memories into savable works of art that they can share with friends and family.

## Endpoints
| Method | Endpoint               | Requires                        | Description                                                             |
| ------ | ---------------------- | ------------------------------- | ----------------------------------------------------------------------- |
| POST   | `/auth/register/`      | `username`, `password`,         | Registers a New User to our database.                                   |
| POST   | `/auth/login/`         | `username`, `password`          | Logs a returning user in.                                               |
| GET    | `/user/:id/`           | Successful Login                | Used to show a specified user information.                              |
| POST   | `/upload`              | Successful Login, Image File    | Uploads a user image to Cloudinary.                                     |
| GET    | `/images`              | Successful Login                | Used to show all uploaded images in the database, by the logged in user.|
| GET    | `/image/:id/`          | Successful Login                | Used to show a specific image in the database.                          |

# User Model
```
{
    id: INTEGER,
    username: STRING,
    password: STRING,
    email: STRING (optional),
    created_at: TIMESTAMP
}
```

# Sample User.
```
{
    username: 'patrick',
    password: 'pass',
    email: 'patrick@gmail.com',
    created_at: '12/9/2019'
}
```

# Image Model
```
{
    id: INTEGER,
    title: STRING,
    img_url: STRING,
    date: STRING (optional),
    caption: STRING (optional),
    uploaded_by: VARCHAR foreign key to USERS,
    uploaded_at: TIMESTAMP
}
```

# Sample Image
```
{
    title: 'Family Photo',
    img_url: 'CloudinaryURL',
    date: '1/1/2019',
    caption: 'Lovely photo of my family', (optional, will potentially be used for a mouse over hover effect on each image)
    uploaded_by: 'patrick7'
    uploaded_at: '12/9/2019'
}
```

# Quote Model
```
{
    id: INTEGER,
    origin: STRING,
    content: STRING,
    date: STRING,
    context: STRING,
    uploaded_by: VARCHAR foreign key to USERS,
    uploaded_at: TIMESTAMP
}
```

# Sample Quote
Aiming to incorporate quotes in addition to the images for further client side content.
quote: {
    origin: 'Katelyn',
    content: 'It's not what you say, it's how you say it.',
    date: '1/1/2019'
    context: 'Talking about me', (optional, not sure how well this column would actually play into the client side visuals)
    uploaded_by: 'patrick7'
    uploaded_at: '12/9/2019'
}

# User Authorization
Initially will be managed through simple login and register endpoints, storing very basic user information.
Utilizing a jsonwebtoken during early development to allow for early client side development which requires user specific information.
Down the line this will be refactored to incorporate a google login process to verify users in order to protect their personal uploads.
I aim to do this by using the OAuth 2.0 Framework to provide account security for users in production, in order to maintain the privacy of their content.

# Database
During early development, the database will be SQLite. The limited number of seeding available to SQLite will not be an issue during the very early stages,
however once the amount of images and quotes exceeds a certain point and the basic client functionality is implemented this will be refactored to use PostgreSQL.
This may cause deployment issues during the switch, but the user friendliness with SQLite is perfect to get proof of concept up and running.

# Testing
Incorporating testing to ensure that routes are fully functional, and receiving the proper data from the client.

# Image Uploading
Images will be uploaded from the User directly to Cloudinary. Building towards using Filepond to make the upload process smooth and user friendly.