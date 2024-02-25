/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Item } from './Item';

export type Order = {
    readonly id: string;
    created_at?: string;
    items: Array<Item>;
    name: string;
    address: string;
    readonly total: string;
}
