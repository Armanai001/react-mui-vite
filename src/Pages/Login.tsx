import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {Box, Card, Container, Typography} from '@mui/material';


export default function Login() {

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        if (`${data.get('phoneNumber')}`.length !== 10) {
            alert('Please enter a 10 Digit valid number')
        } else {
            localStorage.setItem('email', data.get('email') as string);
            localStorage.setItem('phoneNumber', data.get('phoneNumber') as string);
            localStorage.setItem('name', data.get('name') as string);
            location.reload();
        }

    };

    return (
        <Container maxWidth="xs">
            <Card sx={{p: 2}}>

                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >


                    <Typography component="h1" variant="h5">
                        User Information
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="User Name"
                            name="name"
                            autoComplete="name"
                            autoFocus
                            type="text"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            type="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="phoneNumber"
                            label="Phone Number"
                            type="number"
                            id="number"
                            autoComplete="number"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                    </Box>

                </Box>

                <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8}}>
                    {'Copyright © '}
                    <Link color="inherit" href="https://github.com/Armanai001" target="_blank">
                        arman.com
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Card>

        </Container>
    )
        ;
}