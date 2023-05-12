import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Activity from 'App/Models/Activity';


export default class ActivitiesController {
  public async index({ response }: HttpContextContract) {
    try {
      const activities = await Activity.query().preload('subject');
      response.status(200).json({
        message: 'Lista de actividades obtenida exitosamente.',
        data: activities
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de actividades.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'description', 'start_date', 'end_date', 'subject_id']);
      const activity = await Activity.create(data);
      response.status(201).json({
        message: 'Actividad creada exitosamente.',
        data: activity
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear la actividad.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const activity = await Activity.findOrFail(params.id);
      await activity.preload('subject');
      response.status(200).json({
        message: 'Información de la actividad obtenida exitosamente.',
        data: activity
      });
    } catch (error) {
      response.status(404).json({ message: 'Actividad no encontrada' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const activity = await Activity.findOrFail(params.id);
      const data = request.only(['name', 'description', 'start_date', 'end_date', 'subject_id']);
      activity.merge(data);
      await activity.save();
      response.status(200).json({
        message: 'Actividad actualizada exitosamente.',
        data: activity
      });
    } catch (error) {
      response.status(404).json({ message: 'Actividad no encontrada' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const activity = await Activity.findOrFail(params.id);
      await activity.delete();
      response.status(200).json({
        message: 'Actividad eliminada exitosamente.',
        data: activity
      });
    } catch (error) {
      response.status(404).json({ message: 'Actividad no encontrada' });
    }
  }
}
