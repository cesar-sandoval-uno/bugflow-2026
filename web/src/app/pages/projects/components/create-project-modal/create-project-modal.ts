import {
  Component,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ProjectsFacade } from '@bugflow-2026/data-access';
import { Project } from '@bugflow-2026/shared-types';
import { NotificationService } from '../../../../core/services/notification.service/notification.service';

@Component({
  selector: 'app-create-project-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CdkTrapFocus,
  ],
  templateUrl: './create-project-modal.html',
})
export class CreateProjectModalComponent {
  private fb = inject(FormBuilder).nonNullable;
  private facade = inject(ProjectsFacade);
  private notification = inject(NotificationService);

  isOpen = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);
  currentProject = signal<Project | null>(null);
  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  @HostListener('document:keydown.escape')
  handleEscape() {
    if (!this.isOpen() || this.loading()) return;
    this.close();
  }

  open(project?: Project) {
    document.body.style.overflow = 'hidden';

    this.isOpen.set(true);
    this.currentProject.set(project ?? null);

    if (project) {
      this.form.patchValue({
        name: project.name,
        description: project.description,
      });
    } else {
      this.form.reset();
    }

    setTimeout(() => {
      document.getElementById('project-name')?.focus();
    });
  }

  close() {
    document.body.style.overflow = '';

    if (!this.isOpen() || this.loading()) return;

    this.isOpen.set(false);
    this.currentProject.set(null);
    this.form.reset();
    this.error.set(null);
  }

  isInvalid(
    controlName: keyof typeof this.form.controls
  ) {
    const control = this.form.get(controlName);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);
    this.form.disable();

    const value = this.form.getRawValue();
    const request$ = this.currentProject()
      ? this.facade.updateProject(
          this.currentProject()!.id,
          value,
        )
      : this.facade.createProject(value);

    request$.subscribe({
      next: () => {
        this.loading.set(false);
        this.form.enable();
        this.close();
        this.notification.show(
          this.currentProject()
            ? 'Project updated successfully'
            : 'Project created successfully',
          'success',
        );
        this.facade.refresh();
      },

      error: (err) => {
        this.loading.set(false);
        this.form.enable();
        this.error.set(
          err.message || 'Error saving project'
        );
      },
    });
  }
}
