import React, { useEffect, useState } from "react";
import AxiosService from "../utilis/ApiService";
import { useParams, useNavigate, json } from "react-router-dom";
import { toast } from "react-toastify";
import BlogTail from "../common/BlogTail";
import useLogout from "../hooks/useLogout";
import { Form, Button } from "react-bootstrap";

function Blog() {
  let res = JSON.parse(sessionStorage.getItem("userData"));

  return res.role === "admin" ? (
    <>
      <Admin />
    </>
  ) : (
    <>
      <User />
    </>
  );
}

export default Blog;

function Admin() {
  let params = useParams();
  let [blog, setBlog] = useState({});
  let logout = useLogout();
  let navigate = useNavigate();

  let getblog = async () => {
    try {
      let res = await AxiosService.get(`/blog/${params.id}`);
      if (res.status === 200) {
        setBlog(res.data.blog);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
      if (error.response.status === 400) {
        logout();
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      getblog();
    } else {
      logout();
    }
  }, []);

  let changeStatus = async (status) => {
    try {
      let res = await AxiosService.put(`/blog/status/${blog._id}/${status}`);
      if (res.status === 200) {
        getblog();
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    }
  };
  return (
    <>
      <div className="container-fluid d-grid justify-content-center  mb-5 ">
        <div className="blog-wrapper">
          <BlogTail blog={blog} />
        </div>
        <div className="d-flex justify-content-center gap-4">
          {blog.status !== "approved" ? (
            <Button variant="info" onClick={() => changeStatus("approved")}>
              Approve
            </Button>
          ) : (
            <></>
          )}
          {blog.status !== "pending" ? (
            <Button variant="warning" onClick={() => changeStatus("pending")}>
              Pending{" "}
            </Button>
          ) : (
            <></>
          )}
          {blog.status !== "rejected" ? (
            <Button variant="danger" onClick={() => changeStatus("rejected")}>
              Reject
            </Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

function User() {
  let [title, setTitle] = useState("");
  let [imageUrl, setImageUrl] = useState("");
  let [describtion, setDescribtion] = useState("");
  let [blog, setBlog] = useState({});
  let params = useParams();
  let navigate = useNavigate();

  let handleSave = async () => {
    try {
      let res = await AxiosService.put(`/blog/edit/${params.id}`, {
        title,
        imageUrl,
        describtion,
      });
      if (res.status === 200) {
        toast.success("Blog Edited Successfully");
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  let getData = async () => {
    let res = await AxiosService.get(`/blog/${params.id}`);
    if (res.status === 200) {
      let data = res.data.blog;
      setTitle(data.title);
      setImageUrl(data.imageUrl);
      setDescribtion(data.describtion);
      setBlog(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div>
        <Form className="d-grid form-css">
          <div
            className="m-1 d-grid  justify-content-center"
            style={{ textAlign: "center" }}
          >
            <h2>Preview</h2>
            <div>
              <BlogTail blog={{ title, imageUrl, describtion }} />
            </div>
          </div>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={imageUrl}
              placeholder="ImageUrl"
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={describtion}
              placeholder="Description"
              onChange={(e) => setDescribtion(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleSave}>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
