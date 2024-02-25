/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Ingredient } from './Ingredient';

export type Pizza = {
    readonly id: string;
    ingredients: Array<Ingredient>;
    name: string;
    price: string;
    img?: string | null;
}
