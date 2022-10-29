import {Component} from '@angular/core';
import {TodoManager} from "./manager/todo.manager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TodoManager]
})
export class AppComponent {
  title = 'frontend-angular';
}
