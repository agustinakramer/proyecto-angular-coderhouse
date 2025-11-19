import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { MOCK_COURSES } from './data/mock';
import { API_URL } from '../../utils/constants';
import { Course, CourseStatus } from '../models/Course';
import { take } from 'rxjs/operators';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;
  const coursesUrl = `${API_URL}/courses`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService]
    });

    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);

    const req = httpMock.expectOne(coursesUrl);
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_COURSES);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit courses after initialization', (done) => {
    service.courses$.pipe(take(1)).subscribe(courses => {
      expect(courses).toEqual(MOCK_COURSES);
      done();
    });
  });

  it('getCourse should perform GET with id', (done) => {
    const target = MOCK_COURSES[1];
    service.getCourse(Number(target.id)).subscribe(course => {
      expect(course).toEqual(target);
      done();
    });

    const req = httpMock.expectOne(`${coursesUrl}/${target.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(target);
  });

  it('addCourse should POST and update courses$', (done) => {
    const newCourse: Course = {
      id: 0,
      name: 'New Course',
      description: 'desc',
      beginDate: new Date(),
      endDate: new Date(),
      status: CourseStatus.SCHEDULED
    };

    service.courses$.pipe(take(1)).subscribe(current => {
     
      service.addCourse(newCourse);

      const postReq = httpMock.expectOne(coursesUrl);
      expect(postReq.request.method).toBe('POST');

      const addedCourse = { ...newCourse, id: String(Number(MOCK_COURSES[MOCK_COURSES.length - 1].id) + 1) } as Course;
      postReq.flush(addedCourse);

      service.courses$.pipe(take(1)).subscribe(updated => {
        expect(updated.find(c => String(c.id) === String(addedCourse.id))).toEqual(addedCourse);
        done();
      });
    });
  });

  it('updateCourse should PUT and emit updated list', (done) => {
    const updated = { ...MOCK_COURSES[0], name: 'Updated Name' } as Course;

    service.updateCourse(updated);

    const putReq = httpMock.expectOne(`${coursesUrl}/${updated.id}`);
    expect(putReq.request.method).toBe('PUT');
    putReq.flush(updated);

    service.courses$.pipe(take(1)).subscribe(list => {
      const found = list.find(c => String(c.id) === String(updated.id));
      expect(found).toEqual(updated);
      done();
    });
  });

  it('deleteCourse should DELETE and emit list without the deleted item', (done) => {
    const idToDelete = MOCK_COURSES[1].id;

    service.deleteCourse(Number(idToDelete));

    const delReq = httpMock.expectOne(`${coursesUrl}/${idToDelete}`);
    expect(delReq.request.method).toBe('DELETE');
    delReq.flush({});

    service.courses$.pipe(take(1)).subscribe(list => {
      expect(list.find(c => String(c.id) === String(idToDelete))).toBeUndefined();
      done();
    });
  });
});
