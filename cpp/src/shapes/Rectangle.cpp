
#include "shapes/Rectangle.h"

#include <cmath>
#include <stdexcept>

Rectangle::Rectangle(double width, double height)
    : width_(width),
      height_(height) {
    if (!std::isfinite(width) || width <= 0.0) {
        throw std::invalid_argument(
            "Rectangle width must be a positive finite number."
        );
    }

    if (!std::isfinite(height) || height <= 0.0) {
        throw std::invalid_argument(
            "Rectangle height must be a positive finite number."
        );
    }
}

double Rectangle::getWidth() const noexcept {
    return width_;
}

double Rectangle::getHeight() const noexcept {
    return height_;
}

double Rectangle::calculateArea() const {
    const double area = width_ * height_;

    if (!std::isfinite(area)) {
        throw std::overflow_error(
            "Rectangle area exceeds the supported numeric range."
        );
    }

    return area;
}


