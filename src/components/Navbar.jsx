import React from "react";
import { Navbar, Nav, Container, Dropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../store";
import logo from "/workspaces/StarWarsBlogErikRuiz/src/assets/star-wars-logo.png";

const CustomNavbar = () => {
  const { store, actions } = useAppContext();

  return (
    <Navbar
      expand="lg"
      bg={store.theme}
      variant={store.theme}
      className="mb-4 shadow-sm"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
  <img
    src={logo}
    alt="Star Wars Logo"
    height="90"
    style={{ objectFit: "contain" }}
  />
  StarWars Blog
</Navbar.Brand>
        <Nav className="ms-auto d-flex align-items-center gap-2">
          <Dropdown align="end">
            <Dropdown.Toggle variant={store.theme === "dark" ? "secondary" : "outline-secondary"}>
              Favoritos ({store.favorites.length})
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {store.favorites.length === 0 ? (
                <Dropdown.Item disabled>No hay favoritos</Dropdown.Item>
              ) : (
                store.favorites.map((fav, idx) => (
                  <Dropdown.Item key={idx} className="d-flex justify-content-between align-items-center">
                    <span>{fav.name}</span>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => actions.removeFavorite(fav.uid)}
                    >
                      ✕
                    </Button>
                  </Dropdown.Item>
                ))
              )}
            </Dropdown.Menu>
          </Dropdown>

          <Button
            variant={store.theme === "dark" ? "light" : "dark"}
            onClick={actions.toggleTheme}
          >
            {store.theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;