import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Role from 'App/Models/Role';
import User from 'App/Models/User';

export default class RolesController {
  /**
   * Listar todos los roles
   */
  public async index({ response }: HttpContextContract) {
    try {
      const roles = await Role.query();
      response.status(200).json({
        message: 'Lista de roles obtenida exitosamente.',
        data: roles
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error al obtener los roles.',
        data: null
      });
    }
  }

  /**
   * Crear un nuevo rol
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.body();
      const role = await Role.create(data);
      response.status(201).json({
        message: 'Rol creado exitosamente.',
        data: role
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error al crear el rol.',
        data: null
      });
    }
  }

  /**
   * Obtener un rol por su ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const role = await Role.findOrFail(params.id);
      response.status(200).json({
        message: 'Rol encontrado exitosamente.',
        data: role
      });
    } catch (error) {
      response.status(404).json({ message: 'Rol no encontrado' });
    }
  }

  /**
   * Actualizar un rol existente
   */
  public async update({ request, params, response }: HttpContextContract) {
    try {
      const data = request.body();
      const role = await Role.findOrFail(params.id);
      role.name = data.name;
      await role.save();
      response.status(200).json({
        message: 'Rol actualizado exitosamente.',
        data: role
      });
    } catch (error) {
      response.status(404).json({ message: 'Rol no encontrado' });
    }
  }

  /**
   * Eliminar un rol existente
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const users = await User.query().where('role_id', params.id);
      if (users.length > 0) {
        response.status(400).json({
          error: 'El Rol tiene Users asociados',
          users: users
        });
      } else {
        const role = await Role.findOrFail(params.id);
        await role.delete();
        response.status(200).json({
          message: 'Rol eliminado exitosamente.',
          data: role
        });
      }
    } catch (error) {
      response.status(404).json({ message: 'Rol no encontrado' });
    }
  }
}
