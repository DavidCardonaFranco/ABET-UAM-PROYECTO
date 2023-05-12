import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ProffesorSubject from 'App/Models/ProffesorSubject';

export default class ProffesorSubjectsController {
  public async index({ response }: HttpContextContract) {
    try {
      const proffesorSubjects = await ProffesorSubject.all();
      response.status(200).json({
        message: 'Lista de ProffesorSubjects obtenida exitosamente.',
        data: proffesorSubjects
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de ProffesorSubjects.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['proffesor_id', 'subject_id']);
      const proffesorSubject = await ProffesorSubject.create(data);
      response.status(201).json({
        message: 'ProffesorSubject creado exitosamente.',
        data: proffesorSubject
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el ProffesorSubject.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const proffesorSubject = await ProffesorSubject.findOrFail(params.id);
      response.status(200).json({
        message: 'Información del ProffesorSubject obtenida exitosamente.',
        data: proffesorSubject
      });
    } catch (error) {
      response.status(404).json({ message: 'ProffesorSubject no encontrado' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const proffesorSubject = await ProffesorSubject.findOrFail(params.id);
      const data = request.only(['proffesor_id', 'subject_id']);
      proffesorSubject.merge(data);
      await proffesorSubject.save();
      response.status(200).json({
        message: 'ProffesorSubject actualizado exitosamente.',
        data: proffesorSubject
      });
    } catch (error) {
      response.status(404).json({ message: 'ProffesorSubject no encontrado' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const proffesorSubject = await ProffesorSubject.findOrFail(params.id);
      await proffesorSubject.delete();
      response.status(200).json({
        message: 'ProffesorSubject eliminado exitosamente.',
        data: proffesorSubject
      });
    } catch (error) {
      response.status(404).json({ message: 'ProffesorSubject no encontrado' });
    }
  }
}
