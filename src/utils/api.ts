interface APIError {
    response: {
      status: number;
      data: {
        message: string;
      };
    };
}

export default function isAPIError(error: unknown): error is APIError {
    return (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as APIError).response === "object" &&
      "status" in (error as APIError).response &&
      "data" in (error as APIError).response &&
      typeof (error as APIError).response.data.message === "string"
    );
  }