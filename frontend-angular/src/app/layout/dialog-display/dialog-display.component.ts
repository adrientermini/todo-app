import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {Todo} from "../../model/todo.model";
import {TodoManager} from "../../manager/todo.manager";

@Component({
  selector: 'app-dialog-display',
  templateUrl: './dialog-display.component.html',
  styleUrls: ['./dialog-display.component.scss']
})
export class DialogDisplayComponent implements OnInit {

  public formGroup: FormGroup;
  private todo: Todo;

  constructor(
    private readonly todoManager: TodoManager,
    private readonly formBuilder: FormBuilder,
    private readonly ddr: DynamicDialogRef,
    private readonly ddc: DynamicDialogConfig
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

  save() {
    this.todoManager.saveTodo({
        ... this.todo,
        ... this.formGroup.value
      }
    ).subscribe();

    console.log('ici');
    this.ddr.close();
  }

  cancel() {
    this.ddr.close();
  }
}
