/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Pizza } from './Pizza';

export type PaginatedPizzaList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<Pizza>;
}
