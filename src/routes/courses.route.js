const { Router } = require('express');
const CourseController = require('../controllers/CourseController');

const coursesRoutes = new Router();

coursesRoutes.post('/', CourseController.create);
coursesRoutes.get('/', CourseController.listAll);
coursesRoutes.get('/search', CourseController.search);
coursesRoutes.get('/search-like', CourseController.searchWithLike);
coursesRoutes.put('/:id', CourseController.update);

module.exports = coursesRoutes;
