import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Proffesor from 'App/Models/Proffesor';

export default class ProffesorsController {
  public async index({ response }: HttpContextContract) {
    try {
      const proffesors = await Proffesor.all();
      response.status(200).json({
        message: 'Lista de Proffesors obtenida exitosamente.',
        data: proffesors
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de Proffesors.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'email', 'password']);
      const proffesor = await Proffesor.create(data);
      response.status(201).json({
        message: 'Proffesor creado exitosamente.',
        data: proffesor
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el Proffesor.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const proffesor = await Proffesor.findOrFail(params.id);
      response.status(200).json({
        message: 'Información del Proffesor obtenida exitosamente.',
        data: proffesor
      });
    } catch (error) {
      response.status(404).json({ message: 'Proffesor no encontrado' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const proffesor = await Proffesor.findOrFail(params.id);
      const data = request.only(['name', 'email', 'password']);
      proffesor.merge(data);
      await proffesor.save();
      response.status(200).json({
        message: 'Proffesor actualizado exitosamente.',
        data: proffesor
      });
    } catch (error) {
      response.status(404).json({ message: 'Proffesor no encontrado' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const proffesor = await Proffesor.findOrFail(params.id);
      await proffesor.delete();
      response.status(200).json({
        message: 'Proffesor eliminado exitosamente.',
        data: proffesor
      });
    } catch (error) {
      response.status(404).json({ message: 'Proffesor no encontrado' });
    }
  }
}
