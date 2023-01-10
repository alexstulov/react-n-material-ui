import React, { useEffect } from "react";
import clsx from "clsx";
import {
  useTheme,
  Theme,
  createStyles,
} from "@mui/material/styles";
import { makeStyles } from 'tss-react/mui'
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import { Link, Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ListItemIcon from "@mui/material/ListItemIcon";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import LogInIcon from "@mui/icons-material/LockOpen";
import LogOutIcon from "@mui/icons-material/Lock";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
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

import Game from "./components/tictactoe/Game";
import FormikWithYup from "./components/formik/FormikYupExample";
import { FormikExample } from "./components/formik";

const drawerWidth = 240;

const useStyles: any = makeStyles()((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginBottom: "15px",
    },
    title: {
      flexGrow: 1,
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    nestedContainer: {
      width: drawerWidth,
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function PersistentDrawerLeft() {
  const {classes} = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState(null);

  useEffect(() => {
    authenticationService.currentUser.subscribe((x) => setCurrentUser(x));
  }, []);

  const logout = () => {
    authenticationService.logout();
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [dropdown, setDropdown] = React.useState(true);

  const handleClick = () => {
    setDropdown(!dropdown);
  };

  interface ModuleType {
    routes: Array<{
      routeProps: {
        path: string;
        exact: boolean;
        component: React.FunctionComponent;
      };
      name: string;
    }>;
  }

  let moduleRoutes: Array<JSX.Element> = [];
  let moduleLinks: { [name: string]: React.ReactElement[] } = {};
  for (let i = 0; i < modules.length; i += 1) {
    const module = modules[i]();
    moduleLinks[module.name] = [];
    module.routes.forEach(
      (route: {
        name: string;
        routeProps: { path: string; exact: boolean; element: any };
      }): void => {
        moduleRoutes.push(
          <Route key={route.name} {...route.routeProps} element={<PrivateRoute />}>
            <Route index={false} {...route.routeProps}  />
          </Route>
        );
        moduleLinks[module.name].push(
          <Link to={route.routeProps.path}>{route.name}</Link>
        );
      }
    );
  }

  let moduleMenuLists: React.ReactElement[] = [];
  Object.keys(moduleLinks).forEach((moduleName) => {
    moduleMenuLists.push(
      <div key={moduleName}>
        <Divider />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              {moduleName}
            </ListSubheader>
          }
          className={classes.nestedContainer}
        >
          {moduleLinks[moduleName].map((link) => (
              <ListItem button key={moduleName+link.props.children}>
                <ListItemText>{link}</ListItemText>
              </ListItem>))}
        </List>
      </div>
    );
  });
  return (
    <Router>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            React, Material UI & TypeScript
          </Typography>
          {currentUser && (
            <IconButton onClick={logout}>
              <LogOutIcon />
            </IconButton>
          )}
          {!currentUser && (
            <Link to="/login">
              <IconButton>
                <LogInIcon />
              </IconButton>
            </Link>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              General stuff
            </ListSubheader>
          }
          className={classes.nestedContainer}
        >
          <ListItem button>
            <ListItemText>
              <Link to="/promise">Promise</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/react-hooks">React Hooks</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/user-form">Multi-step form</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/formik">Formik</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/formik-yup">Formik with Yup</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/github-profile">Github profile</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/todo-list">Todo List</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/tic-tac-toe">Tic tac toe</Link>
            </ListItemText>
          </ListItem>
        </List>
        {currentUser && moduleMenuLists}
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
          style={{ display: "none" }}
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Collapsable list items
            </ListSubheader>
          }
          className={classes.nestedContainer}
        >
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Sent mail" />
          </ListItem>
          <ListItem button onClick={handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
            {dropdown ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={dropdown} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Starred" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <main className="App">
        <div className={classes.drawerHeader} />
        <Routes>
          <Route
            path="/"
            element={(() => (
              <div style={{ textAlign: "center" }}>
                <h2>Hello</h2>
              </div>
            ))()}
          />
          <Route path="/promise" element={<PromiseComponent />} />
          <Route path="/react-hooks" element={<Hooks />} />
          <Route path="/user-form" element={<UserForm />} />
          <Route path="/formik" element={<FormikExample />} />
          <Route path="/formik-yup" element={<FormikWithYup />} />
          <Route path="/github-profile" element={<GithubProfile />} />
          <Route path="/todo-list" element={<TodoList />} />
          <Route path="/tic-tac-toe" element={<Game />} />
          {currentUser && moduleRoutes}
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Error  />} />
        </Routes>
      </main>
      </Router>
  );
}
