#include "handlers/JsonHandler.h"

#include <iostream>
#include <string>

int main() {
    try {
        std::string input;

        if (!std::getline(std::cin, input)) {
            throw std::invalid_argument(
                "No input received."
            );
        }

        const nlohmann::json request =
            nlohmann::json::parse(input);

        const JsonHandler jsonHandler;

        const nlohmann::json response =
            jsonHandler.process(request);

        std::cout << response.dump() << '\n';

        return 0;

    } catch (const std::exception& exception) {
        const nlohmann::json errorResponse = {
            {"success", false},
            {
                "error",
                {
                    {"message", exception.what()}
                }
            }
        };

        std::cout << errorResponse.dump() << '\n';

        return 1;
    }
}