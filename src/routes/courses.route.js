const { Router } = require('express');
const CourseController = require('../controllers/CourseController');

const coursesRoutes = new Router();

coursesRoutes.post('/', CourseController.create);

module.exports = coursesRoutes;
