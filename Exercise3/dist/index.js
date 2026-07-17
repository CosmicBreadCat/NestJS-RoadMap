"use strict";
async function fakeFetch(url, delayMS) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url === "https://www.myapi.com/get-user") {
                resolve({
                    ok: true,
                    status: 200,
                    json: async () => ({
                        id: 1,
                        userName: "John Doe",
                        email: "jdoe@example.com",
                        type: "consumer",
                    }),
                });
            }
            else if (url === "https://www.myapi.com/get-product") {
                resolve({
                    ok: true,
                    status: 200,
                    json: async () => ({
                        id: 1,
                        name: "Philosopher's Stone",
                        cost: 9.99,
                        stock: 42,
                    }),
                });
            }
            else if (url === "https://www.myapi.com/network-down") {
                reject(new Error("Network request failed"));
            }
            else {
                resolve({
                    ok: false,
                    status: 404,
                    json: async () => ({ message: "Not found" }),
                });
            }
        }, delayMS);
    });
}
async function fetchData(url) {
    try {
        const result = await fakeFetch(url, 500);
        if (!result.ok) {
            return {
                data: null,
                error: `Request failed with status ${result.status}`,
                status: "error",
                loading: false,
            };
        }
        const parsed = (await result.json());
        return {
            data: parsed,
            error: null,
            status: "success",
            loading: false,
        };
    }
    catch (err) {
        return {
            data: null,
            error: err instanceof Error ? err.message : "Unknown error",
            status: "error",
            loading: false,
        };
    }
}
function handleResponse(res) {
    if (res.status === "success") {
        console.log("Success:", res.data);
    }
    else {
        console.error("Error:", res.error);
    }
}
async function main() {
    const userRes = await fetchData("https://www.myapi.com/get-user");
    handleResponse(userRes);
    const productRes = await fetchData("https://www.myapi.com/get-product");
    handleResponse(productRes);
    const badRes = await fetchData("https://www.myapi.com/not-a-real-url");
    handleResponse(badRes);
    const networkErrRes = await fetchData("https://www.myapi.com/network-down");
    handleResponse(networkErrRes);
}
main();
