import Hash from '@ioc:Adonis/Core/Hash';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import User from 'App/Models/User';
import EmailService from 'App/Services/EmailService';
import SecurityTemplate from 'App/Services/EmailsTemplates/SecurityTemplate';

export default class SeguritiesController {
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input('email');
    const password = request.input('password');

    try {
      const theUser = await User.query().where('email', email).first();

      if (theUser !== null && await Hash.verify(theUser.password, password)) {
        const token = await auth.use('api').generate(theUser, {
          expiresIn: '60 mins',
        });

        let template_email: SecurityTemplate = new SecurityTemplate();
        let html = template_email.newLogin();
        let service_email: EmailService = new EmailService();
        service_email.sendEmail(email, 'Nuevo Inicio de Sesión', html);

        await theUser.load('role');
        theUser.password = '';

        response.status(200).json({
          token: token,
          User: theUser,
        });
      } else {
        response.status(401).json({ message: 'Credenciales inválidas' });
      }
    } catch (error) {
      response.status(404).json({ message: 'Usuario no encontrado', error });
    }
  }

  public async logout({ auth }: HttpContextContract) {
    await auth.use('api').revoke();
    return {
      revoked: true,
    };
  }

  public async forgotPassword({ auth, request, response }: HttpContextContract) {
    const email = request.input('email');

    try {
      const theUser = await User.query().where('email', email).first();

      if (theUser !== null) {
        const token = await auth.use('api').generate(theUser, {
          expiresIn: '60 mins',
        });

        let template_email: SecurityTemplate = new SecurityTemplate();
        let html = template_email.forgotPassword(token.token);
        let service_email: EmailService = new EmailService();
        service_email.sendEmail(email, 'Solicitud restablecimiento de contraseña', html);

        response.status(200).json({
          status: 'success',
          message: 'Revisar el correo electrónico',
        });
      } else {
        response.status(404).json({ message: 'Usuario no encontrado', theUser });
      }
    } catch (error) {
      response.status(404).json({ message: 'Usuario no encontrado' });
    }
  }

  public async resetPassword({ auth, request, response }: HttpContextContract) {
    try {
      await auth.use('api').authenticate();
      const theUser = await User.findBy('email', auth.user!.email);

      if (!theUser) {
        response.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        theUser.password = request.input('password');
        await theUser.save();
        await auth.use('api').revoke();

        response.status(200).json({
          status: 'success',
          message: 'La contraseña se ha restaurado correctamente',
        });
      }
    } catch (error) {
      response.status(401).json({
        status: 'error',
        message: 'Token corrupto',
      });
    }
  }
}
