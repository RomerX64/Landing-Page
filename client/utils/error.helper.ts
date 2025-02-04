export interface AsyncResult<T> {
  data?: T;
  error?: any;
}

export const handleAsync = async (promise: Promise<any>) => {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    console.error(error); // Log the actual error
    return { data: null, error }; // Return error in case of failure
  }
};
