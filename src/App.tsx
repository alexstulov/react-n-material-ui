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
import {Link} from 'react-router-dom';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
    const [showMenu, setShowMenu] = React.useState(false);

    const newRef = React.useRef<HTMLDivElement | null>(null);
    const [anchorEl, setAnchorEl] = React.useState();
    React.useEffect(() => {
        setAnchorEl(newRef.current);
    }, []);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }
    const handleClick = () => {
        setShowMenu(!showMenu);
    }

    const handleClose = () => {
        setShowMenu(!showMenu);
    }

    return (
        <BrowserRouter>
            <header>
                <div ref={newRef}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
                        <MenuIcon />
                    </IconButton>
                </div>
                <AppBar title='Main menu' position='relative'>
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
                </AppBar>
            </header>
            <main className="App">
                <Switch>
                    <Route path="/" component={UserForm} exact/>
                    <Route path="/promise" component={PromiseComponent}/>
                    <Route path="/user-form" component={UserForm}/>
                    <Route path="/github-profile" component={GithubProfile}/>
                    <Route component={Error}/>
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;
