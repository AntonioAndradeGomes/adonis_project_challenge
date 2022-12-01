import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class SessionsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const username = request.input("username");
    const password = request.input("password");

    try {
      const token = await auth.use("api").attempt(username, password);
      return {
        token: token,
        user: auth.user,
      };
    } catch {
      return response.unauthorized({ message: "Invalid username/password" });
    }
  }


  public async destroy({auth, response}: HttpContextContract){
    await auth.use('api').logout();
    return response.noContent();
  }
}
