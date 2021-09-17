/* eslint-disable no-console */
import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IProduct, Product } from '../product.model';
import { ProductService } from '../service/product.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';

@Component({
  selector: 'jhi-product-update',
  templateUrl: './product-update.component.html',
})
export class ProductUpdateComponent implements OnInit {
  isSaving = false;
  formInvalid = false;

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
    image: [],
    imageContentType: [],
  });

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected productService: ProductService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ product }) => {
      this.updateForm(product);
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('laPiquetteApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  nouveauProduit(): IProduct {
    return { ...new Product() };
  }

  save(): void {
    console.log('save');
    this.isSaving = true;
    if (this.editForm.invalid) {
      this.formInvalid = true;
    } else {
      const product = this.createFromForm();
      if (product.id !== undefined) {
        this.subscribeToSaveResponse(this.productService.update(product));
      } else {
        this.subscribeToSaveResponse(this.productService.create(product));
      }
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProduct>>): void {
    console.log('save 2');
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    console.log('save 3');
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(product: IProduct): void {
    console.log('save 4');
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
      image: product.image,
      imageContentType: product.imageContentType,
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
      imageContentType: this.editForm.get(['imageContentType'])!.value,
      image: this.editForm.get(['image'])!.value,
    };
  }
}
