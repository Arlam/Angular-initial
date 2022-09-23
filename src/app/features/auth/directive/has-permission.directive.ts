import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permission } from '@app/features/auth/model/permission';
import { CurrentUserService } from '@app/features/auth/service/current-user.service';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[hasPermission]',
})
export class HasPermissionDirective {
  private permissions: Permission[] = [];

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<void>,
    private viewContainer: ViewContainerRef,
    private currentUserService: CurrentUserService
  ) {}

  @Input()
  set hasPermission(permissions: Permission[]) {
    this.permissions = permissions;
    this.updateView();
  }

  private updateView(): void {
    if (this.currentUserService.hasAnyPermission(this.permissions)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
