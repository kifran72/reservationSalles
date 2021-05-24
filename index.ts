import express from 'express';
import { index } from './src/index';
import Services from './src/services';
import * as dotenv from 'dotenv';
import chalk from 'chalk';
import { TwingLoaderFilesystem, TwingEnvironment } from 'twing';
import path from 'path';
import session from 'express-session';
const app = express();
const PORT = 3000;
const services = new Services();
const loader = new TwingLoaderFilesystem("./src/templates");
const twing = new TwingEnvironment(loader);

//Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./src/public")));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
dotenv.config({ path: 'key.env' });

// Applications
index.init(services);
index.routes(app, twing, services);

//Start server 
app.listen(PORT, () => { console.log(chalk.blue('Client web: http://localhost:' + PORT)); });