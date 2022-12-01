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
      rules.regex(/^[0-9]{8}$/),
    ]),
    deadline: schema.date({}, [rules.afterOrEqual("today")]),
    cost: schema.number(),
  });

  public messages: CustomMessages = {
    "title.min": "O campo title está muito pequeno",
    "title.max": "O campo title tem mais que 255 caracteres",
    "title.alphaNum": "O campo title deve ter somente letras e números",
    "zip_code.regex":
      "O campo zip_code 'cep' está inválido, deve conter somente números",
    "zip_code.min":
      "O campo zip_code 'cep' está inválido, deve ter 8 caracteres",
    "zip_code.max":
      "O campo zip_code 'cep' está inválido, deve ter 8 caracteres",
    "cost.number": "O campo cost é um valor númerico real",
  };
}
