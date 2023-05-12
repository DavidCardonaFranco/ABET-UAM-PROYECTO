import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import OutcomeSubject from 'App/Models/OutcomeSubject';

export default class OutcomeSubjectsController {
  public async index({ response }: HttpContextContract) {
    try {
      const outcomeSubjects = await OutcomeSubject.all();
      response.status(200).json({
        message: 'Lista de OutcomeSubjects obtenida exitosamente.',
        data: outcomeSubjects
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de OutcomeSubjects.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['id_outcome', 'subject_id']);
      const outcomeSubject = await OutcomeSubject.create(data);
      response.status(201).json({
        message: 'OutcomeSubject creado exitosamente.',
        data: outcomeSubject
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el OutcomeSubject.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const outcomeSubject = await OutcomeSubject.findOrFail(params.id);
      response.status(200).json({
        message: 'Información del OutcomeSubject obtenida exitosamente.',
        data: outcomeSubject
      });
    } catch (error) {
      response.status(404).json({ message: 'OutcomeSubject no encontrado' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const outcomeSubject = await OutcomeSubject.findOrFail(params.id);
      const data = request.only(['id_outcome', 'subject_id']);
      outcomeSubject.merge(data);
      await outcomeSubject.save();
      response.status(200).json({
        message: 'OutcomeSubject actualizado exitosamente.',
        data: outcomeSubject
      });
    } catch (error) {
      response.status(404).json({ message: 'OutcomeSubject no encontrado' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const outcomeSubject = await OutcomeSubject.findOrFail(params.id);
      await outcomeSubject.delete();
      response.status(200).json({
        message: 'OutcomeSubject eliminado exitosamente.',
        data: outcomeSubject
      });
    } catch (error) {
      response.status(404).json({ message: 'OutcomeSubject no encontrado' });
    }
  }
}
