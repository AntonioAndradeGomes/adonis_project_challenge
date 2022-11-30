import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UserValidator from 'App/Validators/UserValidator';
import UserValidatorUpdateValidator from 'App/Validators/UserValidatorUpdateValidator';

export default class UsersController {

  //listar todos os users - get
  public async index({}: HttpContextContract) {
    const users = await User.all();
    return {'users' : users};
  }

  //post - criar um user
  public async store({
    request, response
  }: HttpContextContract) {
    const data = await request.validate(UserValidator);
    const user = await User.create(data);
    return  response.created({user: user});
  }

  //listar um user
  public async show({request}: HttpContextContract) {
    const userId = request.param('id');
    const user = await User.find(userId);
    return {'user' : user};
  }

  //atualizar um user
  public async update({request, response}: HttpContextContract) {
    const userId = request.param('id');
    const body = await request.validate(UserValidatorUpdateValidator);
    const user = await User.find(userId);
    if(user == null){
      return response.badRequest({message: "User não encontrado"});
    }
    await user.merge(body).save();
    return {user: user};
  }

  //remover um user
  public async destroy({request, response}: HttpContextContract) {
    const userId = request.param('id');
    const user = await User.find(userId);
    if(user == null){
      return response.badRequest({message: "User não encontrado"});
    }
    await user.delete();
    return response.noContent();
  }
}
