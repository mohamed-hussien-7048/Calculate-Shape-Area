#include "handlers/JsonHandler.h"

#include "services/ShapeService.h"

#include <stdexcept>
#include <string>
#include <vector>

nlohmann::json JsonHandler::process(
    const nlohmann::json& request
) const {
    if (!request.is_object()) {
        throw std::invalid_argument(
            "Request must be a JSON object."
        );
    }

    if (!request.contains("shape") ||
        !request["shape"].is_string()) {
        throw std::invalid_argument(
            "Shape must be a string."
        );
    }

    if (!request.contains("dimensions") ||
        !request["dimensions"].is_array()) {
        throw std::invalid_argument(
            "Dimensions must be an array."
        );
    }

    const std::string shapeType = request["shape"];

    std::vector<double> dimensions;

    for (const auto& dimension : request["dimensions"]) {
        if (!dimension.is_number()) {
            throw std::invalid_argument(
                "Every dimension must be a number."
            );
        }

        dimensions.push_back(dimension.get<double>());
    }

    const ShapeService shapeService;

    const double area = shapeService.calculateArea(
        shapeType,
        dimensions
    );

    return {
        {"success", true},
        {
            "data",
            {
                {"shape", shapeType},
                {"area", area}
            }
        }
    };
}