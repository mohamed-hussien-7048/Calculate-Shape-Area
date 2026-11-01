
#pragma once

#include "interfaces/Shape.h"

class Rectangle : public Shape {
private:
    double width_;
    double height_;

public:
    Rectangle(double width, double height);

    double getWidth() const noexcept;

    double getHeight() const noexcept;

    double calculateArea() const override;
};



