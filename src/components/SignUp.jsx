import React, { useState } from "react";
import AxiosService from "../utilis/ApiService";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function SignUp() {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [Password, setPassword] = useState("");

  let navigate = useNavigate();

  let SignUp = async (e) => {
    e.preventDefault();
    try {
      let res = await AxiosService.post("/user/signUp", {
        firstName,
        lastName,
        email,
        Password,
      });
      if (res.status === 201) {
        toast.success("Created Successfull");
        sessionStorage.setItem("token", res.data.token);
        navigate("/");
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="container-fluid" id="login-con">
      <h2>Create Account</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            className=" m-auto w-m"
            type="text"
            placeholder="FirstName"
            feedback="You must agree before submitting."
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className=" m-auto w-m"
            type="text"
            placeholder="LastName"
            feedback="You must agree before submitting."
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className=" m-auto w-m"
            type="email"
            placeholder="email"
            feedback="You must agree before submitting."
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className="m-auto w-m"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={SignUp}>
          Submit
        </Button>
        &nbsp; &nbsp; &nbsp;
        <a onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          SignIn
        </a>
      </Form>
    </div>
  );
}

export default SignUp;
