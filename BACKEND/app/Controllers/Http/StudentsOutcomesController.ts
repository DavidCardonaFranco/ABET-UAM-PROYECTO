import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import StudentsOutcome from 'App/Models/StudentOutcome';

export default class StudentsOutcomesController {
  public async index({ response }: HttpContextContract) {
    try {
      const studentsOutcomes = await StudentsOutcome.all();
      response.status(200).json({
        message: 'Lista de StudentsOutcomes obtenida exitosamente.',
        data: studentsOutcomes
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de StudentsOutcomes.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'description', 'grade', 'id_leader']);
      const studentsOutcome = await StudentsOutcome.create(data);
      response.status(201).json({
        message: 'StudentsOutcome creado exitosamente.',
        data: studentsOutcome
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el StudentsOutcome.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const studentsOutcome = await StudentsOutcome.findOrFail(params.id);
      response.status(200).json({
        message: 'Información del StudentsOutcome obtenida exitosamente.',
        data: studentsOutcome
      });
    } catch (error) {
      response.status(404).json({ message: 'StudentsOutcome no encontrado.' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const studentsOutcome = await StudentsOutcome.findOrFail(params.id);
      const data = request.only(['name', 'description', 'grade', 'id_leader']);
      studentsOutcome.merge(data);
      await studentsOutcome.save();
      response.status(200).json({
        message: 'StudentsOutcome actualizado exitosamente.',
        data: studentsOutcome
      });
    } catch (error) {
      response.status(404).json({ message: 'StudentsOutcome no encontrado.' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const studentsOutcome = await StudentsOutcome.findOrFail(params.id);
      await studentsOutcome.delete();
      response.status(200).json({
        message: 'StudentsOutcome eliminado exitosamente.',
        data: studentsOutcome
      });
    } catch (error) {
      response.status(404).json({ message: 'StudentsOutcome no encontrado.' });
    }
  }
}
