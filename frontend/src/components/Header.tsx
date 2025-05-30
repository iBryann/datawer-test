import Stack from '@mui/material/Stack';
import NavbarBreadcrumbs from './NavbarBreadcrumbs';
import ColorModeIconDropdown from '../theme/ColorModeIconDropdown';

import { Avatar, Box, Typography } from '@mui/material';
import OptionsMenu from './OptionsMenu';

export default function Header() {
  return (
    <Stack
      direction='row'
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />

      <Stack
        direction='row'
        sx={{ gap: 4 }}
      >
        <ColorModeIconDropdown />

        <Stack
          direction='row'
          sx={{
            gap: 1,
            alignItems: 'center',
          }}
        >
          <Avatar
            sizes='small'
            alt='Riley Carter'
            src='/static/images/avatar/7.jpg'
            sx={{ width: 36, height: 36 }}
          />
          <Box sx={{ mr: 'auto' }}>
            <Typography
              variant='body2'
              sx={{ fontWeight: 500, lineHeight: '16px' }}
            >
              Riley Carter
            </Typography>
            <Typography
              variant='caption'
              sx={{ color: 'text.secondary' }}
            >
              riley@email.com
            </Typography>
          </Box>
          <OptionsMenu />
        </Stack>
      </Stack>
    </Stack>
  );
}
