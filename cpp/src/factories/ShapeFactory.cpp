#include "factories/ShapeFactory.h"

#include "shapes/Circle.h"
#include "shapes/Rectangle.h"

#include <stdexcept>

std::unique_ptr<Shape> ShapeFactory::create(
    const std::string& shapeType,
    const std::vector<double>& dimensions
) {
    if (shapeType == "circle") {
        if (dimensions.size() != 1) {
            throw std::invalid_argument(
                "Circle requires exactly one dimension."
            );
        }

        return std::make_unique<Circle>(dimensions[0]);
    }

    if (shapeType == "rectangle") {
        if (dimensions.size() != 2) {
            throw std::invalid_argument(
                "Rectangle requires exactly two dimensions."
            );
        }

        return std::make_unique<Rectangle>(
            dimensions[0],
            dimensions[1]
        );
    }

    throw std::invalid_argument("Unsupported shape type.");
}