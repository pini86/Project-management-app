import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import Container from '@mui/material/Container';
import { indigo } from '@mui/material/colors';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import HomeIcon from '@mui/icons-material/Home';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const headerBgColor = indigo[900];

export default function Header() {
  const [language, setlanguage] = useState('RU');

  const handleChange = (event: SelectChangeEvent) => {
    setlanguage(event.target.value as string);
  };

  return (
    <AppBar sx={{ backgroundColor: headerBgColor }}>
      <Container maxWidth="xl">
        <Toolbar>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
            <IconButton size="large" aria-label="home link" aria-haspopup="true" color="inherit">
              <HomeIcon />
              <Typography variant="button" sx={{ pl: 1 }}>
                На главную
              </Typography>
            </IconButton>
            <Stack direction="row">
              <IconButton
                size="large"
                aria-label="register user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
                <Typography variant="button" sx={{ pl: 1 }}>
                  Регистрация
                </Typography>
              </IconButton>
              <IconButton size="large" aria-label="login" aria-haspopup="true" color="inherit">
                <LoginIcon />
                <Typography variant="button" sx={{ pl: 1 }}>
                  Войти
                </Typography>
              </IconButton>
              <Paper elevation={0}>
                <FormControl>
                  <InputLabel id="label-language"></InputLabel>
                  <Select labelId="label-language" value={language} onChange={handleChange}>
                    <MenuItem value={'RU'}>RU</MenuItem>
                    <MenuItem value={'EN'}>EN</MenuItem>
                  </Select>
                </FormControl>
              </Paper>
            </Stack>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
