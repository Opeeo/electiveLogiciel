import { NextPage } from "next";
import Head from 'next/head';
import Link from 'next/link';
import Footer from "./footer";
export const siteTitle = 'Home Page';
import styles from './layout.module.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Image from "next/image";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

export interface ILayout {
    children: React.ReactNode,
    authentified?: Boolean;
    home?: Boolean;
}


const Layout: NextPage<ILayout> = ({ children, authentified = false, home = false }) => {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <List>
                <Link href='/restorers/home'>
                    <ListItemButton >
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </ListItemButton>
                </Link>
                <Link href={"/restorers/orders/hist"}>
                    <ListItem key='order' disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <BookmarkIcon />
                            </ListItemIcon>
                            <ListItemText primary='Order' />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link href={"/"}>
                    <ListItem key='logout' disablePadding>

                        <ListItemButton>
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary='Logout' />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </div>
    );

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <title>CESI'EATS</title>
                <meta
                    name="description"
                    content="Cesi'Eats, food delivery web-app."
                />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: authentified ? `calc(100% - ${drawerWidth}px)` : '100%' },
                        ml: { sm: `${drawerWidth}px` },
                    }}
                    className={styles.appBar}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Image
                            src="/images/UberEats-LogoPNG1.png"
                            alt="logo"
                            width={100}
                            height={20}
                        />
                        <Box className={styles.centered} sx={{ flexGrow: 0.1, display: { small: 'none', } }}>
                            <Search className={styles.searchBar}>
                                <SearchIconWrapper>
                                    <SearchIcon />
                                </SearchIconWrapper>
                                <StyledInputBase
                                    placeholder="Search…"
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </Search>
                        </Box>
                        <Box className={styles.righted} sx={{ flexGrow: 0, diplay: { xs: 'none', md: 'flex' } }}>
                            {authentified ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </>
                            ) : (
                                <>
                                    <Stack direction="row" spacing={2}>
                                        <Link href="/login">
                                            <Button variant="outlined" color='success' onClick={() => { console.log(authentified); { authentified = true } }} endIcon={<ArrowForwardIosIcon />}>
                                                Login
                                            </Button>
                                        </Link>
                                        <Link href="/register">
                                            <Button variant="contained" color='success'>
                                                Register
                                            </Button>
                                        </Link>

                                    </Stack>
                                </>
                            )}
                        </Box>
                    </Toolbar>
                </AppBar>
                {authentified && (
                    <>
                        <Box
                            component="nav"
                            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                            aria-label="mailbox folders"
                        >
                            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                            <Drawer
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{
                                    display: { xs: 'block', sm: 'none' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                                }}
                            >
                                {drawer}
                            </Drawer>
                            <Drawer
                                variant="permanent"
                                sx={{
                                    display: { xs: 'none', sm: 'block' },
                                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                                }}
                                open
                            >
                                {drawer}
                            </Drawer>
                        </Box><Box
                            component="main"
                            sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                        >
                            <Toolbar />
                            <main>{children}</main>
                        </Box>
                    </>
                )}
            </Box>
        </>

    );
}

export default Layout;