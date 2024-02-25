'use client';

import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { Pagination, Pizzas } from '@/utils/interfaces';
import { PizzasService } from '@/backend-api';
import { useMounted } from '@/hooks/use-mounted';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Copyright from '@/components/Copyright';
import Typography from '@mui/material/Typography';
import PizzasList from '@/components/PizzasList';
import { Pagination as ListPagination } from '@mui/material';

import round from 'lodash/round';

const usePagination = () => {
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    rowsPerPage: 4,
  });

  return {
    pagination,
    updatePagination: setPagination
  };
};

const usePizzas = (pagination: Pagination): Pizzas => {
  const [pizzas, setPizzas] = useState<Pizzas>({ pizzas: [], count: 0});

  const isMounted = useMounted();

  const getPizzas = useCallback(
    async () => {
      const limit = pagination.rowsPerPage;
      const offset = pagination.rowsPerPage * (pagination.page - 1);

      const { results = [], count = 0} = await PizzasService.pizzasList(limit, offset);

      setPizzas({
        pizzas: results,
        count: count
      });
    },
    [pagination]
  );

  useEffect(
    () => {
      if (isMounted())
        getPizzas();
    },
    [isMounted, getPizzas]
  );

  return pizzas;
};


export default function Home() {
  const { pagination, updatePagination } = usePagination();

  const { pizzas, count } = usePizzas(pagination);

  const handlePageChange = useCallback(
    (event: ChangeEvent<unknown> | null, page: number): void => {
      updatePagination((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [updatePagination]
  );

  return (
    <Container maxWidth="lg">
      <Box
        component='main'
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          height: '100lvh',

        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Pizza Service - Usersnack
        </Typography>
        <PizzasList pizzas={pizzas} />
        <ListPagination
          sx={{ mt: 2 }}
          count={round(count / pagination.rowsPerPage) }
          page={pagination.page}
          onChange={handlePageChange}
        />
        <Copyright />
      </Box>
    </Container>
  );
}