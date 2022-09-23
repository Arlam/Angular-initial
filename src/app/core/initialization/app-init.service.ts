import { Injectable } from "@angular/core";
import { AuthService } from "@app/features/auth/service/auth.service";
import { Observable } from "rxjs";

@Injectable()
export class AppInitService {

  constructor(private authService: AuthService) {
  }

  init() {

    return new Observable(subscriber => {
      this.authService.init().subscribe({
        next: () => {
          subscriber.complete()
        },
        error: (err: string) => {
          console.error(err);
          subscriber.complete()
        }
      });
    });
  }
}
