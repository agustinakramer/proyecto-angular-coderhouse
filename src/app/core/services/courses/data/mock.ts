import { Course, CourseStatus } from '../../models/Course';

export const MOCK_COURSES: Course[] = [
    {
        id: 1,
        name: 'Angular',
        description: 'En este curso aprenderás los fundamentos de Angular, un framework de desarrollo web de código abierto mantenido por Google.',
        beginDate: new Date('2023-01-01'),
        endDate: new Date('2023-12-31'),
        status: CourseStatus.SCHEDULED
    },
    {
        id: 2,
        name: 'React',
        description: 'Aprende los conceptos básicos de React, una biblioteca de JavaScript para construir interfaces de usuario.',
        beginDate: new Date('2023-02-01'),
        endDate: new Date('2023-11-30'),
        status: CourseStatus.CANCELLED
    },
    {
        id: 3,
        name: 'Vue.js',
        description: 'Aprende los conceptos básicos de Vue.js, un framework progresivo para construir interfaces de usuario.',
        beginDate: new Date('2023-03-01'),
        endDate: new Date('2023-10-31'),
        status: CourseStatus.STARTED
    },
    {
        id: 4,
        name: 'NESTJS',
        description: 'Aprende los conceptos básicos de NESTJS, un framework progresivo para construir aplicaciones del lado del servidor con Node.js.',  
        beginDate: new Date('2023-04-01'),
        endDate: new Date('2023-09-30'),
        status: CourseStatus.FINISHED
    }
];