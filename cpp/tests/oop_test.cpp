
#include "interfaces/Shape.h"
#include "shapes/Circle.h"
#include "shapes/Rectangle.h"

#include <cassert>
#include <cmath>
#include <iostream>
#include <type_traits>

static_assert(std::is_base_of_v<Shape, Circle>);
static_assert(std::is_base_of_v<Shape, Rectangle>);

int main() {
    Circle circle(5.0);
    Rectangle rectangle(4.0, 6.0);

    const Shape* shapes[] = {
        &circle,
        &rectangle
    };

    const double expectedAreas[] = {
        78.53981633974483,
        24.0
    };

    for (int i = 0; i < 2; ++i) {
        const double actualArea = shapes[i]->calculateArea();

        assert(std::abs(actualArea - expectedAreas[i]) < 0.000001);
    }

    std::cout << "Inheritance Test: PASSED\n";
    std::cout << "Polymorphism Test: PASSED\n";
    std::cout << "Area Calculation Test: PASSED\n";

    return 0;
}
