#include "shapes/Circle.h"
#include "shapes/Rectangle.h"

#include <cassert>
#include <cmath>
#include <iostream>
#include <stdexcept>

template <typename Operation>
void expectInvalidArgument(Operation operation) {
    bool exceptionThrown = false;

    try {
        operation();
    } catch (const std::invalid_argument&) {
        exceptionThrown = true;
    }

    assert(exceptionThrown);
}

template <typename Operation>
void expectOverflowError(Operation operation) {
    bool exceptionThrown = false;

    try {
        operation();
    } catch (const std::overflow_error&) {
        exceptionThrown = true;
    }

    assert(exceptionThrown);
}

int main() {
    expectInvalidArgument([] {
        Circle circle(0.0);
    });

    expectInvalidArgument([] {
        Circle circle(-5.0);
    });

    expectInvalidArgument([] {
        Circle circle(NAN);
    });

    expectInvalidArgument([] {
        Rectangle rectangle(0.0, 5.0);
    });

    expectInvalidArgument([] {
        Rectangle rectangle(4.0, -3.0);
    });

    expectInvalidArgument([] {
        Rectangle rectangle(INFINITY, 5.0);
    });

    expectOverflowError([] {
        Circle circle(1e200);
        circle.calculateArea();
    });

    expectOverflowError([] {
        Rectangle rectangle(1e200, 1e200);
        rectangle.calculateArea();
    });

    std::cout << "Invalid Radius Test: PASSED\n";
    std::cout << "Invalid Dimensions Test: PASSED\n";
    std::cout << "Non-Finite Values Test: PASSED\n";
    std::cout << "Circle Overflow Test: PASSED\n";
    std::cout << "Rectangle Overflow Test: PASSED\n";

    return 0;
}