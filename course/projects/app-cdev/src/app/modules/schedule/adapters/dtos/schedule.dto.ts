export class ScheduleDto {
  static fromDataToResponse(data: any) {
    return data.result.response;
  }
}
