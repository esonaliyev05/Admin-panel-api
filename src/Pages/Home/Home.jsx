import React, { useEffect, useState } from "react";
import "./Home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [serch, setSearch] = useState(false);
  const [delet, setDelet] = useState(false);
  const [edit, setEdit] = useState(false);
  const [post , setPost] = useState(false)

  const navigate = useNavigate();

  const logoutFunction = () => {
    localStorage.removeItem("tokenchik");
    navigate("/home");
  };
   
  // get api 

  const [data, setData] = useState([]);

  function getCategory() {
    fetch("https://realauto.limsa.uz/api/categories")
      .then((res) => res.json())
      .then((response) => setData(response?.data));
  }
  useEffect(() => {
    getCategory();
  }, []);
  console.log(data);

  //  post api 

  const [modalOpen , setModalOpen] = useState(false)
  const [nameEn , setNameEn] = useState()
  const [nameRu , setNameRu] = useState()
  const [picture , setPicture] = useState()


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
            <li>Logout</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          {/* Navbar */}
          <header className="navbar">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                // onClick={() => setEdit(true)}
              />
            </div>
            <div className="user-profile">Profile</div>
          </header>

          {/* Dashboard Cards */}
          <section className="dashboard">
            <div className="card">
              Malumot qoshish <br /> <br />
              <button onClick={() => setPost(true)}>PUSH</button>
            </div>
            <div className="card">Card 2</div>
            <div className="card">Card 3</div>
          </section>

          {/* Table */}
          <section className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Number</th>
                  <th>img</th>
                  <th>delet</th>
                  <th>edit</th>
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
                      <button onClick={() => setDelet(true)}>delet</button>
                    </td>
                    <th>
                      <button onClick={() => setEdit(true)}>edit</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <div className={edit ? "main-push activ" : "main-push"}>
            <div className="main-parent">
              <form>
                <div className="qut-edit" onClick={() => setEdit(false)}>
                  X
                </div>

                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="name en"
                />
                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="name ru"
                />
                <input type="file" required />

                <button>put</button>
              </form>
            </div>
          </div>
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
                  placeholder="name en"
                  onChange={(e)=> setNameEn(e?.target.value)}
                />
                <input
                  type="text"
                  required
                  minLength={3}
                  placeholder="name ru"
                  onChange={(e)=> setNameRu(e?.target.value)}
                />
                <input type="file" required onChange={((e) => console.log(e?.target.files[0]))} accept="image/png , image/jpeg" readOnly />

                <button onClick={ () => setModalOpen(true)}>post</button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
