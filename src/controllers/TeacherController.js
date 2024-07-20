const Teacher = require('../models/Teacher');

class TeacherController {
  // --------------------------------
  // --------- | CREATE | -----------
  // --------------------------------
  async create(req, res) {
    try {
      const { name, specialty, hire_date } = req.body;

      if (!name || !specialty || !hire_date) {
        return res.status(400).json({
          message: 'Todos os campos devem ser preenchidos',
        });
      }

      const teacher = await Teacher.create({ name, specialty, hire_date });
      res.status(201).json(teacher);
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao cadastrar o professor',
      });
    }
  }

  // --------------------------------
  // -------- | READ ALL | ----------
  // --------------------------------
  async listAll(req, res) {
    try {
      const teachers = await Teacher.findAll();
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao buscar os professores',
      });
    }
  }

  // --------------------------------
  // ---------- | UPDATE | ----------
  // --------------------------------
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, specialty, hire_date } = req.body;

      const teacher = await Teacher.findByPk(id);

      if (!teacher) {
        return res.status(404).json({
          message: 'Professor não encontrado',
        });
      }

      if (!name || !specialty || !hire_date) {
        return res.status(400).json({
          message: 'Todos os campos devem ser preenchidos',
        });
      }

      teacher.name = name;
      teacher.specialty = specialty;
      teacher.hire_date = hire_date;
      await teacher.save();

      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao atualizar o professor',
      });
    }
  }

  // --------------------------------
  // ---------- | DELETE | -------
  // --------------------------------
  async delete(req, res) {
    try {
      const { id } = req.params;

      const teacher = await Teacher.findByPk(id);

      if (!teacher) {
        return res.status(404).json({
          message: 'Professor não encontrado',
        });
      }

      await teacher.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({
        message: 'Ocorreu um erro interno ao deletar o professor',
      });
    }
  }
}

module.exports = new TeacherController();
