const { Router } = require('express');

const coursesRoutes = require('./courses.route');

const routes = new Router();

routes.use('/courses', coursesRoutes);

module.exports = routes;
