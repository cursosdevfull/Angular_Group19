export class UserDto {
  static fromDataToResponse(data: any) {
    return data.result.response;
  }
}
