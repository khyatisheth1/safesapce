import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();
const userController = new UserController();

const setUserRoutes = (app) => {
    router.post('/signup', userController.createUser.bind(userController));
    app.use('/api/users', router);
};

export default setUserRoutes;