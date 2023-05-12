import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Subject from 'App/Models/Subject';

export default class SubjectsController {
  public async index({ response }: HttpContextContract) {
    try {
      const subjects = await Subject.all();
      response.status(200).json({
        message: 'Lista de Subjects obtenida exitosamente.',
        data: subjects
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de Subjects.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['code', 'name', 'description', 'credits']);
      const subject = await Subject.create(data);
      response.status(201).json({
        message: 'Subject creado exitosamente.',
        data: subject
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el Subject.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const subject = await Subject.findOrFail(params.code);
      response.status(200).json({
        message: 'Información del Subject obtenida exitosamente.',
        data: subject
      });
    } catch (error) {
      response.status(404).json({ message: 'Subject no encontrado.' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const subject = await Subject.findOrFail(params.code);
      const data = request.only(['name', 'description', 'credits']);
      subject.merge(data);
      await subject.save();
      response.status(200).json({
        message: 'Subject actualizado exitosamente.',
        data: subject
      });
    } catch (error) {
      response.status(404).json({ message: 'Subject no encontrado.' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const subject = await Subject.findOrFail(params.code);
      await subject.delete();
      response.status(200).json({
        message: 'Subject eliminado exitosamente.',
        data: subject
      });
    } catch (error) {
      response.status(404).json({ message: 'Subject no encontrado.' });
    }
  }
}
