import React, { useEffect, useState } from "react";
import "./Home.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { IoPushOutline } from "react-icons/io5";
import Cards from "../Cards/Cards";
import Brands from "../Brends/Brands";
import Cities from "../Cities/Cities";
import Locations from "../Locations/Locations";
import Models from "../Models/Models";

const Home = () => {
  const [user, setUser] = useState(false);
  const [search, setSearch] = useState("");
  const [delet, setDelet] = useState(false);
  const [post, setPost] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [categoryToEdit, setCategoryToEdit] = useState(null);
  const [activeComponent, setActiveComponent] = useState("A")

  const navigate = useNavigate();
  const logoutFunction = () => {
    localStorage.removeItem("tokenchik");
    navigate("/");
  };

  const [data, setData] = useState([]);
  console.log(data);

  function getCategory() {
    fetch("https://realauto.limsa.uz/api/categories")
      .then((res) => res.json())
      .then((response) => setData(response?.data))
      .catch((error) => {
        toast.error("Error fetching data");
        console.error(error);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  const [nameEn, setNameEn] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [seachopen, seachOpen] = useState(false);
  const [picture, setPicture] = useState(null);
  const tokenbek = localStorage.getItem("token");

  const createCategory = (e) => {
    e.preventDefault();
    if (!tokenbek) {
      toast.error("Token is missing!");
      return;
    }

    if (!nameEn || !nameRu || !picture) {
      toast.error("Please fill all fields.");
      return;
    }

    const formdata = new FormData();
    formdata.append("name_en", nameEn);
    formdata.append("name_ru", nameRu);
    formdata.append("images", picture);

    fetch("https://realauto.limsa.uz/api/categories", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success(elem?.message);
          e.target.reset();
        } else {
          toast.error(elem?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error creating category");
        console.error(err);
      });
  };

  const deleteCategory = (categoryId) => {
    if (!tokenbek) {
      toast.error("Token is missing!");
      return;
    }

    fetch(`https://realauto.limsa.uz/api/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message);
          getCategory();
          setDelet(false);
        } else {
          toast.error(response?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error deleting category");
        console.error(err);
      });
  };

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    nameEn: "",
    nameRu: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.nameEn || !formData.nameRu || !formData.file) {
      toast.error("Please fill all fields.");
      return;
    }

    const formDataForEdit = new FormData();
    formDataForEdit.append("name_en", formData.nameEn);
    formDataForEdit.append("name_ru", formData.nameRu);
    formDataForEdit.append("images", formData.file);

    const token = localStorage.getItem("token");
    fetch(`https://realauto.limsa.uz/api/categories/${categoryToEdit}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataForEdit,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message);
          getCategory();

          setEdit(false);
        } else {
          toast.error(response?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error updating category");
        console.error(err);
      });
  };

  useEffect(() => {
    // API-dan ma'lumot olish
    fetch("https://realauto.limsa.uz/api/data")
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error("Xatolik:", error));
  }, []);

  // // **Qidiruv bo‘yicha filter qilish**
  const filteredData = data.filter(
    (item) =>
      item.name_en.toLowerCase().includes(search.toLowerCase()) ||
      item.name_ru.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="admin-panel">
        ``
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">Admin Panel</div>
          <ul className="menu">
            <li onClick={() => setActiveComponent("A")}  >Categories</li>
              <li onClick={() => setActiveComponent("B")} >Brands</li>
            <li onClick={() => setActiveComponent("C")}>Cities</li>
            <li onClick={() => setActiveComponent("D")}>Locations</li>
            <li onClick={() => setActiveComponent("E")}>Cars</li>
            <li onClick={() => setActiveComponent("F")}>Models</li>
            <li onClick={logoutFunction}>Logout</li>
          </ul>
        </aside>
        <main className="main-content">
          <header className="navbar">
            <div className="search-bar">
              <input
                type="search"
                className="search-input"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              {search.length > 0 && (
                <div className="search-dropdown">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <div key={index} className="search-item">
                        <span>
                          {item?.name_en} 
                        </span>
                        <span> ({item?.name_ru})</span>
                        <img src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                         alt="" />
                      </div>
                    ))
                  ) : (
                    <p className="no-results">No results found 😒</p>
                  )}
                </div>
              )}
            </div>

            <NavLink to={"/user"} className="Top-link">
              <FaRegCircleUser style={{ color: "white" }} className="icon" />
              <div className="user-profile" style={{ color: "white" }}>
                Profile
              </div>
            </NavLink>
          </header>

          <section className="dashboard">
            <div className="card">
              Malumot qo'shish <br /> <br />
              <button onClick={() => setPost(true)}> <IoPushOutline/> PUSH</button>
            </div>
          </section>
          {/* Table */}

          {activeComponent === "A" &&   <section className="data-table">
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
                          setCategoryToDelete(item?.id); // Modal uchun ID saqlash
                          setDelet(true);
                        }}
                        className="btn-del"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </td>
                    <th>
                      <button
                        onClick={() => {
                          setCategoryToEdit(item?.id);
                          setFormData({
                            nameEn: item?.name_en,
                            nameRu: item?.name_ru,
                            file: null,
                          });
                          setEdit(true);
                        }}
                      >
                       <FaEdit/>  Edit
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          }
          {
            activeComponent === "B" && <Brands/>
          }
          {
            activeComponent === "C" && <Cities/>
          }
          {
            activeComponent === "D" && <Locations/>
          }
          {
            activeComponent === "E" && <Cards/>
          }
          {
            activeComponent === "F" && <Models/>
          }

        

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
                  onChange={handleChange}
                  required
                  minLength={3}
                  placeholder="Name (EN)"
                />
                <input
                  type="text"
                  name="nameRu"
                  value={formData.nameRu}
                  onChange={handleChange}
                  required
                  minLength={3}
                  placeholder="Name (RU)"
                />
                <input
                  type="file"
                  name="file"
                  onChange={handleChange}
                  required
                />
                <button type="submit" onClick={() => setEdit(false)}>
                  Update
                </button>
              </form>
            </div>
          </div>
          {/* Post Modal */}
          <div className={post ? "main-post activ" : "main-post"}>
            <div className="main-parent">
              <form onSubmit={createCategory}>
                <div className="qut-edit" onClick={() => setPost(false)}>
                  X
                </div>

                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="Name (EN)"
                  onChange={(e) => setNameEn(e.target.value)}
                />
                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="Name (RU)"
                  onChange={(e) => setNameRu(e.target.value)}
                />
                <input
                  type="file"
                  required
                  onChange={(e) => setPicture(e.target.files[0])}
                  accept="image/png, image/jpeg"
                />
                <button type="submit" onClick={() => setPost(false)}>
                  Post
                </button>
              </form>
            </div>
          </div>

          {/* <div className={delet ? "delete-modal activ" : "delete-modal"}>
            <div className="main-parent">
              <div className="modal-content">
                <p>Are you sure you want to delete this category?</p>
                <button
                  onClick={() => {
                    deleteCategory(categoryToDelete); // Delete operatsiyasini chaqirish
                  }}
                >
                  Yes, Delete
                </button>
                <button onClick={() => setDelet(false)}>Cancel</button>
              </div>
            </div>
          </div> */}

          <div className={delet ? "delete-modal activ" : "delete-modal"}>
            <div className="main-parent">
              <div className="modal-content">
                <p>Siz Rosstan ham o'chrishni Xoxlaysizmi?</p>
                <button
                  onClick={() => {
                    deleteCategory(categoryToDelete); // O'chirish funksiyasini chaqirish
                    setDelet(false); // Modalni yopish
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

      <div className="home-user"></div>
    </div>
  );
};

export default Home;
