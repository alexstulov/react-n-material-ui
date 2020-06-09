import React, { useEffect } from "react";

import "./App.css";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { Link, Router, Route, Switch } from "react-router-dom";

import UserForm from "./pages/UserForm";
import PromiseComponent from "./pages/PromiseComponent";
import GithubProfile from "./pages/GithubProfile";
import TodoList from "./pages/TodoApp";
import Hooks from "./pages/Hooks";
import Error from "./components/Error";
import LoginPage from "./pages/LoginPage";

import modules from "./modules";

import { authenticationService } from "./services";
import { PrivateRoute } from "./components/helpers";

import { createBrowserHistory } from "history";
const history = createBrowserHistory();

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      marginBottom: "15px",
    },
    menuButton: {
      margin: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
  })
);

const App: React.FC<{}> = () => {
  const classes = useStyles();
  const [showMenu, setShowMenu] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect(() => {
    authenticationService.currentUser.subscribe((x) => setCurrentUser(x));
  }, []);

  const logout = () => {
    authenticationService.logout();
    history.push("/login");
  };

  const newRef = React.useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>();
  React.useEffect(() => {
    setAnchorEl(newRef.current);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  interface ModuleType {
    routes: Array<{
      routeProps: {
        path: string;
        exact: boolean;
        component: React.FC;
      };
      name: string;
    }>;
  }

  let moduleRoutes: Array<any> = [];
  let moduleLinks: { [name: string]: React.ReactElement[] } = {
    test: [<Link to="/">Test</Link>],
  };
  for (let i = 0; i < modules.length; i += 1) {
    const module = modules[i]();
    moduleLinks = {
      [module.name]: [],
    };
    module.routes.forEach(
      (route: {
        name: string;
        routeProps: { path: string; exact: boolean; component: any };
      }): void => {
        moduleRoutes.push(
          <PrivateRoute key={route.name} {...route.routeProps} />
        );
        moduleLinks[module.name].push(
          <Link to={route.routeProps.path}>{route.name}</Link>
        );
      }
    );
  }

  let moduleMenuItems: React.ReactElement[] = [<MenuItem>Hello</MenuItem>];
  Object.keys(moduleLinks).forEach((moduleName) => {
    moduleMenuItems = [];
    moduleMenuItems.push(<Divider />);
    moduleLinks[moduleName].map((link) => {
      moduleMenuItems.push(<MenuItem onClick={toggleMenu}>{link}</MenuItem>);
    });
  });

  const HeaderBurgerMenu = () => {
    return (
      <>
        <span ref={newRef}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={toggleMenu}
            color="inherit"
            aria-label="menu"
          >
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
          <MenuItem onClick={toggleMenu}>
            <Link to="/promise">Promise</Link>
          </MenuItem>
          <MenuItem onClick={toggleMenu}>
            <Link to="/react-hooks">React Hooks</Link>
          </MenuItem>
          <MenuItem onClick={toggleMenu}>
            <Link to="/user-form">Multi-step form</Link>
          </MenuItem>
          <MenuItem onClick={toggleMenu}>
            <Link to="/github-profile">Github profile</Link>
          </MenuItem>
          <MenuItem onClick={toggleMenu}>
            <Link to="/todo-list">Todo List</Link>
          </MenuItem>
          {currentUser && <MenuItem onClick={toggleMenu} disabled>StarDb</MenuItem>}
          {currentUser && moduleMenuItems}
          {currentUser && <MenuItem
            onClick={() => {
              toggleMenu();
              logout();
            }}
          >
            Logout
          </MenuItem>}
          {!currentUser && <MenuItem onClick={toggleMenu}>
            <Link to="/login">Login</Link>
          </MenuItem>}
        </Menu>
      </>
    );
  };

  return (
    <Router history={history}>
      <header>
        <AppBar title="Main menu" position="static" className={classes.appBar}>
          <Toolbar>
            <HeaderBurgerMenu />
            <Typography variant="h6" className={classes.title}>
              MaterialUI & TypeScript
            </Typography>
          </Toolbar>
        </AppBar>
      </header>
      <main className="App">
        <Switch>
          <Route path="/" component={UserForm} exact />
          <Route path="/promise" component={PromiseComponent} />
          <Route path="/react-hooks" component={Hooks} />
          <Route path="/user-form" component={UserForm} />
          <Route path="/github-profile" component={GithubProfile} />
          <Route path="/todo-list" component={TodoList} />
          {moduleRoutes}
          <Route path="/login" component={LoginPage} />
          <Route component={Error} />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
