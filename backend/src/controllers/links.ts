import { Request, Response } from 'express';

import LinksRepository from '../models/linksRepository';
import { Link } from '../models/link';
import linksRepository from '../models/linksRepository';

function generateCode() {
  let text = "";
  
  const possible = "ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz0123456789";

  for (let i = 0; i < 5; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

async function getLink(request: Request, response: Response) {
  const code = request.params.code as string;

  const link = await linksRepository.findByCode(code);

  if (!link) {
    response.sendStatus(404);
  } else {
    response.json(link);
  }
}

async function postLink(request: Request, response: Response) {
  const link = request.body as Link;

  link.code = generateCode();

  link.hits = 0;

  const result = await LinksRepository.add(link);

  if (!result.id) return response.sendStatus(400);

  link.id = result.id!;

  response.status(201).json(link);

}

async function hitLink(request: Request, response: Response) {
  const code = request.params.code as string;

  const link = await linksRepository.hit(code);

  if (!link) {
    response.sendStatus(404);
  } else {
    response.json(link);
  }
}

export default {  getLink, postLink, hitLink };