import { AsyncResult } from "@/interfaces/AsyncResul.interface";

export const handleAsync = async <T>(
  promise: Promise<T>
): Promise<AsyncResult<T>> => {
  try {
    const response = await promise;
    return { data: response };
  } catch (error: any) {
    console.error("Error en handleAsync:", error);

    return {
      error: error.response ? error.response.data : { message: error.message },
    };
  }
};
