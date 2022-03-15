# IV1201-recruitment-app
This is the project for the course IV1201 at KTH. It's a web application in JavaScript for a recruitment system.

## Project Description 

The project goal for this course is to learn how to make architectural decisions to be able to build a proper web application that attains a high standard and follows a group's agreement. This makes the code flexible and easily understood and makes it convenient for other developers to continue on the project.

This web application provides a service for people to sign up and apply for a job at an amusement park. A person can sign in with their credentials and make an application. 

## Tools and Frameworks
- Node
- npm
- nodemon
- Express
- Sequelize
- CLS-hooked
- Postgres
- Bcrypt
- JSON Web Token (JWT)
- Express Validator
- dotenv-safe
- React
- Redux
- i18next

## Architecture

The application is divided into a backend and a frontend. It is written in JavaScript using the web framework Express for backend to provide a REST Api and React to build an user interface. 

### Frontend
The frontend is using the MVP layered achitecture to provide high cohesion, encapsulation and low coupling. The frontend application was created with `create-react-app`, where the file `index.js` is the entry point. Redux is used to store the state of a person. 

### Backend
The backend is using the MVC and Integration layered architecture to provide high cohesion, encapsulation and low coupling. All calls from frontend are received in the `Api` layer (`View`), and all communication to the database is handled in the `Integration` layer. The `Model` layer contains all Sequelize models and DTO's and the `Controller` is responsible for all communication between the layers.  

### Database
This application uses Postgres as its relational database. Sequelize is used as the Object Relational Mapping (ORM). 

Below is the schema of our database:
![Database schema](https://raw.githubusercontent.com/andrearook/IV1201-recruitment-app/develop/img/recruitment_db.png)

### Internationalization
If you want to add another language to the application:
#### Backend
- Add a new folder under backend/locales named with your language code (ISO 639-1).
- Add a translation.json file in this new folder. The structure of this file must be the same as for the existing translation.json files. 

#### Frontend
- Add a new folder under frontend/public/locales named with your language code (ISO 639-1).
- Add a translation.json file in this new folder. The structure of this file must be the same as for the existing translation.json files.
- Add the language code under supportedLngs in i18n.js.

#### Database
- To add a new language to the application you must also add competence names in this new language in the database. Do so by inserting new rows in the table `competence_name`. The following example is for inserting the french translation for ticket sales:
`INSERT INTO competence_name (competence_id, language, name) VALUES (1, 'fr', 'la vente de billets');`
- Repeat this for all competences.
- All existing competences with their corresponing ids can be found in the table `competence`.

## Installation
- If you do not already have node.js install it. Check version in your terminal with: `node -v`.
- Clone this git repository.
- Install all required npm packages by running the command `npm install` in both the `root` directory and the `frontend` directory.
- Install postgres if you don't already have it. You can check installed version by running the command: `psql --version`. Log in with your postgres credentials and create the database (see the database model under [Database](#database).

## Running the application in development mode
1. Make a copy of the file `.env.example` and create your own `.env` file where you specify your settings. Make sure the server port matches the proxy specified in the frontend `package.json` file.
2. Start your database. 
3. Start the server by running the command `npx nodemon src/server.js` in the `backend` directory.
4. Start the client by running the command `npm start` in the `frontend` directory.
5. Open http://localhost:3000 to view the client in the browser.

## Heroku 

This application is deployed on Heroku. https://recruitment-app-iv1201.herokuapp.com/

## Developers
- Linnéa Vikberg
- Andrea Lingmar Rook
- Frida Johansson
