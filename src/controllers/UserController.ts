import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { User } from '../models/User';

class UserController {
  async store(request:Request, response:Response) {

    const repository = getRepository(User);
    const { name, username, password } = request.body;

    const userExists = await repository.findOne({ where: { username } });

    if (userExists) {
      return response.status(409).json({ message: 'User already exists!'});
    }

    const user = repository.create({
      name,
      username,
      password,
     });

    await repository.save(user);
    
    return response.json(user);
  }
}

export default new UserController;