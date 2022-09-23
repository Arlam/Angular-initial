import { TestBed } from '@angular/core/testing';

import { RouterTestingModule } from "@angular/router/testing";
import { PermissionGuard } from "@app/features/auth/guard/permission-guard.service";

describe('PermissionGuard', () => {
  let service: PermissionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(PermissionGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
