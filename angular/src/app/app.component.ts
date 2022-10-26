import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title :string = 'angular';
  label :string = 'ez';
  showed :boolean = false;


  public sayHello(): void{
    this.showed = !this.showed;
  }

}
