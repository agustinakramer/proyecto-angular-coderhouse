export interface Course {
  id: number;
  name: string;
  description: string;
  beginDate: Date;
  endDate: Date;
  status: CourseStatus;
}

export enum CourseStatus {
    STARTED = 'Started',
    SCHEDULED = 'Scheduled',
    FINISHED = 'Finished',
    CANCELLED = 'Cancelled'
}

export const courseColumns: string[] = ['id', 'name', 'description', 'beginDate', 'endDate', 'status'];
