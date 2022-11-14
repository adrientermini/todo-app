import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Todo} from "../../model/todo.model";
import {TodoManager} from "../../manager/todo.manager";
import {ConfirmationService} from "primeng/api";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dialog-display',
  templateUrl: './dialog-display.component.html',
  styleUrls: ['./dialog-display.component.scss'],
  providers: [ConfirmationService]
})
export class DialogDisplayComponent implements OnInit, OnDestroy {

  public formGroup: FormGroup;
  private todo: Todo;
  private readonly subscriptions: Subscription = new Subscription();

  constructor(
    private readonly todoManager: TodoManager,
    private readonly formBuilder: FormBuilder,
    private readonly ddr: DynamicDialogRef,
    private readonly ddc: DynamicDialogConfig,
    private readonly confirmationService: ConfirmationService
  ) {
    this.todo = this.ddc.data;
    this.formGroup = formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required]
    });

    this.formGroup.patchValue(this.todo || {});
  }

  ngOnInit(): void {
  }

  save(): void {
    this.subscriptions.add(this.todoManager.saveTodo({
        ...this.todo,
        ...this.formGroup.value
      }
    ).subscribe(
      () => {
        this.ddr.close();
      }));
  }

  cancel(event: Event): void {
    if (!this.formGroup.invalid) {
      this.confirmationService.confirm({
        target: event.target,
        message: 'Les données actuelles ne seront pas sauvegardées, continuer ?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Oui',
        rejectLabel: 'Non',
        accept: () => {
          this.ddr.close();
        }
      });
    } else {
      this.ddr.close();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
