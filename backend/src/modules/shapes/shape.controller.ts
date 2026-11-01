import type { Request, Response } from "express";

import shapeService from "./shape.service.js";

class ShapeController {
    async calculateArea(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const result = await shapeService.calculateArea(
                request.body
            );

            response.status(200).json(result);
        } catch (error) {
            const message = error instanceof Error
                ? error.message
                : "An unexpected error occurred.";

            response.status(400).json({
                success: false,
                error: {
                    message
                }
            });
        }
    }
}

export default new ShapeController();