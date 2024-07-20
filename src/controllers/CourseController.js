const Course = require('../models/Course');
const { Op } = require('sequelize');

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

  // --------------------------------
  // --------| Exercício 03 |--------
  // --------------------------------

  async search(req, res) {
    try {
      const { name, duration } = req.query;
      const where = {};

      if (name) {
        where.name = name;
      }

      if (duration) {
        where.duration = duration;
      }

      const courses = await Course.findAll({ where });

      if (courses.length === 0) {
        return res.status(404).json({
          message: 'Curso não encontrado',
        });
      }

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao listar os cursos',
      });
    }
  }

  // --------------------------------
  // ------| Extra using LIKE |------
  // --------------------------------

  async searchWithLike(req, res) {
    try {
      const { name, duration } = req.query;
      const where = {};

      if (name) {
        where.name = {
          [Op.like]: `%${name}%`,
        };
      }

      if (duration) {
        where.duration = duration;
      }

      const courses = await Course.findAll({ where });

      if (courses.length === 0) {
        return res.status(404).json({
          message: 'Curso não encontrado',
        });
      }

      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao listar os cursos',
      });
    }
  }
} // class end

module.exports = new CourseController();
