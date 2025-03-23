import {Box, Stack, Typography} from "@mui/material";

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
    const user: UserProps = JSON.parse(localStorage.getItem("user") as string);
    console.log(user);

    return (
        <Stack gap={2} direction={"column"} alignItems={"center"} alignSelf={"center"} justifyContent={"center"} sx={{ height: '80vh' }}>
            <Box component="img" alt="image" src={user.avatarUrl} sx={{height: 200, width: 200}}/>
            <Typography>{user.username}</Typography>
            <Typography>{user.email}</Typography>
            <Typography>{user.group}</Typography>
            <Typography>{user.createdAt}</Typography>
        </Stack>
    );
}

export default User;