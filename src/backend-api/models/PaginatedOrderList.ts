/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Order } from './Order';

export type PaginatedOrderList = {
    count?: number;
    next?: string | null;
    previous?: string | null;
    results?: Array<Order>;
}
