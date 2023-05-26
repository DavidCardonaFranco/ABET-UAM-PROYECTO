import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';

export default class UsersController {
  /**
   * Listar todos los usuarios
   */
  public async index({ response }: HttpContextContract) {
    try {
      const users = await User.all();
      response.status(200).json({
        message: 'Lista de usuarios obtenida exitosamente.',
        data: users
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error al obtener los usuarios.',
        data: null
      });
    }
  }

  /**
   * Crear un nuevo usuario
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name','email', 'password', 'rememberMeToken','role_id']);
      const user = await User.create(data);
      response.status(201).json({
        message: 'Usuario creado exitosamente.',
        data: user
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error al crear el usuario.',
        data: null
      });
    }
  }

  /**
   * Obtener un usuario por su ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      response.status(200).json({
        message: 'Usuario encontrado exitosamente.',
        data: user
      });
    } catch (error) {
      response.status(404).json({ message: 'Usuario no encontrado' });
    }
  }

  /**
   * Actualizar un usuario existente
   */
  public async update({ request, params, response }: HttpContextContract) {
    try {
      const data = request.only(['name','email', 'password', 'rememberMeToken', 'role_id']);
      const user = await User.findOrFail(params.id);
      user.merge(data);
      await user.save();
      response.status(200).json({
        message: 'Usuario actualizado exitosamente.',
        data: user
      });
    } catch (error) {
      response.status(404).json({ message: 'Usuario no encontrado' });
    }
  }

  /**
   * Eliminar un usuario existente
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const user = await User.findOrFail(params.id);
      await user.delete();
      response.status(200).json({
        message: 'Usuario eliminado exitosamente.',
        data: user
      });
    } catch (error) {
      response.status(404).json({ message: 'Usuario no encontrado' });
    }
  }
}
