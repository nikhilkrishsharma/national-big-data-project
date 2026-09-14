// Mock API Layer with artificial network latency simulation

const LATENCY_MS = 300;

export const mockFetch = (data, delay = LATENCY_MS) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        status: 200,
        data: JSON.parse(JSON.stringify(data))
      });
    }, delay);
  });
};

export const mockApiError = (message, delay = LATENCY_MS) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(message || "Mock Network Error"));
    }, delay);
  });
};
