import { schema, CustomMessages, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ProjectValidatorUpdateValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    title: schema.string.optional([
      rules.minLength(3),
      rules.maxLength(255),
      rules.alphaNum({ allow: ["space", "underscore", "dash"] }),
    ]),
    zip_code: schema.string.optional([
      rules.minLength(8),
      rules.maxLength(8),
      rules.alphaNum(),
    ]),
    deadline: schema.date.optional(),
    cost: schema.number.optional(),
  });
  //todo: costumizar mensagens
  public messages: CustomMessages = {};
}
