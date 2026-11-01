import { Router } from "express";

import shapeController from "./shape.controller.js";

const shapeRouter = Router();

shapeRouter.post(
    "/calculate-area",
    shapeController.calculateArea
);

export default shapeRouter;