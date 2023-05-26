import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ApiToken from 'App/Models/ApiToken';

export default class ApiTokensController {
    /**
     * Lista todos los ApiTokens
     */
     public async index(ctx:HttpContextContract){
        let ApiTokens:ApiToken[]=await ApiToken.query()
        return ApiTokens;
    }
    /**
     * Almacena la información de un ApiToken
     */
    public async store({request}:HttpContextContract){
        const body=request.body();
        const newApiToken:ApiToken=await ApiToken.create(body);
        return newApiToken;
    }
    /**
     * Muestra la información de un solo ApiToken
     */
    public async show({params}:HttpContextContract) {
        let theApiToken=await ApiToken.query().where("id",params.id);
        return theApiToken;
    }
    /**
     * Actualiza la información de un ApiToken basado
     * en el identificador y nuevos parámetros
     */
    public async update({params,request}:HttpContextContract) {
        const body=request.body();
        const theApiToken:ApiToken=await ApiToken.findOrFail(params.id);
        theApiToken.name=body.name;
        theApiToken.type=body.type;
        theApiToken.token=body.token;
        theApiToken.user_id=body.user_id;
        return theApiToken.save();
    }
    /**
     * Elimina a un ApiToken basado en el identificador
     */
    public async destroy({params}:HttpContextContract) {
        const theApiToken:ApiToken=await ApiToken.findOrFail(params.id);
        return theApiToken.delete();
    }
}
