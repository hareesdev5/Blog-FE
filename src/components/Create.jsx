import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AxiosService from "../utilis/ApiService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BlogTail from "../common/BlogTail";

function Create() {
  let [title, setTitle] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  let [describtion, setDescribtion] = useState("");
  let navigate = useNavigate();

  let handleSave = async () => {
    try {
      let res = await AxiosService.post("/blog/create", {
        title,
        imageUrl,
        describtion,
      });
      if (res.status === 201) {
        toast.success("Blog Created Successfully");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form className="d-grid form-css">
        <div
          className="m-1 d-grid  justify-content-center"
          style={{ textAlign: "center" }}
        >
          <h2>Preview</h2>
          <div>
            <BlogTail blog={{ title, imageUrl, describtion }}></BlogTail>
          </div>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="ImageUrl"
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={(e) => setDescribtion(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSave}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Create;
