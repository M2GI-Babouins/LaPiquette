import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProduct, Product } from '../product.model';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [null, []],
    name: [],
    year: [],
    region: [],
    type: [],
    price: [],
    description: [],
    alcoholPer: [],
    recommandation: [],
    ageLimit: [],
    temperature: [],
    percentPromo: [null, [Validators.max(1)]],
    stock: [],
    urlImage: [],
  });

  constructor(protected productService: ProductService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const product = this.createFromForm();
    if (product.id !== undefined) {
      this.subscribeToSaveResponse(this.productService.update(product));
    } else {
      this.subscribeToSaveResponse(this.productService.create(product));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(product: IProduct): void {
    this.editForm.patchValue({
      id: product.id,
      name: product.name,
      year: product.year,
      region: product.region,
      type: product.type,
      price: product.price,
      description: product.description,
      alcoholPer: product.alcoholPer,
      recommandation: product.recommandation,
      ageLimit: product.ageLimit,
      temperature: product.temperature,
      percentPromo: product.percentPromo,
      stock: product.stock,
      urlImage: product.urlImage,
    });
  }

  protected createFromForm(): IProduct {
    return {
      ...new Product(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      year: this.editForm.get(['year'])!.value,
      region: this.editForm.get(['region'])!.value,
      type: this.editForm.get(['type'])!.value,
      price: this.editForm.get(['price'])!.value,
      description: this.editForm.get(['description'])!.value,
      alcoholPer: this.editForm.get(['alcoholPer'])!.value,
      recommandation: this.editForm.get(['recommandation'])!.value,
      ageLimit: this.editForm.get(['ageLimit'])!.value,
      temperature: this.editForm.get(['temperature'])!.value,
      percentPromo: this.editForm.get(['percentPromo'])!.value,
      stock: this.editForm.get(['stock'])!.value,
      urlImage: this.editForm.get(['urlImage'])!.value,
    };
  }
}
