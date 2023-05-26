import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import PermissionsRole from 'App/Models/PermissionsRole';

export default class PermissionsRolesController {
  /**
   * Listar todas las relaciones entre permisos y roles
   */
  public async index({ response }: HttpContextContract) {
    try {
      const permissionsRoles = await PermissionsRole.query();
      response.status(200).json({
        message: 'Lista de relaciones permisos-roles obtenida exitosamente.',
        data: permissionsRoles
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error al obtener las relaciones permisos-roles.',
        data: null
      });
    }
  }

  /**
   * Crear una nueva relación entre permiso y rol
   */
  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.body();
      const permissionsRole = await PermissionsRole.create(data);
      response.status(201).json({
        message: 'Relación permiso-rol creada exitosamente.',
        data: permissionsRole
      });
    } catch (error) {
      response.status(500).json({
        message: 'Error al crear la relación permiso-rol.',
        data: null
      });
    }
  }

  /**
   * Obtener una relación permiso-rol por su ID
   */
  public async show({ params, response }: HttpContextContract) {
    try {
      const permissionsRole = await PermissionsRole.findOrFail(params.id);
      response.status(200).json({
        message: 'Relación permiso-rol encontrada exitosamente.',
        data: permissionsRole
      });
    } catch (error) {
      response.status(404).json({ message: 'Relación permiso-rol no encontrada' });
    }
  }

  /**
   * Actualizar una relación permiso-rol existente
   */
  public async update({ request, params, response }: HttpContextContract) {
    try {
      const data = request.body();
      const permissionsRole = await PermissionsRole.findOrFail(params.id);
      permissionsRole.role_id = data.role_id;
      permissionsRole.permission_id = data.permission_id;
      await permissionsRole.save();
      response.status(200).json({
        message: 'Relación permiso-rol actualizada exitosamente.',
        data: permissionsRole
      });
    } catch (error) {
      response.status(404).json({ message: 'Relación permiso-rol no encontrada' });
    }
  }

  /**
   * Eliminar una relación permiso-rol existente
   */
  public async destroy({ params, response }: HttpContextContract) {
    try {
      const permissionsRole = await PermissionsRole.findOrFail(params.id);
      await permissionsRole.delete();
      response.status(200).json({
        message: 'Relación permiso-rol eliminada exitosamente.',
        data: permissionsRole
      });
    } catch (error) {
      response.status(404).json({ message: 'Relación permiso-rol no encontrada' });
    }
  }
}
