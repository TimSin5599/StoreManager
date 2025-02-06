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
                    <Link href="/products/" underline="none" variant="h6" color={'white'} sx={{
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}>
                        Goods
                    </Link>
                    <Link href="/categories/" underline="none" variant="h6" color={'white'} sx={{
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}>
                        Categories
                    </Link>
                    <Link href="https://example.com" underline="none" variant="h6" color={'white'} sx={{
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}>
                        About
                    </Link>
                    <IconButton href="/about/" edge="start" color="inherit" aria-label="menu" sx={{
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.2)' },
                    }}>
                        <IoMdPerson />
                    </IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavigationBar;