import z from 'zod';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import AppTheme from '../../theme/AppTheme';
import ColorModeSelect from '../../theme/ColorModeSelect';
import logoImg from '../../assets/logo.jpeg';
import { userStore } from '../../store';
import { API } from '../../service';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export interface IFormData {
  email: string;
  password: string;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

export const SignIn = (props: { disableCustomTheme?: boolean }) => {
  const { user, signin, logout } = userStore();
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<IFormData>({
    defaultValues: {
      email: 'admin@example.com',
      password: 'admin',
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: IFormData) {
    signin(data);
  }

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer
        direction='column'
        justifyContent='space-between'
      >
        <ColorModeSelect
          sx={{ position: 'fixed', top: '1rem', right: '1rem' }}
        />
        <Card variant='outlined'>
          <Box
            sx={{ margin: 'auto', width: 100 }}
            onClick={() => logout()}
          >
            <img
              src={logoImg}
              alt='DataWer'
              style={{ width: '100%', borderRadius: 16 }}
            />
          </Box>

          <Typography
            component='h1'
            variant='h4'
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>

          <Box
            component='form'
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
              width: '100%',
              display: 'flex',
              gap: 2,
              flexDirection: 'column',
            }}
          >
            <FormControl>
              <FormLabel htmlFor='email'>Email</FormLabel>
              <TextField
                type='email'
                placeholder='your@email.com'
                autoComplete='email'
                autoFocus
                required
                fullWidth
                variant='outlined'
                error={!!errors.email}
                helperText={errors.email?.message}
                color={!!errors.email ? 'error' : 'primary'}
                {...register('email')}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <TextField
                placeholder='••••••'
                type='password'
                autoComplete='current-password'
                autoFocus
                required
                fullWidth
                variant='outlined'
                error={!!errors.password}
                helperText={errors.password?.message}
                color={!!errors.password ? 'error' : 'primary'}
                {...register('password')}
              />
            </FormControl>

            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 2 }}
            >
              Sign in
            </Button>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
};
