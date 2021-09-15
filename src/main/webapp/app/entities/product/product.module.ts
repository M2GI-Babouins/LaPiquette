import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ProductComponent } from './list/product.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { ProductUpdateComponent } from './update/product-update.component';
import { ProductDeleteDialogComponent } from './delete/product-delete-dialog.component';
import { ProductRoutingModule } from './route/product-routing.module';
import { ProductFiltersComponent } from './product-filters/product-filters.component';

@NgModule({
  imports: [SharedModule, ProductRoutingModule],
  declarations: [ProductComponent, ProductDetailComponent, ProductUpdateComponent, ProductDeleteDialogComponent, ProductFiltersComponent],
  entryComponents: [ProductDeleteDialogComponent],
})
export class ProductModule {}
