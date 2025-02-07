import {Box, Stack, Typography} from "@mui/material";

// interface UserProps {
//     name: string;
//     surname: string;
//     email: string;
//     group: string;
//     image: string;
// }

const User = () => {

    return (
        <Stack gap={2} direction={"column"} alignItems={"center"} alignSelf={"center"} justifyContent={"center"} sx={{ height: '80vh' }}>
            <Box component="img" alt="image" src="https://avatars.githubusercontent.com/u/125747529?v=4" sx={{height: 200, width: 200}}/>
            <Typography>Синицын Тимофей</Typography>
            <Typography>timasinitsyn@bk.ru</Typography>
            <Typography>Student BPI-221</Typography>
        </Stack>
    );
}

export default User;