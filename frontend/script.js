const API_URL = "/api/shapes/calculate-area";

const shapeOptions = document.querySelectorAll(".shape-option");
const dimensionsContainer = document.getElementById("dimensions-container");
const calculatorForm = document.getElementById("calculator-form");

const calculateButton = document.getElementById("calculate-button");
const buttonText = document.getElementById("button-text");

const errorMessage = document.getElementById("error-message");
const resultSection = document.getElementById("result-section");

const areaValue = document.getElementById("area-value");
const resultShape = document.getElementById("result-shape");

const connectionStatus = document.querySelector(".connection-status");

let selectedShape = "circle";

function createInput(id, label) {
    const formGroup = document.createElement("div");

    formGroup.className = "form-group";

    const inputLabel = document.createElement("label");
    inputLabel.htmlFor = id;
    inputLabel.textContent = label;

    const inputWrapper = document.createElement("div");
    inputWrapper.className = "input-wrapper";

    const input = document.createElement("input");

    input.type = "number";
    input.id = id;
    input.name = id;
    input.placeholder = `Enter ${label.toLowerCase()}`;
    input.min = "0.000001";
    input.step = "any";
    input.required = true;

    const unit = document.createElement("span");

    unit.className = "input-unit";
    unit.textContent = "units";

    inputWrapper.append(input, unit);
    formGroup.append(inputLabel, inputWrapper);

    return formGroup;
}

function renderDimensions() {
    dimensionsContainer.replaceChildren();

    if (selectedShape === "circle") {
        dimensionsContainer.append(
            createInput("radius", "Radius")
        );

        return;
    }

    dimensionsContainer.append(
        createInput("width", "Width"),
        createInput("height", "Height")
    );
}

function selectShape(shape) {
    selectedShape = shape;

    shapeOptions.forEach((option) => {
        option.classList.toggle(
            "active",
            option.dataset.shape === shape
        );
    });

    renderDimensions();
    clearMessages();
}

function clearMessages() {
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    resultSection.classList.add("hidden");
}

function showError(message) {
    resultSection.classList.add("hidden");

    errorMessage.textContent = message;
    errorMessage.classList.remove("hidden");
}

function showResult(result) {
    errorMessage.classList.add("hidden");

    areaValue.textContent = Number(result.data.area).toLocaleString(
        "en-US",
        {
            maximumFractionDigits: 10
        }
    );

    resultShape.textContent =
        result.data.shape.charAt(0).toUpperCase() +
        result.data.shape.slice(1);

    resultSection.classList.remove("hidden");
}

function getDimensions() {
    if (selectedShape === "circle") {
        return [
            Number(document.getElementById("radius").value)
        ];
    }

    return [
        Number(document.getElementById("width").value),
        Number(document.getElementById("height").value)
    ];
}

function validateDimensions(dimensions) {
    return dimensions.every(
        (dimension) =>
            Number.isFinite(dimension) &&
            dimension > 0
    );
}

async function calculateArea(event) {
    event.preventDefault();

    clearMessages();

    if (!calculatorForm.reportValidity()) {
        return;
    }

    const dimensions = getDimensions();

    if (!validateDimensions(dimensions)) {
        showError("All dimensions must be positive finite numbers.");
        return;
    }

    calculateButton.disabled = true;
    buttonText.textContent = "Calculating...";

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                shape: selectedShape,
                dimensions
            })
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.error?.message ??
                "Unable to calculate the shape area."
            );
        }

        showResult(result);
    } catch (error) {
        showError(
            error instanceof Error
                ? error.message
                : "An unexpected error occurred."
        );
    } finally {
        calculateButton.disabled = false;
        buttonText.textContent = "Calculate Area";
    }
}

async function checkApiConnection() {
    try {
        const response = await fetch("/api/health");

        if (!response.ok) {
            throw new Error("API unavailable");
        }

        connectionStatus.querySelector("span:last-child").textContent =
            "API Connected";

        connectionStatus.classList.remove("disconnected");
    } catch {
        connectionStatus.querySelector("span:last-child").textContent =
            "API Disconnected";

        connectionStatus.classList.add("disconnected");
    }
}

shapeOptions.forEach((option) => {
    option.addEventListener("click", () => {
        selectShape(option.dataset.shape);
    });
});

calculatorForm.addEventListener("submit", calculateArea);

renderDimensions();
checkApiConnection();