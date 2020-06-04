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

//This code uses the GET route function where it returns menu from the database.


router.get('/menu', async (ctx) => {
    const { rows } = await pool.query('SELECT * FROM menu_item;');
    ctx.body = rows;
});

// Task 2
/*
This code uses the POST route that adds and records a customer order to the database. 
The variables will depend on the inputs by the users that includes the order_date and order_total.
*/

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

//This code uses the GET route function where it returns the users input when they search up the list of available bookings.

router.get('/booking', async (ctx) => {
    const { rows } = await pool.query('SELECT * FROM booking;');
    ctx.body = rows;
});

// Task 2

/*
This code uses the POST route that adds and records a booking to the database. 
The variables will depend on the inputs by the users that includes the booking_date, booking_time, email and mobile number.
*/

router.post('/add-booking/', async (ctx) => {
    const {
        bookingDate,
        bookingTime,
        email,
        mobileNumber,
        quantity,
    } = ctx.request.body;
    const newBooking = await pool.query(
        `INSERT INTO booking VALUES (DEFAULT, '${bookingDate}', '${bookingTime}', '${email}', 
        '${mobileNumber}', ${quantity}) RETURNING *;`,
    );
    ctx.body = newBooking.rows;
});

// Task 3
/*
This code uses the POST route to update the booking details that were inputted through the inputs from task 2 based on the input of the booking_Id.
Changes in the database based on the given booking_ID includes the booking_date & booking_time columns.
*/

router.post('/update-booking/', async (ctx) => {
    const { bookingId, bookingDate, bookingTime, quantity } = ctx.request.body;
    const updateBooking = await pool.query(
        `UPDATE booking SET booking_date = '${bookingDate}', booking_time = '${bookingTime}', 
        quantity = ${quantity} WHERE booking_id = ${bookingId} RETURNING *;`,
    );
    ctx.body = updateBooking.rows;
});

// Task 4
/*
This code uses the POST route to delete any bookings made from task 2 (and where it is also then updated through task 3 if applicable) based on the input of the booking ID.
The code will delete the booking_id and their corresopnding rows affiliated with it (booking_date, booking_time, email & mobile_number).
*/

router.post('/delete-booking/', async (ctx) => {
    const { bookingId } = ctx.request.body;
    const deletedBooking = await pool.query(
        `DELETE FROM booking WHERE booking_id = ${bookingId} RETURNING *;`,
    );
    ctx.body = deletedBooking.rows;
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
