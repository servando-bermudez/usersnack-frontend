import NextLink from 'next/link';
import { Ingredient, Pizza } from "@/backend-api";
import { Card, CardMedia, Container, Link, Stack, Typography } from "@mui/material";

import join from 'lodash/join';
import startCase from 'lodash/startCase';
import { paths } from '@/utils/paths';
import { formatToCurrency } from '@/utils/formats';


interface PizzasListProps {
  pizzas: Pizza[];
};

const PizzasList = (props: PizzasListProps) => {
  const { pizzas } = props;

  return (
    <Container>
      <Stack spacing={2} direction={'column'}>
        {
          pizzas.map((pizza: Pizza) => (
            <Card key={pizza.id}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={2}
                p={2}
              >
                <Stack direction={'column'} justifyContent={'space-between'}>
                    <Stack>
                      <Link
                        component={NextLink}
                        href={paths.order.replace(':pizzaId', pizza.id)}
                      >
                        <Typography variant="h4">
                          {pizza.name}
                        </Typography>
                      </Link>

                      <Typography color="text.secondary">
                        {join(pizza.ingredients.map((ingredient: Ingredient) => startCase(ingredient.name)), ', ')}
                      </Typography>
                    </Stack>

                    <Stack>
                      <Typography variant="h6" fontWeight={500} color="text.secondary">
                        {formatToCurrency(parseFloat(pizza.price))}
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
            </Card>
          ))
        }
      </Stack>
    </Container>
  );
};

export default PizzasList;
