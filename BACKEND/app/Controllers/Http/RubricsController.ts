import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Rubric from 'App/Models/Rubric';

export default class RubricsController {
  public async index({ response }: HttpContextContract) {
    try {
      const rubrics = await Rubric.all();
      response.status(200).json({
        message: 'Lista de Rubrics obtenida exitosamente.',
        data: rubrics
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de Rubrics.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'description']);
      const rubric = await Rubric.create(data);
      response.status(201).json({
        message: 'Rubric creado exitosamente.',
        data: rubric
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el Rubric.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const rubric = await Rubric.findOrFail(params.id);
      response.status(200).json({
        message: 'Información del Rubric obtenida exitosamente.',
        data: rubric
      });
    } catch (error) {
      response.status(404).json({ message: 'Rubric no encontrado' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const rubric = await Rubric.findOrFail(params.id);
      const data = request.only(['name', 'description']);
      rubric.merge(data);
      await rubric.save();
      response.status(200).json({
        message: 'Rubric actualizado exitosamente.',
        data: rubric
      });
    } catch (error) {
      response.status(404).json({ message: 'Rubric no encontrado' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const rubric = await Rubric.findOrFail(params.id);
      await rubric.delete();
      response.status(200).json({
        message: 'Rubric eliminado exitosamente.',
        data: rubric
      });
    } catch (error) {
      response.status(404).json({ message: 'Rubric no encontrado' });
    }
  }
}
