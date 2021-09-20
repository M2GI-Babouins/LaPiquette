import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[jhi-bindQueryParam]',
})
export class BindQueryParamDirective {
  @Input() paramKey = '';

  constructor(private ngControl: NgControl) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has(this.paramKey)) {
      this.ngControl.control.patchValue(queryParams.get(this.paramKey));
    }
  }
}
