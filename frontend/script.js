```javascript
const form = document.getElementById("form");
const shape = document.getElementById("shape");
const dimensions = document.getElementById("dimensions");
const result = document.getElementById("result");

function createInput(id, placeholder) {
    const input = document.createElement("input");

    input.type = "number";
    input.id = id;
    input.placeholder = placeholder;
    input.step = "any";
    input.required = true;

    return input;
}

function renderInputs() {
    dimensions.innerHTML = "";

    if (shape.value === "circle") {
        dimensions.appendChild(
            createInput("radius", "Radius")
        );
    } else {
        dimensions.appendChild(
            createInput("width", "Width")
        );

        dimensions.appendChild(
            createInput("height", "Height")
        );
    }
}

function getDimensions() {
    if (shape.value === "circle") {
        return [
            Number(document.getElementById("radius").value)
        ];
    }

    return [
        Number(document.getElementById("width").value),
        Number(document.getElementById("height").value)
    ];
}

function showResult(data) {
    if (data.success) {
        result.textContent = `Area: ${data.data.area}`;
    } else {
        result.textContent = `Error: ${data.error.message}`;
    }
}

async function calculateArea(event) {
    event.preventDefault();

    result.textContent = "Calculating...";

    try {
        const response = await fetch(
            "/api/shapes/calculate-area",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shape: shape.value,
                    dimensions: getDimensions()
                })
            }
        );

        const data = await response.json();

        showResult(data);
    } catch (error) {
        result.textContent = "Server connection failed.";
    }
}

shape.addEventListener("change", renderInputs);
form.addEventListener("submit", calculateArea);

renderInputs();
```
