import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput', {static: true}) nameInput!: ElementRef;
  @ViewChild('amountInput', {static: true}) amountInput!: ElementRef;
  @Output() ingredientCreated = new EventEmitter<Ingredient>();
  
  createIng() {
    const ingredient = new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value);
    this.ingredientCreated.emit(ingredient);
  }
}
