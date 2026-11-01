

#pragma once

#include "interfaces/Shape.h"

class Circle : public Shape {
private:
    double radius_;

public:
    explicit Circle(double radius);

    double getRadius() const noexcept;

    double calculateArea() const override;
};



