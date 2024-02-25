/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Extra } from './Extra';
import type { Pizza } from './Pizza';

export type Item = {
    readonly id: string;
    quantity?: number;
    extras_id?: Array<string>;
    pizza_id: string;
    readonly extras: Array<Extra>;
    readonly pizza: Pizza;
    readonly total: string;
}
