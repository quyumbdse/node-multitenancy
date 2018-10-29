const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const knexConfig = require('./knexfile');
const { Model } = require('objection');
const Knex = require('knex');

// Initialize knex.
const knex = Knex(knexConfig.development);

Model.knex(knex);


// Routes 
const productRoute = require('./api/routes/product');
const tenantRoute = require('./api/routes/tenant');
const shopRoute = require('./api/routes/shop');
const userRoute = require('./api/routes/user');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/products', productRoute);
app.use('/tenants', tenantRoute);
app.use('/shops', shopRoute);
app.use('/', userRoute);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;