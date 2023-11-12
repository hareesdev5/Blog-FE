import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utilis/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

function SignIn() {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [Password, setPassword] = useState("");
  let logout = useLogout();

  let handleLogin = async () => {
    try {
      let res = await AxiosService.post("/user/login", {
        email,
        Password,
      });
      if (res.status === 200) {
        toast.success("Login Successfully");
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userData", JSON.stringify(res.data.userData));
        if (res.data.userData.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="container-fluid" id="login-con">
      <h2>Login</h2>
      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            className=" m-auto w-m"
            type="email"
            placeholder="Enter email"
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

        <Button variant="primary" onClick={handleLogin}>
          Submit
        </Button>
        &nbsp;
        &nbsp;
        &nbsp;
        <a  onClick={()=>navigate('/signUp')} style={{cursor:'pointer'}}>
          SignUp
        </a>
        
      </Form>
    </div>
  );
}

export default SignIn;
