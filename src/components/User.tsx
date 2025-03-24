import {Box, Button, Stack, Typography} from "@mui/material";
import {Navigate, useNavigate} from "react-router";

export interface UserProps {
    id: number | null,
    username: string,
    email: string,
    password: string,
    group: string,
    avatarUrl: string,
    createdAt: string,
    updatedAt: string,
}

const User: React.FC = () => {
    const user = JSON.parse(localStorage.getItem('user') as string);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });


            if (!response.ok) {
                return;
            }
            localStorage.removeItem('user');
            navigate('/auth/login');

        } catch (err) {
            console.error('Ошибка:', err);
        }
    }

    if (!user) {
        return (<Navigate to="/auth/login" />);
    }

    return (
        <Stack gap={2} direction={"column"} alignItems={"center"} alignSelf={"center"} justifyContent={"center"} sx={{ height: '80vh' }}>
            <Box component="img" alt="image" src={user.avatarUrl} sx={{height: 200, width: 200}}/>
            <Typography>Имя: {user.username}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Typography>Группа: {user.group}</Typography>
            <Typography>Аккаунт создан: {user.createdAt.split("T")[0]}</Typography>
            <Button onClick={handleLogout} sx={{textTransform: 'none', color: "blue"}}>Выйти</Button>
        </Stack>
    );
}

export default User;