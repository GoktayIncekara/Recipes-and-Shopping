import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipeSelected = new Subject<Recipe>();
    
    private recipes: Recipe[] = [
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
    ];

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }
}