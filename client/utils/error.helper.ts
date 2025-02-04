export interface AsyncResult<T> {
  data?: T;
  error?: any;
}

export async function handleAsync<T>(
  promise: Promise<T>
): Promise<AsyncResult<T>> {
  try {
    const data = await promise;
    return { data };
  } catch (error) {
    console.error("Error capturado:", error);
    return { error };
  }
}
