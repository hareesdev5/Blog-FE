import AxiosService from "../utilis/ApiService";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useLogout from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let logout = useLogout();
  let navigate = useNavigate();
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let [blogs, setBlogs] = useState([]);
  let getData = async () => {
    try {
      let url = userData.role === "admin" ? "/blog" : "/blog/user";
      let res = await AxiosService.get(url);
      if (res.status === 200) {
        setBlogs(res.data.data);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <table className="dashboard-table table ">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Image</th>
          <th scope="col">Status</th>
          <th scope="col">CreateAt</th>
        </tr>
      </thead>
      <tbody>
        {blogs.map((e, i) => (
          <tr key={e._id} onClick={() => navigate(`/blog/${e._id}`)}>
            <td>{i + 1}</td>
            <td>{e.title}</td>
            <td>
              <img src={e.imageUrl} className="blog-img" />
            </td>
            <td>{e.status}</td>
            <td>{e.createAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Dashboard;
