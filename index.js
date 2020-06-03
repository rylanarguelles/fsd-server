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

router.get('/menu', async (ctx) => {
    const { rows } = await pool.query('SELECT * FROM menu_item;');
    ctx.body = rows;
});

// Task 2

router.post('/checkout', async (ctx) => {
    const { orderDate, orderTotal } = ctx.request.body;
    const newOrder = await pool.query(
        `INSERT INTO customer_order VALUES (DEFAULT, '${orderDate}', ${orderTotal}) RETURNING *;`,
    );
    ctx.body = newOrder.rows;
});
//
// ─── BOOKING QUERIES ────────────────────────────────────────────────────────────
//

// Task 1

router.get('/booking', async ctx => {
    const { rows } = await pool.query('SELECT * FROM booking;');
    ctx.body = rows;
});

// Task 2

router.post('/add-booking', async ctx => {
    const {
        bookingDate, 
        bookingTime,
        email,
        mobileNumber 
    } = ctx.request.body;
    const newBooking = await pool.query(
        `INSERT INTO booking VALUES (DEFAULT, '${bookingDate}', '${bookingTime}', '${email}', '${mobileNumber}') RETURNING *;`
    );
    ctx.body = newBooking.rows;
});

// Task 3

router.post('/update-booking', async ctx => {
    const { 
        bookingId,
        bookingDate,
        bookingTime 
    } = ctx.request.body;
    const newBooking = await pool.query(
        `UPDATE booking SET booking_date = '${bookingDate}', booking_time = '${bookingTime}' WHERE booking_id = ${bookingId} RETURNING *;`
    );
    ctx.body = newBooking.rows;
});

// Task 4

router.post('/delete-booking', async ctx => {
    const {
        bookingId
    } = ctx.request.body;
    const newBooking = await pool.query(
        `DELETE FROM booking WHERE booking_id = ${bookingId} RETURNING *;`
    );
    ctx.body = newBooking.rows;
});

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
