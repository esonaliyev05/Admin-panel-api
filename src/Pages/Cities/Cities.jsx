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
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [picture, setPicture] = useState(null);
  const [formData, setFormData] = useState({
    text: "",
    file: null,
    name: "",
  });
  const [cityId, setCityId] = useState(null);
  const token = localStorage.getItem("token");

  const getCategory = () => {
    if (!token) {
      toast.error("Token is missing");
      return;
    }

    setLoading(true);
    fetch("https://realauto.limsa.uz/api/cities", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data || []);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (e) => {
    console.log(e); // Eventni konsolga chiqarib tekshirib ko'ring
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!formData.name || !formData.text || !formData.file) {
      toast.error("Please fill all fields, including the image!");
      return;
    }

    const formDataForSubmit = new FormData();
    formDataForSubmit.append("name", formData.name);
    formDataForSubmit.append("text", formData.text); // Use 'text' here
    formDataForSubmit.append("images", formData.file);

    setLoading(true);
    fetch("https://realauto.limsa.uz/api/cities", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Remove Content-Type header as FormData will handle it
      },
      body: formDataForSubmit,
    })
      .then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success(elem?.message);
          setFormData({ name: "", text: "", file: null });
          getCategory();
          setPost(false);
        } else {
          toast.error(elem?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error creating city");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (item) => {
    setFormData({
      text: item.text,
      name: item.name,
      file: null, // Keep previous image when editing
    });
    setCityId(item.id);
    setEdit(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!formData.text || !formData.name) {
      toast.error("Please fill all fields");
      return;
    }

    const formDataForEdit = new FormData();
    formDataForEdit.append("text", formData.text);
    formDataForEdit.append("name", formData.name);

    if (formData.file) {
      formDataForEdit.append("images", formData.file);
    }

    setLoading(true);
    fetch(`https://realauto.limsa.uz/api/cities/${cityId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataForEdit,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success("City updated successfully!");
          getCategory();
          setEdit(false);
        } else {
          toast.error(response?.message || "Update error");
        }
      })
      .catch((err) => {
        toast.error("Error updating city");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = (cityId) => {
    if (!token) {
      toast.error("Token is missing");
      return;
    }

    setLoading(true);
    fetch(`https://realauto.limsa.uz/api/cities/${cityId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message);
          getCategory(); // Update the list after deletion
        } else {
          toast.error(response?.message || "Delete failed");
        }
      })
      .catch((error) => {
        toast.error("Error deleting city");
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="Cities">
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
          {loading ? (
            <h2>
              <ClockLoader />
            </h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Img</th>
                  <th>Text</th>
                  <th>Delete</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody className="data-count-get">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id}>
                      <td>{item?.name}</td>
                      <td>
                        <img
                          src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                          alt={item?.name}
                        />
                      </td>
                      <td>{item?.text}</td>
                      <td>
                        <button onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </td>
                      <td>
                        <button onClick={() => handleEdit(item)}>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">Hech qanday ma'lumot topilmadi</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {post && (
        <div className="cities-post activ">
          <div className="main-parent">
            <form onSubmit={handleSubmit} className="citis-form">
              <div className="qut-edit" onClick={() => setPost(false)}>
                X
              </div>
              <input
                type="text"
                name="name"
                required
                minLength={3}
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="text"
                required
                minLength={3}
                placeholder="Text"
                value={formData.text}
                onChange={handleChange}
              />
              <input type="file" name="file" required onChange={handleChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {edit && (
        <div className="cities-edit activ">
          <div className="main-parent">
            <form onSubmit={handleEditSubmit} className="citis-form">
              <div className="qut-edit" onClick={() => setEdit(false)}>
                X
              </div>
              <input
                type="text"
                name="name"
                required
                minLength={3}
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="title"
                required
                minLength={3}
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
              <input type="file" name="file" onChange={handleChange} />
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cities;
