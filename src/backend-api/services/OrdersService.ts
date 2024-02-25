/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Order } from '../models/Order';
import type { PaginatedOrderList } from '../models/PaginatedOrderList';
import type { PatchedOrder } from '../models/PatchedOrder';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class OrdersService {

    /**
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns PaginatedOrderList
     * @throws ApiError
     */
    public static ordersList(
        limit?: number,
        offset?: number,
    ): CancelablePromise<PaginatedOrderList> {
        return __request({
            method: 'GET',
            path: `/orders/`,
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * @param requestBody
     * @returns Order
     * @throws ApiError
     */
    public static ordersCreate(
        requestBody: Order,
    ): CancelablePromise<Order> {
        return __request({
            method: 'POST',
            path: `/orders/`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns Order
     * @throws ApiError
     */
    public static ordersRetrieve(
        id: string,
    ): CancelablePromise<Order> {
        return __request({
            method: 'GET',
            path: `/orders/${id}/`,
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Order
     * @throws ApiError
     */
    public static ordersUpdate(
        id: string,
        requestBody: Order,
    ): CancelablePromise<Order> {
        return __request({
            method: 'PUT',
            path: `/orders/${id}/`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @param requestBody
     * @returns Order
     * @throws ApiError
     */
    public static ordersPartialUpdate(
        id: string,
        requestBody?: PatchedOrder,
    ): CancelablePromise<Order> {
        return __request({
            method: 'PATCH',
            path: `/orders/${id}/`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static ordersDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/orders/${id}/`,
        });
    }

}