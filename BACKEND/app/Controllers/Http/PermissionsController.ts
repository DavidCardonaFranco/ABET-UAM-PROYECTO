import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Permission from 'App/Models/Permission';

export default class PermissionsController {
  /**
   * Listar todos los permisos
   */
  public async index({ response }: HttpContextContract) {
    try {
      const permissions = await Permission.query();
      response.status(200).json({
        message: 'Lista de permisos obtenida exitosamente.',
        data: permissions
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error al obtener los permisos.',
        data: null
      });
    }
  }

  /**
   * Crear un nuevo permiso
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.body();
      const permission = await Permission.create(data);
      response.status(201).json({
        message: 'Permiso creado exitosamente.',
        data: permission
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error al crear el permiso.',
        data: null
      });
    }
  }

  /**
   * Obtener un permiso por su ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const permission = await Permission.findOrFail(params.id);
      response.status(200).json({
        message: 'Permiso encontrado exitosamente.',
        data: permission
      });
    } catch (error) {
      response.status(404).json({ message: 'Permiso no encontrado' });
    }
  }

  /**
   * Actualizar un permiso existente
   */
  public async update({ request, params, response }: HttpContextContract) {
    try {
      const data = request.body();
      const permission = await Permission.findOrFail(params.id);
      permission.url = data.url;
      permission.method = data.method;
      await permission.save();
      response.status(200).json({
        message: 'Permiso actualizado exitosamente.',
        data: permission
      });
    } catch (error) {
      response.status(404).json({ message: 'Permiso no encontrado' });
    }
  }

  /**
   * Eliminar un permiso existente
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const permission = await Permission.findOrFail(params.id);
      await permission.delete();
      response.status(200).json({
        message: 'Permiso eliminado exitosamente.',
        data: permission
      });
    } catch (error) {
      response.status(404).json({ message: 'Permiso no encontrado' });
    }
  }
}
