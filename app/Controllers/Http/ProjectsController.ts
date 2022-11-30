import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import Project from "App/Models/Project";
import User from "App/Models/User";
import ProjectValidator from "App/Validators/ProjectValidator";
import ProjectValidatorUpdateValidator from "App/Validators/ProjectValidatorUpdateValidator";
import axios from "axios";

export default class ProjectsController {
  //criar um project
  public async store({ request, response }: HttpContextContract) {
    //pegar username do header
    const username = request.header("username");
    if (username == null) {
      return response.preconditionFailed({
        message: "não foi informado um username válido no header",
      });
    }
    //buscar usuario com o header buscado
    const user = await User.findBy("username", username);
    if (user == null) {
      return response.notFound({
        message: "User informado no header não foi encontrado",
      });
    }
    //validar o corpo da requisição
    const body = await request.validate(ProjectValidator);
    body["userId"] = user!.id;
    //criar o project
    const project = await Project.create(body);
    return response.created({
      id: project.id,
      title: project.title,
      zip_code: project.zip_code,
      cost: project.cost,
      done: project.done ?? false,
      deadline: project.deadline,
      username: username,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
    });
  }

  //listar todos os projects ou os projects do user passado no header
  public async index({ request, response }: HttpContextContract) {
    //recuperar o username do header
    const username = request.header("username");
    if (username != null) {
      //procurar se há user com este username
      const user = await User.findBy("username", username);
      if (user == null) {
        return response.notFound({
          message: "User informado no header não foi encontrado",
        });
      }
      //pegar todos os projects do user
      const projects = await Database.rawQuery(
        `select  p.id, p.title, p.zip_code, p.cost, p.done, p.deadline, u.username, p.created_at, p.updated_at
        from projects p, users u
        where p.user_id = u.id and u.id = ?`,
        [user!.id]
      );
      return projects.rows;
    }
    const projects = await Database.rawQuery(
      `select  p.id, p.title, p.zip_code, p.cost, p.done, p.deadline, u.username, p.created_at, p.updated_at
      from projects p, users u
      where p.user_id = u.id`
    );
    return projects.rows;
  }

  //buscar um project pelo id
  public async show({ request }: HttpContextContract) {
    //pegar o id dos parametros
    const projectId = request.param("id");
    //buscar o projeto e o usuario
    const project = await Project.findOrFail(projectId);
    await project.load("user");

    //buscar a localização com o axios
    const search = await axios.get(
      "https://viacep.com.br/ws/" + project.zip_code + "/json/"
    );
    //todo: tratar erros na busca do via cep

    //retornar o que foi pedido
    return {
      id: project.id,
      title: project.title,
      localization: search.data,
      cost: project.cost,
      done: project.done,
      deadline: project.deadline,
      username: project.user.username,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
    };
  }

  //deletar um project
  public async destroy({ request, response }: HttpContextContract) {
    //pegar o id dos parametros
    const projectId = request.param("id");
    //pegar username do header
    const username = request.header("username");
    if (username == null) {
      return response.preconditionFailed({
        message: "não foi informado um username válido no header",
      });
    }
    //buscar projeto do usuario
    const user = await User.findBy("username", username);
    if (user == null) {
      return response.notFound({
        message: "User informado no header não foi encontrado",
      });
    }
    const project = await Project.find(projectId);
    if (project == null || project.userId != user.id) {
      return response.notFound({
        message: "Project com esse id não foi encontrado",
      });
    }
    await project.delete();
    return response.noContent();
  }

  public async update({ response, request }: HttpContextContract) {
    //pegar o id dos parametros
    const projectId = request.param("id");
    //pegar username do header
    const username = request.header("username");
    if (username == null) {
      return response.preconditionFailed({
        message: "não foi informado um username válido no header",
      });
    }
    //buscar projeto do usuario
    const user = await User.findBy("username", username);
    if (user == null) {
      return response.notFound({
        message: "User informado no header não foi encontrado",
      });
    }
    const project = await Project.find(projectId);
    if (project == null || project.userId != user.id) {
      return response.notFound({
        message: "Project com esse id não foi encontrado",
      });
    }
    //validar o corpo da requisição
    const body = await request.validate(ProjectValidatorUpdateValidator);
    await project.merge(body).save();
    return {
      id: project.id,
      title: project.title,
      zip_code: project.zip_code,
      cost: project.cost,
      done: project.done,
      deadline: project.deadline,
      username: username,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
    };
  }

  public async updateDone({ response, request }: HttpContextContract) {
    //pegar o id dos parametros
    const projectId = request.param("id");
    //pegar username do header
    const username = request.header("username");
    if (username == null) {
      return response.preconditionFailed({
        message: "não foi informado um username válido no header",
      });
    }
    //buscar projeto do usuario
    const user = await User.findBy("username", username);
    if (user == null) {
      return response.notFound({
        message: "User informado no header não foi encontrado",
      });
    }
    const project = await Project.find(projectId);
    if (project == null || project.userId != user.id) {
      return response.notFound({
        message: "Project com esse id não foi encontrado",
      });
    }
    await project.merge({ done: true }).save();
    return {
      id: project.id,
      title: project.title,
      zip_code: project.zip_code,
      cost: project.cost,
      done: project.done,
      deadline: project.deadline,
      username: username,
      created_at: project.createdAt,
      updated_at: project.updatedAt,
    };
  }
}
