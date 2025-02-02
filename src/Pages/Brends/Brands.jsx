import React, { useEffect, useState } from "react";
import "./Brands.scss";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoPushOutline } from "react-icons/io5";

const Brands = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tokenbek = localStorage.getItem("token");
  const [pushopen, setPush] = useState(false);
  const [edit, setEdit] = useState(false);
  const [delet, setDelet] = useState(false);
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState(null);
  const [brendId, setBrendId] = useState(null);

  function getCategory() {
    setIsLoading(true);
    fetch("https://realauto.limsa.uz/api/brands")
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data || []);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.error(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  // const createCategory = (e) => {
  //   e.preventDefault();

  //   if (!tokenbek) {
  //     toast.error("Token is missing!");
  //     return;
  //   }

  //   if (!title || !picture) {
  //     toast.error("Please fill all fields.");
  //     return;
  //   }

  //   const formdata = new FormData();
  //   formdata.append("title", title);
  //   formdata.append("images", picture);

  //   fetch("https://realauto.limsa.uz/api/brands", {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${tokenbek}`,
  //     },
  //     body: formdata,
  //   })
  //     .then((res) => res.json())
  //     .then((elem) => {
  //       if (elem?.success) {
  //         toast.success(elem?.message);
  //         e.target.reset();
  //         getCategory();
  //       } else {
  //         toast.error(elem?.message || "Unknown error");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error creating category");
  //       console.log(err);
  //     });
  // };

  const [formData, setFormData] = useState({
    title: "",
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

    if (!formData.title || !formData.file) {
      toast.error("Please fill all fields");
      return;
    }

    console.log("Yuborilayotgan ma'lumot:", formData);

    const formDataForEdit = new FormData();
    formDataForEdit.append("title", formData.title);
    formDataForEdit.append("images", formData.file);

    const token = localStorage.getItem("token");

    fetch("https://realauto.limsa.uz/api/brands", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formDataForEdit,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success(response?.message);
          getCategory();
          setPush(false);
        } else {
          toast.error(response?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error creating category");
        console.log(err);
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Please enter a title");
      return;
    }

    const formDataForEdit = new FormData();
    formDataForEdit.append("title", formData.title);

    if (formData.file) {
      formDataForEdit.append("images", formData.file);
    }

    fetch(`https://realauto.limsa.uz/api/brands/${brendId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formDataForEdit,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success("Brand updated successfully!");
          getCategory();
          setEdit(false);
        } else {
          toast.error(response?.message || "Update error");
        }
      })
      .catch((err) => {
        toast.error("Error updating brand");
        console.error(err);
      });
  };

  const deleteCategory = (brendId) => {
    if (!tokenbek) {
      toast.error("Token is missing");
      return;
    }

    console.log("Deleting brand ID:", brendId);

    fetch(`https://realauto.limsa.uz/api/brands/${brendId}`, {
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
        } else {
          toast.error(response?.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error deleting category");
        console.error("Delete error:", err);
      });
  };

  return (
    <>
      <div className="Brands">
        <section className="dashboard">
          <div className="card">
            Malumot qo'shish <br /> <br />
            <button onClick={() => setPush(!pushopen)}>
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
                  <th>Delet</th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody className="data-count-get">
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id}>
                      <td>{item?.title}</td>
                      <td>
                        <img
                          src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                          accept="image/png"
                          alt="Brand logo"
                        />
                      </td>
                      <td>
                        <button onClick={() => deleteCategory(item.id)}>
                          Delete
                        </button>
                      </td>
                      <th>
                        <button onClick={() => setEdit(true)}>Edit</button>
                      </th>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">Hech qanday ma'lumot topilmadi</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className={pushopen ? "brand-push activ" : "brand-push"}>
        <div className="brand-main">
          <div className="main-parent">
            <form onSubmit={handleSubmit}>
              <div className="qut-edit" onClick={() => setPush(false)}>
                X
              </div>

              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: "100", height: "40px", outline: "none" }}
              >
                <option value="">Tanlang...</option>
                <option value="BMW">BMW</option>
                <option value="MERS">MERS</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                <option value="">ROLSROIS</option>
              </select>

              <input
                type="file"
                name="file"
                accept="image/*"
                required
                onChange={handleChange}
              />

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>

      <div className={edit ? "brand-edit activ" : "brand-edit"}>
        <div className="brand-main">
          <div className="main-parent">
            <form onSubmit={handleEditSubmit}>
              <div className="qut-edit" onClick={() => setEdit(false)}>
                X
              </div>

              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{ width: "100", height: "40px", outline: "none" }}
              >
                <option value="">Tanlang...</option>
                <option value="BMW">BMW</option>
                <option value="MERS">MERS</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
              </select>

              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={handleChange}
              />

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Brands;
