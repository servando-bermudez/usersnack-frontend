import React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" mt={3}>
      {'Copyright © '}
      <MuiLink color="inherit" href="https://usersnap.com/">
        Usersnack
      </MuiLink>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}