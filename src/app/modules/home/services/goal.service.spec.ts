import { TestBed } from '@angular/core/testing';

import { GoalService } from './goal.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('GoalService', () => {
  let service: GoalService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GoalService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get goals', () => {
    service.getGoals().subscribe((goals) => {
      expect(goals.length).toBe(2);
    });
    const req = httpTestingController.expectOne(service.apiURL);
    expect(req.request.method).toEqual('GET');
    req.flush([
      {
        id: 1,
        title: 'This is a goal',
        due_date: '2021-01-01T00:00:00',
        progress: 0,
        user: 'test',
      },
      {
        id: 2,
        title: 'This is another goal',
        due_date: '2021-01-01T00:00:00',
        progress: 55,
        user: 'test',
      },
    ]);
  });

  it('should post a goal', () => {
    const goal = {
      title: 'This is a goal',
      due_date: '2021-01-01T00:00:00',
      progress: 0,
      user: 'test',
    };

    const createdGoal = {
      ...goal,
      id: 1,
    };

    service.postGoal(goal).subscribe((res) => {
      expect(res).toEqual(createdGoal);
    });

    const req = httpTestingController.expectOne(service.apiURL);
    expect(req.request.method).toEqual('POST');
    req.flush(createdGoal);
  });

  it('should delete a goal', () => {
    const id = 1;
    service.deleteGoal(id).subscribe((res) => {
      expect(res).toEqual({});
    });

    const req = httpTestingController.expectOne(`${service.apiURL}/${id}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });

  it('should update a goal', () => {
    const id = 1;

    const goal = {
      id: 1,
      title: 'This is a goal',
      due_date: '2021-01-01T00:00:00',
      progress: 0,
      user: 'test',
    };

    service.updateGoal(goal).subscribe((res) => {
      expect(res).toEqual(goal);
    });

    const req = httpTestingController.expectOne(`${service.apiURL}/${id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(goal);
  });
});
