const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-body');
const { Pool } = require('pg');

const app = new Koa();
const router = new Router();

//
// ─── TASK 0 ──────────────────────────────────────────────────────────────────────
// I forgot to mention this, create a user that has access to the fsd database.
// For uniformity, we will name the user "fsd" too. Password should also be "fsd".
// These are DEFAULT values and must NOT change.
pool = new Pool({
    user: 'fsd',
    host: 'localhost',
    database: 'fsd',
    password: 'fsd',
    port: '5432',
});

//
// ─── ORDERING QUERIES ─────────────────────────────────────────────────────────────────────
//

// Task 1

// Task 2

// Task 3

//
// ─── BOOKING QUERIES ────────────────────────────────────────────────────────────
//

// Task 1

// Task 2

// Task 3

// Task 4

// You should see this in your console if you are successful in running the server.
// To run the server, type "npm start" in your project terminal.
console.log('Loading environmental variables...');

// Do not mind or change these.
// You can read on what they do after this term.
app.use(bodyParser());
app.use(cors());
app.use(router.routes());

// Do not change this port.
app.listen(8000);

// You should see this in your console if you are successful in running the server.
// To run the server, type "npm start" in your project terminal.
console.log('Now listening to port 8000');
