import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = !isNaN(this.id);
      this.initForm(); 
    })
  }

  onSubmit() {
    const value = this.recipeForm.value;
    if (this.editMode) {
      const newRecipe = new Recipe(this.id, value["name"], value["description"], value["imagePath"], value["ingredients"]);
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      const nextId = this.recipeService.getNextId();
      const newRecipe = new Recipe(nextId, value["name"], value["description"], value["imagePath"], value["ingredients"]);
      this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(["/recipes"]);

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(
      new FormGroup({
        "name": new FormControl(null, Validators.required),
        "amount": new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(index);
  }

  get ingredientControls() {
    return (this.recipeForm.get("ingredients") as FormArray).controls;
  }

  private initForm() {
    let recipeName = "";
    let recipeImagePath = "";
    let recipeDescription = "";
    let recipeIngredients = new FormArray([] as any);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          let createdFormGroup = new FormGroup({
            "name": new FormControl(ingredient.name, Validators.required),
            "amount": new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
          recipeIngredients.push(createdFormGroup)
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName, Validators.required),
      "imagePath": new FormControl(recipeImagePath, Validators.required),
      "description": new FormControl(recipeDescription, Validators.required),
      "ingredients" : recipeIngredients
    });
  }
}
