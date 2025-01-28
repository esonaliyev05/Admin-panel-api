import React, { useEffect, useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const [search, setSearch] = useState("");
  const [delet, setDelet] = useState(false);
  const [post, setPost] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);  // Edit modalni boshqarish uchun
  const [formData, setFormData] = useState({
    id: null,
    nameEn: "",
    nameRu: "",
    file: null,
  });

  const navigate = useNavigate();
  const tokenbek = localStorage.getItem("token");

  const logoutFunction = () => {
    localStorage.removeItem("tokenchik");
    navigate("/home");
  };

  const getCategory = () => {
    fetch("https://realauto.limsa.uz/api/categories")
      .then((res) => res.json())
      .then((response) => setData(response?.data))
      .catch((error) => {
        toast.error("Error fetching data");
        console.error(error);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      nameEn: item.name_en,
      nameRu: item.name_ru,
      file: null,
    });
    setEdit(true);  // Modalni ochish
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tokenbek) {
      toast.error("Token is missing!");
      return;
    }

    const formdata = new FormData();
    formdata.append("name_en", formData.nameEn);
    formdata.append("name_ru", formData.nameRu);
    if (formData.file) {
      formdata.append("images", formData.file);
    }

    fetch(`https://realauto.limsa.uz/api/categories/${formData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message);
          getCategory();
          setEdit(false);  // Edit modalni yopish
        } else {
          toast.error(response?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error updating category");
        console.error(err);
      });
  };

  return (
    <div className="home-container">
      <div className="admin-panel">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">Admin Panel</div>
          <ul className="menu">
            <li>Dashboard</li>
            <li>Users</li>
            <li>Settings</li>
            <li onClick={logoutFunction}>Logout</li>
          </ul>
        </aside>

        <main className="main-content">
          <header className="navbar">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onClick={() => setSearch(true)}
              />
            </div>
            <div className="user-profile">Profile</div>
          </header>

          <section className="dashboard">
            <div className="card">
              Malumot qo'shish <br /> <br />
              <button onClick={() => setPost(true)}>PUSH</button>
            </div>
          </section>

          {/* Table */}
          <section className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Number</th>
                  <th>Img</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody className="data-count-get">
                {data?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.name_en}</td>
                    <td>{item?.name_ru}</td>
                    <td>
                      <img
                        src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                        alt="alt"
                      />
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          setCategoryToDelete(item?.id);
                          setDelet(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <th>
                      <button onClick={() => handleEdit(item)}>Edit</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Edit Modal */}
          <div className={edit ? "main-push activ" : "main-push"}>
            <div className="main-parent">
              <form onSubmit={handleSubmit}>
                <div className="qut-edit" onClick={() => setEdit(false)}>
                  X
                </div>

                <input
                  type="text"
                  name="nameEn"
                  value={formData.nameEn}
                  onChange={(e) =>
                    setFormData({ ...formData, nameEn: e.target.value })
                  }
                  required
                  minLength={3}
                  placeholder="Name (EN)"
                />
                <input
                  type="text"
                  name="nameRu"
                  value={formData.nameRu}
                  onChange={(e) =>
                    setFormData({ ...formData, nameRu: e.target.value })
                  }
                  required
                  minLength={3}
                  placeholder="Name (RU)"
                />
                <input
                  type="file"
                  name="file"
                  onChange={(e) =>
                    setFormData({ ...formData, file: e.target.files[0] })
                  }
                />
                <button type="submit">Update</button>
              </form>
            </div>
          </div>

          {/* Post Modal */}
          <div className={post ? "main-post activ" : "main-post"}>
            <div className="main-parent">
              <form>
                <div className="qut-edit" onClick={() => setPost(false)}>
                  X
                </div>

                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="Name (EN)"
                />
                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="Name (RU)"
                />
                <input type="file" required />
                <button type="submit">Post</button>
              </form>
            </div>
          </div>

          <div className={delet ? "delete-modal activ" : "delete-modal"}>
            <div className="main-parent">
              <div className="modal-content">
                <p>Are you sure you want to delete this category?</p>
                <button
                  onClick={() => {
                    // deleteCategory(categoryToDelete);
                    setDelet(false);
                  }}
                >
                  Yes, Delete
                </button>
                <button onClick={() => setDelet(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
