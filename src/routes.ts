import express from 'express';
import { celebrate, Joi } from 'celebrate';
import multer from 'multer';
import multerConfig from './config/multer';
import ExampleController from './controllers/exampleController';

const routes = express.Router();
const upload = multer(multerConfig);

const exampleController = new ExampleController();

routes.post(
  '/example',
  upload.single('image'),
  celebrate(
    {
      body: Joi.object().keys({
        //fields
      }),
    },
    {
      abortEarly: false,
    }
  ),
  exampleController.index
);

export default routes;
