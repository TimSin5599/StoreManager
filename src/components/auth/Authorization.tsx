import React, {useState} from "react";
import {Box, Button, Paper, TextField, Typography} from "@mui/material";

const Authorization = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({email: email, password: password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setMessage(data.message || 'Ошибка входа');
                return;
            }

            console.log(data);
            localStorage.setItem('user', JSON.stringify(data));

            setMessage('Успешный вход!');
        } catch (err) {
            console.error('Ошибка:', err);
            setMessage('Ошибка при подключении к серверу');
        }
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
                        Вход
                    </Typography>
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
                        label="Пароль"
                        variant="outlined"
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2 }}
                    >
                        Войти
                    </Button>
                    {message && (
                        <Typography
                            variant="body2"
                            color={message.includes('успех') ? 'green' : 'error'}
                            align="center"
                            mt={2}
                        >
                            {message}
                        </Typography>
                    )}
                </form>
            </Paper>
        </Box>
    );
}

export default Authorization;