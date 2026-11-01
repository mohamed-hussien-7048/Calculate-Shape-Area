# Node.js + C++ OOP Learning Project

A Shapes Management System built with **C++ and Node.js** to demonstrate the four fundamental Object-Oriented Programming principles through a practical application.

## Project Overview

The application calculates the areas of different geometric shapes.

- **C++:** Implements the OOP classes, shape logic, validation, and area calculations.
- **Node.js:** Provides an HTTP REST API and communicates with the C++ executable.
- **Communication:** JSON over standard input and standard output using Node.js `child_process`.

## Technologies

- C++17
- Node.js
- TypeScript
- Express.js
- nlohmann/json
- GCC / MinGW
- PowerShell

## Object-Oriented Programming

### 1. Encapsulation

Implemented in `Circle` and `Rectangle`.

- Shape dimensions are declared as private properties.
- Constructors initialize and validate object data.
- Public getter methods provide controlled access to properties.

### 2. Abstraction

Implemented through the abstract `Shape` class.

- `Shape` defines the `calculateArea()` pure virtual function.
- Derived classes must implement their own area calculation.
- Direct instantiation of `Shape` is not allowed.

### 3. Inheritance

Implemented through:

- `Circle : public Shape`
- `Rectangle : public Shape`

Both classes inherit the common interface from `Shape`.

### 4. Polymorphism

Implemented using virtual functions and base-class pointers.

Different shape objects are accessed through `Shape` pointers, and each object executes its own implementation of `calculateArea()` at runtime.

## Project Structure

```text
NASR_2/
│
├── cpp/
│   ├── include/
│   │   ├── interfaces/
│   │   ├── shapes/
│   │   ├── factories/
│   │   ├── services/
│   │   └── handlers/
│   │
│   ├── src/
│   │   ├── shapes/
│   │   ├── factories/
│   │   ├── services/
│   │   ├── handlers/
│   │   └── main.cpp
│   │
│   ├── tests/
│   └── build/
│
├── backend/
│   ├── src/
│   │   ├── modules/
│   │   │   └── shapes/
│   │   ├── routes/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── .gitignore
└── README.md
```

## Application Architecture

```text
HTTP Client
    |
    v
Express Routes
    |
    v
Shape Controller
    |
    v
Shape Service (Node.js)
    |
    | JSON through stdin
    v
C++ Executable
    |
    v
JsonHandler
    |
    v
ShapeService
    |
    v
ShapeFactory
    |
    +------> Circle
    |
    +------> Rectangle
    |
    v
JSON Response through stdout
    |
    v
Node.js HTTP Response
```

## Requirements

- Node.js and npm
- GCC compiler supporting C++17
- nlohmann/json C++ library
- PowerShell

## C++ Build

Run the following command from the project root:

```powershell
g++ -std=c++17 -Wall -Wextra -Wpedantic -I cpp/include cpp/src/main.cpp cpp/src/handlers/JsonHandler.cpp cpp/src/services/ShapeService.cpp cpp/src/factories/ShapeFactory.cpp cpp/src/shapes/Circle.cpp cpp/src/shapes/Rectangle.cpp -o cpp/build/shapes.exe
```

## C++ Tests

Run:

```powershell
.\cpp\tests\run_tests.ps1
```

The test suite covers:

- Inheritance
- Polymorphism
- Area calculations
- Invalid dimensions
- Non-finite values
- Numeric overflow
- Encapsulation negative compilation test
- Abstraction negative compilation test

## Node.js Setup

Navigate to the backend directory:

```powershell
cd backend
```

Install dependencies:

```powershell
npm install
```

Run TypeScript type checking:

```powershell
npm run typecheck
```

Build the backend:

```powershell
npm run build
```

Start the development server:

```powershell
npm run dev
```

The API runs at:

```text
http://localhost:3000
```

## REST API

### Health Check

```http
GET /api/health
```

### Calculate Shape Area

```http
POST /api/shapes/calculate-area
Content-Type: application/json
```

Circle request:

```json
{
    "shape": "circle",
    "dimensions": [5]
}
```

Rectangle request:

```json
{
    "shape": "rectangle",
    "dimensions": [4, 6]
}
```

Successful response:

```json
{
    "success": true,
    "data": {
        "shape": "circle",
        "area": 78.53981633974483
    }
}
```

Error response:

```json
{
    "success": false,
    "error": {
        "message": "Circle radius must be a positive finite number."
    }
}
```

## Project Objective

The main objective is to understand and apply the four fundamental OOP principles in C++, while integrating the C++ application with a Node.js REST API.

This project demonstrates practical interaction between two programming languages while keeping their responsibilities separate.