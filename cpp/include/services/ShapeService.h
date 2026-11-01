#pragma once

#include "interfaces/Shape.h"

#include <memory>
#include <string>
#include <vector>

class ShapeService {
public:
    double calculateArea(
        const std::string& shapeType,
        const std::vector<double>& dimensions
    ) const;
};