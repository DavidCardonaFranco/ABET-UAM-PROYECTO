import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import IndicatorsRubric from 'App/Models/IndicatorRubric';

export default class IndicatorsRubricsController {
  public async index({ response }: HttpContextContract) {
    try {
      const indicatorsRubrics = await IndicatorsRubric.all();
      response.status(200).json({
        message: 'Lista de indicadores de rúbrica obtenida exitosamente.',
        data: indicatorsRubrics
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al obtener la lista de indicadores de rúbrica.' });
    }
  }

  public async store({ request, response }: HttpContextContract) {
    try {
      const data = request.only(['id_rubric', 'id_indicator']);
      const indicatorsRubric = await IndicatorsRubric.create(data);
      response.status(201).json({
        message: 'Indicador de rúbrica creado exitosamente.',
        data: indicatorsRubric
      });
    } catch (error) {
      response.status(500).json({ message: 'Error al crear el indicador de rúbrica.' });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const indicatorsRubric = await IndicatorsRubric.findOrFail(params.id);
      response.status(200).json({
        message: 'Información del indicador de rúbrica obtenida exitosamente.',
        data: indicatorsRubric
      });
    } catch (error) {
      response.status(404).json({ message: 'Indicador de rúbrica no encontrado' });
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const indicatorsRubric = await IndicatorsRubric.findOrFail(params.id);
      const data = request.only(['id_rubric', 'id_indicator']);
      indicatorsRubric.merge(data);
      await indicatorsRubric.save();
      response.status(200).json({
        message: 'Indicador de rúbrica actualizado exitosamente.',
        data: indicatorsRubric
      });
    } catch (error) {
      response.status(404).json({ message: 'Indicador de rúbrica no encontrado' });
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try {
      const indicatorsRubric = await IndicatorsRubric.findOrFail(params.id);
      await indicatorsRubric.delete();
      response.status(200).json({
        message: 'Indicador de rúbrica eliminado exitosamente.',
        data: indicatorsRubric
      });
    } catch (error) {
      response.status(404).json({ message: 'Indicador de rúbrica no encontrado' });
    }
  }
}
