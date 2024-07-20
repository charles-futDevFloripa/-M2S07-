const { Router } = require('express');
const TeacherController = require('../controllers/TeacherController');

const teachersRoutes = new Router();

teachersRoutes.post('/', TeacherController.create);
teachersRoutes.get('/', TeacherController.listAll);
teachersRoutes.put('/:id', TeacherController.update);
teachersRoutes.delete('/:id', TeacherController.delete);

module.exports = teachersRoutes;
