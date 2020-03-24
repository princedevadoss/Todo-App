import { TestBed } from '@angular/core/testing';

import { TodoToastrService } from './todo-toastr.service';

describe('TodoToastrService', () => {
  let service: TodoToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
