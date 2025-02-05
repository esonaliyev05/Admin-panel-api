import React, { useEffect, useState } from "react";
import "./Models.scss";
import { ClockLoader } from "react-spinners";
import { IoPushOutline } from "react-icons/io5";
import { toast } from "react-toastify";

const Models = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [post, setPost] = useState(false);
  const [formData, setFormData] = useState({
    brand_id: "",
    name: "",
  });

  const token = localStorage.getItem("token");

  const getCategory = () => {
    setIsLoading(true);
    fetch("https://realauto.limsa.uz/api/models")
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.brand_id) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!token) {
      toast.error("Token not found. Please login.");
      return;
    }

    const formDataForSubmit = new FormData();
    formDataForSubmit.append("name", formData.name);
    formDataForSubmit.append("brand_id", formData.brand_id);

    setIsLoading(true);

    fetch("https://realauto.limsa.uz/api/models", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataForSubmit,
    })
      .then((res) => res.json())
      .then((elem) => {
        if (elem?.success) {
          toast.success(elem?.message);
          setFormData({ name: "", brand_id: "" });
          getCategory();
          setPost(false);
        } else {
          toast.error(elem?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error creating model");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      brand_id: item.brand_id,
    });
    setEdit(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.brand_id) {
      toast.error("Please fill all fields!");
      return;
    }

    if (!token) {
      toast.error("Token not found. Please login.");
      return;
    }

    setIsLoading(true);

    fetch(`https://realauto.limsa.uz/api/models/${formData.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success("Model updated successfully!");
          getCategory();
          setEdit(false);
        } else {
          toast.error(response?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error updating model");
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="Models">
      <div className="container">
        <section className="dashboard">
          <div className="card">
            Ma'lumot qo'shish <br /> <br />
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
                  <th>Brend-Name</th>
                  <th>Brand-logo</th>
                  <th>O'chirish</th>
                  <th>Tahrirlash</th>
                </tr>
              </thead>
              <tbody className="data-count-get">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.name}</td>
                      <td>{item?.brand_id}</td>
                      <td>
                        <button>O'chirish</button>
                      </td>
                      <td>
                        <button onClick={() => handleEdit(item)}>
                          Tahrirlash
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">Hech qanday ma'lumot topilmadi</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {post && (
        <div className="Models-post activ">
          <div className="main-parent">
            <form className="home-form" onSubmit={handleSubmit}>
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

              <select
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                required
                style={{ width: "100%", height: "40px", outline: "none" }}
              >
                <option value="">Tanlang...</option>
                <option value="BMW">BMW</option>
                <option value="MERS">MERS</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
              </select>

              <button type="submit">Qo'shish</button>
            </form>
          </div>
        </div>
      )}

      {edit && (
        <div className="Models-edit activ">
          <div className="main-parent">
            <form className="home-form" onSubmit={handleUpdate}>
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

              <select
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
                required
                style={{ width: "100%", height: "40px", outline: "none" }}
              >
                <option value="">Tanlang...</option>
                <option value="BMW">BMW</option>
                <option value="MERS">MERS</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
              </select>

              <button type="submit">Yangilash</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Models;
