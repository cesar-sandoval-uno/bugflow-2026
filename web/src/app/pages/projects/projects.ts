import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  ViewChild,
} from '@angular/core';
import {
  ProjectsFacade,
  UsersFacade,
} from '@bugflow-2026/data-access';
import { UserRole } from '@bugflow-2026/shared-types';
import { CardComponent } from '../../shared/ui/card/card';
import { SpinnerComponent } from '../../shared/ui/spinner/spinner';
import { CreateProjectModalComponent } from './components/create-project-modal/create-project-modal';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.html',
  imports: [
    CardComponent,
    SpinnerComponent,
    CreateProjectModalComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPage {
  @ViewChild(CreateProjectModalComponent)
  modal!: CreateProjectModalComponent;

  readonly facade = inject(ProjectsFacade);
  private usersFacade = inject(UsersFacade);
  currentUser = this.usersFacade.me;
  canCreateProject = computed(() =>
    this.currentUser()?.role === UserRole.ADMIN
  );

  openCreateModal() {
    this.modal.open();
  }
}
