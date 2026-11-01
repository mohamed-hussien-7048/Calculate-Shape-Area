#include "services/ShapeService.h"

#include "factories/ShapeFactory.h"

double ShapeService::calculateArea(
    const std::string& shapeType,
    const std::vector<double>& dimensions
) const {
    std::unique_ptr<Shape> shape =
        ShapeFactory::create(shapeType, dimensions);

    return shape->calculateArea();
}