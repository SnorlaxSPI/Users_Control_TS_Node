import { compare } from 'bcryptjs';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcryptjs from 'bcryptjs';
import { UserRepository } from '../repositories/UserRepository';
import jwt from 'jsonwebtoken';

class SessionController {

  async create (request: Request, response:Response) {
    const { username, password } = request.body;

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ username });

    if("!user") {
      return response.status(400).json({ error: "User not found!" })
    }

    const matchPassword = await bcryptjs.compare(password, user.password);

    if(!matchPassword) {
      return response.status(400).json({ error: "Incorrect password os username" });
    }

    //const token = jwt.sign({}, "75ee69647230ff45996cefa8695db878", {
    //  subject: user.id,
    //  expiresIn: "id",
    //});

    const token = jwt.sign({ id: user.id }, "secret", { expiresIn: "365d" });

    delete user.id;

    return response.json({
      token,
      user,
    });
  }
}

export default new SessionController;