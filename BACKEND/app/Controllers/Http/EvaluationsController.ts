import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Evaluation from 'App/Models/Evaluation';

export default class EvaluationsController {
  public async index({ response }: HttpContextContract) {
    try {
      const evaluations = await Evaluation.all();
      response.status(200).json({
        message: 'Lista de evaluaciones obtenida exitosamente.',
        data: evaluations
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de evaluaciones.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['grade']);
      const evaluation = await Evaluation.create(data);
      response.status(201).json({
        message: 'Evaluación creada exitosamente.',
        data: evaluation
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear la evaluación.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const evaluation = await Evaluation.findOrFail(params.id);
      response.status(200).json({
        message: 'Información de la evaluación obtenida exitosamente.',
        data: evaluation
      });
    } catch (error) {
      response.status(404).json({ message: 'Evaluación no encontrada' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const evaluation = await Evaluation.findOrFail(params.id);
      const data = request.only(['grade']);
      evaluation.merge(data);
      await evaluation.save();
      response.status(200).json({
        message: 'Evaluación actualizada exitosamente.',
        data: evaluation
      });
    } catch (error) {
      response.status(404).json({ message: 'Evaluación no encontrada' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const evaluation = await Evaluation.findOrFail(params.id);
      await evaluation.delete();
      response.status(200).json({
        message: 'Evaluación eliminada exitosamente.',
        data: evaluation
      });
    } catch (error) {
      response.status(404).json({ message: 'Evaluación no encontrada' });
    }
  }
}
