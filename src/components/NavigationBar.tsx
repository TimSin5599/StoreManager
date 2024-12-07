import {AppBar, IconButton, Link, Stack, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {IoMdPerson} from "react-icons/io";

const NavigationBar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={onMenuClick}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1, marginLeft: 2}}>
                    StoreManager
                </Typography>
                <Stack direction="row" spacing={3} sx={{marginLeft: 2}} alignItems="center">
                    <Link href="https://example.com" underline="none" variant="h6" color={'white'}>
                        Goods
                    </Link>
                    <Link href="https://example.com" underline="none" variant="h6" color={'white'}>
                        Warehouses
                    </Link>
                    <Link href="https://example.com" underline="none" variant="h6" color={'white'}>
                        About
                    </Link>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <IoMdPerson />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar;