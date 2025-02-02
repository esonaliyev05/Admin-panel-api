import React, { useEffect, useState } from "react";
import "./Cities.scss";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { IoPushOutline } from "react-icons/io5";

const Cities = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(false);
  const [edit, setEdit] = useState(false);
  const tokenbek = localStorage.getItem("token");
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");

  function getCategory() {
    setLoading(true); // Start loading
    fetch("https://realauto.limsa.uz/api/cities")
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data);
        toast.success(response?.message);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  const createCategory = (e) => {
    e.preventDefault();

    if (!tokenbek) {
      toast.error("Token is missing!");
      return;
    }

    if (!title || !name || !picture) {
      toast.error("Please fill all fields.");
      return;
    }

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("images", picture);
    formdata.append("name", name);

    fetch("https://realauto.limsa.uz/api/cities", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success(elem?.message);
          e.target.reset();
          getCategory();
        } else {
          toast.error(elem?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error creating category");
        console.log(err);
      });
  };
  const [formData, setFormData] = useState({
    title: "",
    file: null,
    name: "",
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

    if (!formData.title || !formData.name || formData.file) {
      toast.error("Please fill all filelds");
      return;
    }

    console.log("Yuborilgan malumot:", formData);

    const formDataForEdit = new FormData();
    formDataForEdit.append("title" , formData.title);
    formDataForEdit.append("images" , formData.file);
    formDataForEdit.append("name", formData.name);

    const token = localStorage.getItem("token")

     fetch("https://realauto.limsa.uz/api/cities" , {
      method: "POST",
      headers:{
      Authorization: `Bearer ${token}`,

      },
      body: formData,

     })
     .then((res) => res.json())
     .then((elem) => {
      if (elem?.success) {
        toast.success(elem?.message);
        e.target.reset();
      }else {
        toast.error(elem?.message || "Unknown error");
      }
     })
     .catch((err) => {
      toast.error("Error creating catigory");
      console.log(err);
     });

  };

   

  return (
    <div className="Cities">
      <div className="container">
        <section className="dashboard">
          <div className="card">
            Malumot qo'shish <br /> <br />
            <button onClick={() => setPost(true)}>
              {" "}
              <IoPushOutline /> PUSH
            </button>
          </div>
        </section>
        <div className="data-table">
          {loading ? (
            <h2>
              <ClockLoader />{" "}
            </h2>
          ) : (
            // Loder componenti
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
                    <td>{item?.name}</td>
                    <td>
                      <img
                        src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                        alt={item?.name}
                      />
                    </td>
                    <td>{item?.text}</td>

                    <td>
                      <button>delet</button>
                    </td>
                    <th>
                      <button onClick={() => setEdit(true)}>edit</button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={post ? "cities-post activ" : "cities-post"}>
        <div className="main-parent">
          <form>
            <div className="qut-edit" onClick={() => setPost(false)}>
              X
            </div>

            <input
              type="text"
              name="nameEn"
              required
              minLength={3}
              placeholder="Name (EN)"
            />
            <input
              type="text"
              name="nameRu"
              required
              minLength={3}
              placeholder="Name (RU)"
            />
            <input type="file" name="file" required />
            <button type="submit" onClick={() => setEdit(false)}>
              Update
            </button>
          </form>
        </div>
      </div>

      <div className={edit ? "cities-edit activ" : "cities-edit"}>
        <div className="main-parent">
          <form>
            <div
              className="qut-edit"
              onClick={() => setEdit(false)}
              style={{ cursor: "pointer" }}
            >
              X
            </div>

            <input
              type="text"
              name="nameEn"
              required
              minLength={3}
              placeholder="Name (EN)"
            />
            <input
              type="text"
              name="nameRu"
              required
              minLength={3}
              placeholder="Name (RU)"
            />
            <input type="file" name="file" required />
            <button type="submit" onClick={() => setEdit(false)}>
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cities;
