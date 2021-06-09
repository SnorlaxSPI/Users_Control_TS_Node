import "reflect-metadata";
import { Router } from 'express';
import UserController  from './controllers/UserController';
import SessionController from './controllers/SessionController';

const router = Router();

router.post('/users', UserController.store);
router.post('/sessions', SessionController.authenticate);

export { router };