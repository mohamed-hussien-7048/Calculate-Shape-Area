import { spawn } from "node:child_process";
import { resolve } from "node:path";

interface ShapeRequest {
    shape: string;
    dimensions: number[];
}

interface ShapeResponse {
    success: boolean;
    data?: {
        shape: string;
        area: number;
    };
    error?: {
        message: string;
    };
}

class ShapeService {
    async calculateArea(
        request: ShapeRequest
    ): Promise<ShapeResponse> {
        return new Promise((resolvePromise, rejectPromise) => {
            const executablePath = resolve(
                process.cwd(),
                "../cpp/build/shapes.exe"
            );

            const processInstance = spawn(executablePath, [], {
                stdio: ["pipe", "pipe", "pipe"]
            });

            let output = "";
            let errorOutput = "";

            processInstance.stdout.setEncoding("utf8");
            processInstance.stderr.setEncoding("utf8");

            processInstance.stdout.on("data", (chunk: string) => {
                output += chunk;
            });

            processInstance.stderr.on("data", (chunk: string) => {
                errorOutput += chunk;
            });

            processInstance.on("error", (error) => {
                rejectPromise(
                    new Error(`Failed to start C++ process: ${error.message}`)
                );
            });

            processInstance.on("close", (exitCode) => {
                if (exitCode !== 0) {
                    try {
                        const response: ShapeResponse = JSON.parse(output);
                        rejectPromise(
                            new Error(
                                response.error?.message ??
                                "C++ calculation failed."
                            )
                        );
                    } catch {
                        rejectPromise(
                            new Error(
                                errorOutput ||
                                "C++ process terminated unexpectedly."
                            )
                        );
                    }

                    return;
                }

                try {
                    const response: ShapeResponse = JSON.parse(output);
                    resolvePromise(response);
                } catch {
                    rejectPromise(
                        new Error("C++ returned an invalid JSON response.")
                    );
                }
            });

            processInstance.stdin.end(
                JSON.stringify(request) + "\n"
            );
        });
    }
}

export default new ShapeService();