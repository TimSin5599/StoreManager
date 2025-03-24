import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import {useNavigate} from "react-router";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [group, setGroup] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const userData = {
            username: username,
            email: email,
            password: password,
            group: group,
            avatarUrl: avatarUrl,
        };

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                return;
            }

            console.log(data);
            localStorage.setItem('user', JSON.stringify(data));

        } catch (err) {
            console.error('Ошибка:', err);
        }

        console.log('Регистрация пользователя:', userData);
        navigate('/auth/login');
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f0f2f5',
            }}
        >
            <Paper elevation={6} sx={{ padding: 4, width: 350, borderRadius: 2 }}>
                <form onSubmit={handleSubmit}>
                    <Typography variant="h5" mb={2} align="center">
                        Регистрация
                    </Typography>

                    <TextField
                        fullWidth
                        label="Username"
                        variant="outlined"
                        margin="normal"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Group"
                        variant="outlined"
                        margin="normal"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Avatar URL"
                        variant="outlined"
                        margin="normal"
                        value={avatarUrl}
                        onChange={(e) => setAvatarUrl(e.target.value)}
                        required
                    />

                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Зарегистрироваться
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default RegisterForm;