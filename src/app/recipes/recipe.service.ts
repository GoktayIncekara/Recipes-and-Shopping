import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from './recipe.model';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  /* private recipes: Recipe[] = [
        new Recipe(0,"A test recipe", "This is a simply test recipe", "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/british_shakshuka_26737_16x9.jpg", [
            new Ingredient("Meat", 4),
            new Ingredient("Banana", 10),
            new Ingredient("Carot", 3)
        ]),
        new Recipe(1,"A test recipe 2", "This is a simply TEST recipe", "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/british_shakshuka_26737_16x9.jpg", [
            new Ingredient("Strawberry", 2),
            new Ingredient("Milk", 1),
        ]),
        new Recipe(2,"A test recipe 3", "This is a simply TESTT recipe", "https://ichef.bbci.co.uk/food/ic/food_16x9_1600/recipes/british_shakshuka_26737_16x9.jpg", [
            new Ingredient("Water", 40),
            new Ingredient("Chocolate", 10),
            new Ingredient("Oath", 25)
        ]),
    ]; */

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getNextId() {
    const size = this.recipes.length;
    return this.recipes[size].id + 1;
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (id === this.recipes[i].id) {
        return this.recipes[i];
      }
    }
    return this.recipes[0];
  }

  getRecipePosition(id: number) {
    for (let i = 0; i < this.recipes.length; i++) {
      if (id === this.recipes[i].id) {
        return i;
      }
    }
    return 0;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    let recipePosition = this.getRecipePosition(id);
    this.recipes.splice(recipePosition, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
