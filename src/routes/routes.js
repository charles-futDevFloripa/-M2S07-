const { Router } = require('express');

const coursesRoutes = require('./courses.route');
const teachersRoutes = require('./teacher.route');

const routes = new Router();

routes.use('/courses', coursesRoutes);
routes.use('/teachers', teachersRoutes);

module.exports = routes;
