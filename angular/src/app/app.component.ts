import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'angular';
  label = 'ez';

  public sayHello(): void{
    alert(this.label);
  }

}
