import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({
  onServiceChange,
  routes,
}: {
  onServiceChange: () => void;
  routes: { path: string; name: string }[];
}) => {
  return (
    <nav className="header navbar navbar-expand-md navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Star DB
      </a>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav mr-auto">
          {routes.map((route) => {
            return (
              <li key={route.name} className="nav-item active">
                <Link className="nav-link" to={route.path}>
                  {route.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="btn btn-primary btn-sm" onClick={onServiceChange}>
        S
      </button>
    </nav>
  );
};

export default Header;
