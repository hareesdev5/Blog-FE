import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

function Header() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let logout = useLogout();
  let [role, setRole] = useState("");

  useEffect(() => {
    if (!userData) {
      logout;
    } else {
      setRole(userData.role);
    }
  }, []);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>
          <h3>Blog App</h3>{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto nav-css">
            {role === "admin" ? <Admin /> : <User />}
          </Nav>
          <Nav>
            <h5>{`${userData.firstName} ${userData.lastName}`}</h5>
          </Nav>
          &nbsp;&nbsp;&nbsp;
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

function Admin() {
  let navigate = useNavigate();
  return (
    <>
      <div className="d-flex gap-5 mt-2 ">
        <Nav.Item onClick={() => navigate("/dashboard")}>Dashboard</Nav.Item>
      </div>
    </>
  );
}

function User() {
  let navigate = useNavigate();
  return (
    <>
      <div className="nav-item ">
        <Nav.Item onClick={() => navigate("/home")}>Home</Nav.Item>
        <Nav.Item onClick={() => navigate("/dashboard")}>Dashboard</Nav.Item>
        <Nav.Item onClick={() => navigate("/create")}>Create</Nav.Item>
      </div>
    </>
  );
}
