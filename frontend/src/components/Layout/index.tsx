import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';

import AppNavbar from '../AppNavbar';
import Header from '../Header';
import SideMenu from '../SideMenu';
import AppTheme from '../../theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  treeViewCustomizations,
} from '../../theme/customizations';
import { HomeProps } from './types';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...treeViewCustomizations,
};

export const Layout = (props: HomeProps) => {
  return (
    <AppTheme
      {...props}
      themeComponents={xThemeComponents}
    >
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />

        <Box
          component='main'
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />

            {props.children}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
};
