import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from '../models/User';

class SessionController {
  async authenticate(request:Request, response:Response) {

    const repository = getRepository(User);
    const { name, username, password } = request.body;

    const user = await repository.findOne({ where: { username } });

    if (!user) {
      return response.status(409).json({ message: 'User not found!'});
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);

    if(!isValidPassword) {
      return response.status(409).json({ message: 'Password not found!'});
    }

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "365d" });

    delete user.id;

    return response.json({
      user,
      token,
    });
  }
}

export default new SessionController;
