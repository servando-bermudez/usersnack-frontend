'use client';

import { useState, useCallback, useEffect } from "react";
import NextLink from 'next/link';
import { useRouter, useSearchParams } from "next/navigation";
import { Container, Box, Card, Typography, Stack, CardMedia, Link, Divider, Autocomplete, TextField, Button, List, ListItem, ListItemText } from "@mui/material";
import { Extra, Ingredient, Order, OrdersService, Pizza, PizzasService } from "@/backend-api";
import { formatToCurrency } from "@/utils/formats";
import { ExtrasOption } from "@/utils/interfaces";
import { paths } from "@/utils/paths";
import { useMounted } from "@/hooks/use-mounted";

import { useFormik } from "formik";
import * as Yup from 'yup';
import join from 'lodash/join';
import startCase from 'lodash/startCase';
import toast from "react-hot-toast";


const usePizza = (pizzaId: string) => {
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [state, setState] = useState<'loading' | 'error' | 'success'>('loading');

  const isMounted = useMounted();

  const getPizza = useCallback(
    async () => {

      try {
        const pizza = await PizzasService.pizzasRetrieve(pizzaId);

        if (isMounted()) {
          setPizza(pizza);

          setState('success');
        }
      } catch (error) {
        setState('error');

      }
    },
    [pizzaId, isMounted]
  );

  useEffect(
    () => {
      getPizza();
    },
    [getPizza]
  );

  return {
    pizza,
    state
  };
};

const useExtras = () => {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [state, setState] = useState<'loading' | 'error' | 'success'>('loading');

  const getExtras = useCallback(
    async () => {
      try {
        const res = await PizzasService.pizzasExtrasList();

        setExtras(res);
        setState('success');
      } catch (error) {
        setState('error');
      }
    },
    []
  );

  useEffect(
    () => {
      getExtras();
    },
    [getExtras]
  );

  return {
    extras,
    state
  };
};

