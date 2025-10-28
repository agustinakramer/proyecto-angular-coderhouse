import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName',
  standalone: false
})
export class FullNamePipe implements PipeTransform {
  transform(student: { name: string; lastName: string; } | null | undefined): string {
    if (!student) return '';
    return `${student.name} ${student.lastName}`;
  }
}
