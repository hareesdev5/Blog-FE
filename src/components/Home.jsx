import React, { useEffect, useState } from "react";
import useLogout from "../hooks/useLogout";
import AxiosService from "../utilis/ApiService";
import BlogTail from "../common/BlogTail";
import { toast } from "react-toastify";

function Home() {
  let [blogs, setBlogs] = useState([]);
  let logout = useLogout();
  let getData = async () => {
    try {
      let res = await AxiosService.get("/dashboard/blogs");
      if (res.status === 200) {
        setBlogs(res.data.data);
      }
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Token Expired");
        logout();
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="container-fluid d-grid justify-content-center">
      {blogs.map((e) => {
        return <BlogTail blog={e} key={e._id} />;
      })}
    </div>
  );
}

export default Home;
