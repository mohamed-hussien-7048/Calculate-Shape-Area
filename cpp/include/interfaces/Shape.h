
#pragma once

class Shape {
public:
    virtual ~Shape() = default;

    virtual double calculateArea() const = 0;
};
