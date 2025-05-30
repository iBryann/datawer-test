import { Box, Typography } from '@mui/material';

import { Layout } from '../../components/Layout';
import CustomizedDataGrid from '../../components/CustomizedDataGrid';

export const Home = () => {
  return (
    <Layout>
      <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
        <Typography
          component='h2'
          variant='h6'
          sx={{ mb: 2 }}
        >
          Home
        </Typography>

        <CustomizedDataGrid />
      </Box>
    </Layout>
  );
};
