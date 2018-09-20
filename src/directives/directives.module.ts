import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { HideHeaderDirective } from './hide-header/hide-header';
@NgModule({
	declarations: [HideHeaderDirective],
	imports: [],
	exports: [HideHeaderDirective],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class DirectivesModule {}
