export class CourseDto {
  static fromDataToResponse(data: any) {
    return data.result.response;
  }
}
