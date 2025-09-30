class ApiResponse {
  constructor(statusCode, data, message = "Success", code) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.code = code;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
