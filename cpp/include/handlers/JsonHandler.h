#pragma once

#include <nlohmann/json.hpp>

class JsonHandler {
public:
    nlohmann::json process(const nlohmann::json& request) const;
};