import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ProjectValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string([
      rules.minLength(3),
      rules.maxLength(255),
      rules.alphaNum({ allow: ["space", "underscore", "dash"] }),
    ]),
    zip_code: schema.string([
      rules.minLength(8),
      rules.maxLength(8),
      rules.alphaNum(),
    ]),
    deadline: schema.date(),
    cost: schema.number(),
  });
  //todo: costumizar mensagens
  public messages: CustomMessages = {};
}