export default function Order() {
  const router = useRouter();
  const params = useSearchParams();

  const pizzaId = params.get('pizzaId');

  if (!pizzaId) {
    router.push(paths.home);
  };

  const { pizza, state } = usePizza(pizzaId as string);
  const { extras, state: extrasState } = useExtras();

  const [extrasOptions, setExtrasOptions] = useState<ExtrasOption[]>([]);

  const [selectedExtras, setSelectedExtras] = useState<ExtrasOption[]>([]);

  useEffect(
    () => {
      if (extrasState === 'success') {
        setExtrasOptions(
          extras.map((extra: Extra) => ({
            label: startCase(extra.name),
            value: extra.id,
            price: parseFloat(extra.price),
          }))
        );
      }
    },
    [extras, extrasState]
  )

  const handleExtrasChange = useCallback(
    (options: ExtrasOption[]) => {
      setSelectedExtras(options);
    },
    []
  );

  const renderTotal = useCallback(
    () => {
      const extrasTotal = selectedExtras.reduce(
        (acc, extra) => acc + extra.price,
        0
      );

      const pizzaPrice = pizza ? parseFloat(pizza.price) : 0;

      return (
        <Stack>
          {/* Display a detailed list of prices and its total */}
          <Typography variant="h6">
            Pizza: {formatToCurrency(pizzaPrice)}
          </Typography>

          <List>
            {
              selectedExtras.map((extra: ExtrasOption) => (
                <ListItem key={extra.value}>
                  <ListItemText primary={`${extra.label}: ${formatToCurrency(extra.price)}`} />
                </ListItem>
              ))
            }
          </List>

          <Typography variant="h6">
            Total: {formatToCurrency(pizzaPrice + extrasTotal)}
          </Typography>

          <Link
            component={Link}
            href={paths.home}
          >
            <Typography variant="h6">
              Go back
            </Typography>
          </Link>
        </Stack>
      );
    },
    [pizza, selectedExtras]
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(255, 'Must be 255 characters or less')
        .required('Required'),
      address: Yup.string()
        .max(255, 'Must be 255 characters or less')
        .required('Required'),
    }),
    onSubmit: (values, helpers) => {
      const items = [];

      if (pizza) {
        items.push({
          pizza_id: pizza.id,
          quantity: 1,
          extras_id: selectedExtras.map((extra: ExtrasOption) => extra.value),
        });
      }

      const order = {
        name: values.name,
        address: values.address,
        items: items,
      };

      const submitOrder = async () => {
        try {
          await OrdersService.ordersCreate(order as unknown as Order);
        } catch (error) {
          console.error(error);
          throw error;
        }
      };

      toast.promise(
        submitOrder(),
        {
          loading: 'Submitting order...',
          success: () => {
            setTimeout(() => {
              helpers.setSubmitting(false);
              router.push(paths.home);
            }, 2000);

            return (
              <>
                <Typography variant="h6" color="success">
                  Order submitted successfully
                </Typography>
              </>
            );
          },
          error: () => (
            <>
              <Typography variant="h6" color="error">
                Error submitting order
              </Typography>
            </>
          ),
        },
        {
          position: 'top-center',
        }
      );
    },
  })

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
        {state === 'loading' && (
          <p>Loading...</p>
        )}

        {state === 'error' && (
          <p>Error loading pizza</p>
        )}

        {state === 'success' && pizza && (
          <Card
            sx={{
              height: '100lvh',
              width: '100%',
            }}
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              spacing={2}
              p={2}
              m={2}
              width={'100%'}
            >
              <Stack alignItems={'center'}>
                <Typography variant="h4" fontWeight={500}>
                  Usersnack - {pizza.name}
                </Typography>
              </Stack>

              <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems={'center'}
                  spacing={2}
                  p={2}
                  m={2}
                >
                  <Stack direction={'column'} justifyContent={'space-between'}>
                    <Stack>
                      <Typography variant="h6">
                        {pizza.name}
                      </Typography>

                      <Typography fontWeight={500} color="text.secondary">
                        {formatToCurrency(parseFloat(pizza.price))}
                      </Typography>
                    </Stack>

                    <Stack>
                      <Typography color="text.secondary">
                        {join(pizza.ingredients.map((ingredient: Ingredient) => startCase(ingredient.name)), ', ')}
                      </Typography>
                    </Stack>
                </Stack>
                <Stack>
                  <CardMedia
                    component="img"
                    sx={{ width: 200, height: '100%', objectFit: 'cover' }}
                    image={ pizza.img || ''}
                    alt={pizza.name}
                  />
                </Stack>
              </Stack>
            </Stack>

            <Divider sx={{ m: 4 }}/>

            <Stack
              direction="column"
              justifyContent="space-between"
              spacing={2}
              p={2}
              m={2}
              // width={'80%'}
            >
              <Stack>
                <Autocomplete
                  multiple
                  limitTags={3}
                  id="clients"
                  loading={extrasState === 'loading'}
                  options={extrasOptions}
                  getOptionLabel={(option: ExtrasOption) => option.label}
                  onChange={(event, value) => handleExtrasChange(value as ExtrasOption[])}
                  value={selectedExtras}
                  sx={{ minWidth: '25%' }}
                  renderInput={(params): JSX.Element => (
                    <TextField
                      {...params}
                      label="Please Select Multiple Extras"
                      placeholder="Extras"
                    />
                  )}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <Typography variant="subtitle1" fontWeight={500}>
                        {option.label} - {formatToCurrency(option.price)}
                      </Typography>
                    </Box>
                  )}
                />
              </Stack>

              <Stack spacing={2} direction={'row'} justifyContent={'space-between'}>
                {renderTotal()}

                <form onSubmit={formik.handleSubmit} noValidate style={{ minWidth: '60%' }}>
                <Stack
                  direction={'column'}
                  spacing={2}
                >
                  
                    <TextField
                      sx={{ width: '100%'}}
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      label="Name"
                      variant="outlined"
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                    <TextField
                      id="address"
                      name="address"
                      onChange={formik.handleChange}
                      label="Address"
                      variant="outlined"
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={formik.isSubmitting}
                    >
                      Order
                    </Button>
                </Stack>
                </form>
              </Stack>
              
            </Stack>
          </Card>
        )}
      </Box>
    </Container>
  );
}
