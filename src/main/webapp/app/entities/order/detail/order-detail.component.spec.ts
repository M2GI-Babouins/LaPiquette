import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderDetailComponent } from './order-detail.component';

describe('Component Tests', () => {
  describe('Order Management Detail Component', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [OrderDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ order: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(OrderDetailComponent, '')
        .compileComponents();
    });
  });
});
