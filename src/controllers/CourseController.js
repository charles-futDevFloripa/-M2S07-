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
  // -----| Extra usando LIKE |------
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

  // --------------------------------
  // ------ | Exercício 04 | --------
  // --------------------------------

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, duration } = req.body;

      if (!name) {
        return res.status(400).json({
          message: 'O nome do curso deve ser informado',
        });
      }

      if (!duration) {
        return res.status(400).json({
          message: 'A duração do curso deve ser informada',
        });
      }

      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(404).json({
          message: 'Curso não encontrado',
        });
      }

      course.name = name;
      course.duration = duration;
      await course.save();

      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao atualizar o curso',
      });
    }
  }

  // --------------------------------
  // ------ | Exercício 05 | --------
  // --------------------------------

  async delete(req, res) {
    try {
      const { id } = req.params;

      const course = await Course.findByPk(id);

      if (!course) {
        return res.status(404).json({
          message: 'Curso não encontrado',
        });
      }

      await course.destroy();

      // O status code 204 (No Content) significa que a requisição foi bem-sucedida,
      // mas não há conteúdo a ser enviado na resposta. De acordo com a especificação HTTP,
      // uma resposta com status 204 não deve incluir um corpo.
      //https://datatracker.ietf.org/doc/html/rfc7231#section-6.3.5
      // https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status/204

      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao deletar o curso',
      });
    }
  }
} // class end

module.exports = new CourseController();
