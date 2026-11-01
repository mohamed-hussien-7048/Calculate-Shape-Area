
#include "shapes/Circle.h"

#include <cmath>
#include <stdexcept>

Circle::Circle(double radius)
    : radius_(radius) {
    if (!std::isfinite(radius) || radius <= 0.0) {
        throw std::invalid_argument(
            "Circle radius must be a positive finite number."
        );
    }
}

double Circle::getRadius() const noexcept {
    return radius_;
}

double Circle::calculateArea() const {
    constexpr double PI = 3.14159265358979323846;

    const double area = PI * radius_ * radius_;

    if (!std::isfinite(area)) {
        throw std::overflow_error(
            "Circle area exceeds the supported numeric range."
        );
    }

    return area;
}








