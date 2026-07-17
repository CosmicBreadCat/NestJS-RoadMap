type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  status: "success" | "error";
  loading: boolean;
};

type User = {
  id: number;
  userName: string;
  email: string;
  type: "consumer" | "admin";
};

type Product = { id: number; name: string; cost: number; stock: number };

type FetchResult = {
  ok: boolean;
  status: number;
  json: () => Promise<unknown>;
};

async function fakeFetch(url: string, delayMS: number): Promise<FetchResult> {
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
      } else if (url === "https://www.myapi.com/get-product") {
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
      } else if (url === "https://www.myapi.com/network-down") {
        reject(new Error("Network request failed"));
      } else {
        resolve({
          ok: false,
          status: 404,
          json: async () => ({ message: "Not found" }),
        });
      }
    }, delayMS);
  });
}

async function fetchData<T>(url: string): Promise<ApiResponse<T>> {
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

    //casting fetch res.json to type T
    const parsed = (await result.json()) as T;

    return {
      data: parsed,
      error: null,
      status: "success",
      loading: false,
    };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      status: "error",
      loading: false,
    };
  }
}

function handleResponse<T>(res: ApiResponse<T>) {
  if (res.status === "success") {
    console.log("Success:", res.data);
  } else {
    console.error("Error:", res.error);
  }
}

async function main() {
  const userRes = await fetchData<User>("https://www.myapi.com/get-user");
  handleResponse(userRes);

  const productRes = await fetchData<Product>(
    "https://www.myapi.com/get-product",
  );
  handleResponse(productRes);

  const badRes = await fetchData<User>("https://www.myapi.com/not-a-real-url");
  handleResponse(badRes);

  const networkErrRes = await fetchData<User>(
    "https://www.myapi.com/network-down",
  );
  handleResponse(networkErrRes);
}

main();
