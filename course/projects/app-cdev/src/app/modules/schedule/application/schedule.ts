export type STATUS = 'published' | 'draft';

export class Schedule {
  scheduleId!: number;
  courseId!: string;
  title!: string;
  slug!: string;
  status!: STATUS;
}
