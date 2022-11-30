import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}
  public schema = schema.create({
    username: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
      rules.unique({ table: "users", column: "username" }),
      rules.alphaNum(),
    ]),
    name: schema.string([
      rules.minLength(3),
      rules.alpha({ allow: ["space", "underscore", "dash"] }),
    ]),
    password: schema.string([rules.minLength(6), rules.alphaNum()]),
  });

  public messages: CustomMessages = {
    "username.min": "O campo username está muito pequeno",
    "username.max": "O campo username tem mais que 255 caracteres",
    "username.unique": "O campo username inserido já existe",
    "username.alphaNum": "O campo username deve ter somente letras e números",
    "username.string": "Deve ser enviado um texto com letras e números",
    "name.string": "Para o campo name, deve ser enviado um texto",
    "name.alpha":
      "Para o campo name, deve ser enviado um texto somente com letras",
    "name.min": "O campo name está muito pequeno",
    "password.min": "O campo password está inválido",
    "password.string": "O campo password está inválido",
    "password.alphaNum": "O campo password está inválido",
  };
}
