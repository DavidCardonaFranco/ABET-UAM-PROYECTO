import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Indicator from 'App/Models/Indicator';

export default class IndicatorsController {
  public async index({ response }: HttpContextContract) {
    try {
      const indicators = await Indicator.all();
      response.status(200).json({
        message: 'Lista de indicadores obtenida exitosamente.',
        data: indicators
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de indicadores.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['name', 'expected_value', 'real_value', 'id_outcome']);
      const indicator = await Indicator.create(data);
      response.status(201).json({
        message: 'Indicador creado exitosamente.',
        data: indicator
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el indicador.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const indicator = await Indicator.findOrFail(params.id);
      response.status(200).json({
        message: 'Información del indicador obtenida exitosamente.',
        data: indicator
      });
    } catch (error) {
      response.status(404).json({ message: 'Indicador no encontrado' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const indicator = await Indicator.findOrFail(params.id);
      const data = request.only(['name', 'expected_value', 'real_value', 'id_outcome']);
      indicator.merge(data);
      await indicator.save();
      response.status(200).json({
        message: 'Indicador actualizado exitosamente.',
        data: indicator
      });
    } catch (error) {
      response.status(404).json({ message: 'Indicador no encontrado' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const indicator = await Indicator.findOrFail(params.id);
      await indicator.delete();
      response.status(200).json({
        message: 'Indicador eliminado exitosamente.',
        data: indicator
      });
    } catch (error) {
      response.status(404).json({ message: 'Indicador no encontrado' });
    }
  }
}
