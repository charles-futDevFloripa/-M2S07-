const Course = require('../models/Course');

class CourseController {
  // --------------------------------
  // --------| Exercício 01 |--------
  // --------------------------------
  async create(req, res) {
    try {
      const data = req.body;

      if (!data.name) {
        return res.status(400).json({
          message: 'O nome do curso deve ser informado',
        });
      }

      if (!data.duration) {
        return res.status(400).json({
          message: 'A duração do curso deve ser informada',
        });
      }

      const course = await Course.create(data);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao cadastrar o curso',
      });
    }
  }

  // --------------------------------
  // --------| Exercício 02 |--------
  // --------------------------------

  async listAll(req, res) {
    try {
      const courses = await Course.findAll();
      res.json(courses);
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao buscar os cursos',
      });
    }
  }
} // class end

module.exports = new CourseController();
