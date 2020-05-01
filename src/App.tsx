import React from 'react';

import './App.css';
import UserForm from "./pages/UserForm";
import PromiseComponent from './pages/PromiseComponent';
import GithubProfile from "./pages/GithubProfile";
import Error from './components/Error';
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Theme, createStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => createStyles({
    appBar: {
        marginBottom: '15px'
    },
    menuButton: {
        margin: theme.spacing(1),
    },
    title: {
        flexGrow: 1
    }
}));

const App: React.FC<{}> = () => {
    const classes = useStyles();
    const [showMenu, setShowMenu] = React.useState(false);

    const newRef = React.useRef<HTMLDivElement | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>();
    React.useEffect(() => {
        setAnchorEl(newRef.current);
    }, []);


    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <BrowserRouter>
            <header>
                <AppBar title="Main menu" position="static" className={classes.appBar}>
                    <Toolbar>
                        <span ref={newRef}>
                        <IconButton edge="start" className={classes.menuButton} onClick={toggleMenu} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        </span>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={showMenu}
                            onClose={toggleMenu}
                        >
                            <MenuItem onClick={toggleMenu}><Link to="/promise">Promise</Link></MenuItem>
                            <MenuItem onClick={toggleMenu}><Link to="/user-form">Multi-step form</Link></MenuItem>
                            <MenuItem onClick={toggleMenu}><Link to="/github-profile">Github profile</Link></MenuItem>
                        </Menu>
                        <Typography variant="h6" className={classes.title}>MaterialUI & TypeScript</Typography>
                    </Toolbar>
                </AppBar>
            </header>
            <main className="App">
                <Switch>
                    <Route path="/" component={UserForm} exact />
                    <Route path="/promise" component={PromiseComponent} />
                    <Route path="/user-form" component={UserForm} />
                    <Route path="/github-profile" component={GithubProfile} />
                    <Route component={Error} />
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
