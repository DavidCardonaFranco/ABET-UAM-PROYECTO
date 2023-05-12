import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Leader from 'App/Models/Leader';

export default class LeadersController {
  public async index({ response }: HttpContextContract) {
    try {
      const leaders = await Leader.all();
      response.status(200).json({
        message: 'Lista de líderes obtenida exitosamente.',
        data: leaders
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de líderes.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'email', 'password']);
      const leader = await Leader.create(data);
      response.status(201).json({
        message: 'Líder creado exitosamente.',
        data: leader
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el líder.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const leader = await Leader.findOrFail(params.id);
      response.status(200).json({
        message: 'Información del líder obtenida exitosamente.',
        data: leader
      });
    } catch (error) {
      response.status(404).json({ message: 'Líder no encontrado' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const leader = await Leader.findOrFail(params.id);
      const data = request.only(['name', 'email', 'password']);
      leader.merge(data);
      await leader.save();
      response.status(200).json({
        message: 'Líder actualizado exitosamente.',
        data: leader
      });
    } catch (error) {
      response.status(404).json({ message: 'Líder no encontrado' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const leader = await Leader.findOrFail(params.id);
      await leader.delete();
      response.status(200).json({
        message: 'Líder eliminado exitosamente.',
        data: leader
      });
    } catch (error) {
      response.status(404).json({ message: 'Líder no encontrado' });
    }
  }
}
