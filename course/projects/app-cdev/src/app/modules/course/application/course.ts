export type STATUS = 'published' | 'draft';

export class Course {
  courseId!: string;
  title!: string;
  slug!: string;
  status!: STATUS;
}
