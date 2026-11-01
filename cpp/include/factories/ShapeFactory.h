#pragma once

#include "interfaces/Shape.h"

#include <memory>
#include <string>
#include <vector>

class ShapeFactory {
public:
    static std::unique_ptr<Shape> create(
        const std::string& shapeType,
        const std::vector<double>& dimensions
    );
};