/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Extra } from '../models/Extra';
import type { PaginatedPizzaList } from '../models/PaginatedPizzaList';
import type { PatchedExtra } from '../models/PatchedExtra';
import type { PatchedPizza } from '../models/PatchedPizza';
import type { Pizza } from '../models/Pizza';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class PizzasService {

    /**
     * List and create pizzas.
     * @param limit Number of results to return per page.
     * @param offset The initial index from which to return the results.
     * @returns PaginatedPizzaList
     * @throws ApiError
     */
    public static pizzasList(
        limit?: number,
        offset?: number,
    ): CancelablePromise<PaginatedPizzaList> {
        return __request({
            method: 'GET',
            path: `/pizzas/`,
            query: {
                'limit': limit,
                'offset': offset,
            },
        });
    }

    /**
     * List and create pizzas.
     * @param requestBody
     * @returns Pizza
     * @throws ApiError
     */
    public static pizzasCreate(
        requestBody: Pizza,
    ): CancelablePromise<Pizza> {
        return __request({
            method: 'POST',
            path: `/pizzas/`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieve, update and destroy a pizza.
     * @param id
     * @returns Pizza
     * @throws ApiError
     */
    public static pizzasRetrieve(
        id: string,
    ): CancelablePromise<Pizza> {
        return __request({
            method: 'GET',
            path: `/pizzas/${id}/`,
        });
    }

    /**
     * Retrieve, update and destroy a pizza.
     * @param id
     * @param requestBody
     * @returns Pizza
     * @throws ApiError
     */
    public static pizzasPartialUpdate(
        id: string,
        requestBody?: PatchedPizza,
    ): CancelablePromise<Pizza> {
        return __request({
            method: 'PATCH',
            path: `/pizzas/${id}/`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieve, update and destroy a pizza.
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static pizzasDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/pizzas/${id}/`,
        });
    }

    /**
     * List and create extras.
     * @returns Extra
     * @throws ApiError
     */
    public static pizzasExtrasList(): CancelablePromise<Array<Extra>> {
        return __request({
            method: 'GET',
            path: `/pizzas/extras/`,
        });
    }

    /**
     * List and create extras.
     * @param requestBody
     * @returns Extra
     * @throws ApiError
     */
    public static pizzasExtrasCreate(
        requestBody: Extra,
    ): CancelablePromise<Extra> {
        return __request({
            method: 'POST',
            path: `/pizzas/extras/`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieve, update and destroy an extra.
     * @param id
     * @returns Extra
     * @throws ApiError
     */
    public static pizzasExtrasRetrieve(
        id: string,
    ): CancelablePromise<Extra> {
        return __request({
            method: 'GET',
            path: `/pizzas/extras/${id}/`,
        });
    }

    /**
     * Retrieve, update and destroy an extra.
     * @param id
     * @param requestBody
     * @returns Extra
     * @throws ApiError
     */
    public static pizzasExtrasPartialUpdate(
        id: string,
        requestBody?: PatchedExtra,
    ): CancelablePromise<Extra> {
        return __request({
            method: 'PATCH',
            path: `/pizzas/extras/${id}/`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Retrieve, update and destroy an extra.
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static pizzasExtrasDestroy(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/pizzas/extras/${id}/`,
        });
    }

}