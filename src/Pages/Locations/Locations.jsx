import React, { useEffect, useState } from "react";
import { IoPushOutline } from "react-icons/io5";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";
import "./Locations.scss";

const Locations = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [picture, setPicture] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [locationToEdit, setLocationToEdit] = useState(null);

  function getCategory() {
    setIsLoading(true);
    fetch("https://realauto.limsa.uz/api/locations")
      .then((res) => res.json())
      .then((response) => {
        if (Array.isArray(response?.data)) {
          setData(response?.data);
        } else {
          setData([]);
          toast.error("Unexpected API response");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  const tokenbek = localStorage.getItem("token");

  const createCategory = (e) => {
    e.preventDefault();

    if (!tokenbek) {
      toast.error("Token is missing!");
      return;
    }

    if (!name || !text || !picture) {
      toast.error("Please fill all fields");
      return;
    }

    const formdata = new FormData();
    formdata.append("text", text);
    formdata.append("name", name);
    formdata.append("images", picture);

    fetch("https://realauto.limsa.uz/api/locations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success(elem?.massage);
          toast.success("Mufaqiyatli qo'shildi")
          getCategory();
          e.target.reset();
          setPost(false);
        } else {
          toast.error(elem?.massage || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error creating category");
        console.log(err);
      });
  };

  const [formData, setFormData] = useState({
    name: "",
    text: "",
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

    if (!formData.name || !formData.text || !formData.file) {
      toast.error("Please fill all fields");
      return;
    }

    const formDataForEdit = new FormData();
    formDataForEdit.append("name", formData.name);
    formDataForEdit.append("text", formData.text);
    formDataForEdit.append("images", formData.file);

    const token = localStorage.getItem("token");
    fetch(`https://realauto.limsa.uz/api/locations/${locationToEdit}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataForEdit,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success(response?.massage);
          getCategory();
          setEdit(false);
        } else {
          toast.error(response?.massage || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error updating category");
        console.log(err);
      });
  };

  const deleteCategory = (locationId) => {
     if(!tokenbek) {
      toast.error("Token is missing");
      return;
     }
     fetch(`https://realauto.limsa.uz/api/locations/${locationId}` , {
      method: "DELETE",
       headers: {
        Authorization: `Bearer ${tokenbek}`,
       },
     })
     .then((res) => res.json())
     .then((response) => {
      if(response?.success) {
        toast.success(response?.massage);
        toast.success("Ochirildi")
        getCategory()
        setData(false);
      }else {
        toast.error(response?.massage || "Unknown error");
      }
     })
     .catch((err) => {
      toast.error("Error deleting category");
      console.error(err)
     })
  }

  return (
    <div className="Locations">
      <div className="container">
        <section className="dashboard">
          <div className="card">
            Malumot qo'shish <br /> <br />
            <button onClick={() => setPost(true)}>
              <IoPushOutline /> PUSH
            </button>
          </div>
        </section>
        <div className="data-table">
          {isLoading ? (
            <h2>
              <ClockLoader />
            </h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ModelName</th>
                  <th>BrandName</th>
                  <th>Text</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody className="data-count-get">
                {Array.isArray(data) &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.name}</td>
                      <td>
                        <img
                          src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                          alt=""
                        />
                      </td>
                      <td>{item?.text}</td>
                      <td>
                      <button onClick={() => deleteCategory(item.id)}>Delete</button>

                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setEdit(true);
                            setLocationToEdit(item?.id);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={post ? "Location-main activ" : "Location-main"}>
        <div className="main-parent">
          <form onSubmit={createCategory}>
            <div className="qut-edit" onClick={() => setPost(false)}>
              X
            </div>
            <input
              type="text"
              name="name"
              required
              minLength={3}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              name="text"
              required
              minLength={3}
              placeholder="Text"
              onChange={(e) => setText(e.target.value)}
            />
            <input
              type="file"
              name="file"
              required
              onChange={(e) => setPicture(e.target.files[0])}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      <div className={edit ? "Location-edit activ" : "Location-edit"}>
        <div className="main-parent">
          <form onSubmit={handleSubmit}>
            <div className="qut-edit" onClick={() => setEdit(false)}>
              X
            </div>
            <input
              type="text"
              name="name"
              required
              minLength={3}
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              type="text"
              name="text"
              required
              minLength={3}
              placeholder="Text"
              onChange={handleChange}
            />
            <input type="file" name="file" required onChange={handleChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Locations;
