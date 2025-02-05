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
  const [formData, setFormData] = useState({
    name: "",
    text: "",
    file: null,
  });
  const [locationToEdit, setLocationToEdit] = useState(null);
  const tokenbek = localStorage.getItem("token");

  // Kategoriyalarni olish
  const getCategory = () => {
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
        setIsLoading(false);
      });
  };

  // Componentni yuklaganda
  useEffect(() => {
    getCategory();
  }, []);

  // Tahrir qilishni boshlash
  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      text: item.text,
      file: null, // eski faylni ko'rsatmaslik
    });
    setLocationToEdit(item.id);
    setEdit(true);  // Modalni ochish
  };

  // Inputlarni yangilash
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Tahrirni yuborish
  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!formData.name || !formData.text || !formData.file) {
  //     toast.error("Iltimos, barcha maydonlarni to'ldiring");
  //     return;
  //   }

  //   const formDataForEdit = new FormData();
  //   formDataForEdit.append("name", formData.name);
  //   formDataForEdit.append("text", formData.text);
  //   formDataForEdit.append("images", formData.file);

  //   fetch(`https://realauto.limsa.uz/api/locations/${locationToEdit}`, {
  //     method: "PUT",
  //     headers: {
  //       Authorization: `Bearer ${tokenbek}`,
  //     },
  //     body: formDataForEdit,
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response?.success) {
  //         toast.success("Malumot muvaffaqiyatli yangilandi");
  //         getCategory();
  //         setEdit(false); // Modalni yopish
  //       } else {
  //         toast.error(response?.massage || "Xatolik");
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error("Error updating category");
  //       console.log(err);
  //     });
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!formData.name && !formData.text && !formData.file) {
      toast.error("Iltimos, biron bir maydonni to'ldiring");
      return;
    }
  
    // Yangi FormData yaratamiz va faqat o'zgargan maydonlarni qo'shamiz
    const formDataForEdit = new FormData();
  
    // Har bir maydonni tekshirib, agar u o'zgargan bo'lsa, yuboramiz
    if (formData.name) formDataForEdit.append("name", formData.name);
    if (formData.text) formDataForEdit.append("text", formData.text);
    if (formData.file) formDataForEdit.append("images", formData.file);
  
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
          toast.success("Malumot muvaffaqiyatli yangilandi");
          getCategory();  // Ma'lumotlarni yangilash
          setEdit(false);  // Modalni yopish
        } else {
          toast.error(response?.message || "Xatolik");
        }
      })
      .catch((err) => {
        toast.error("Error updating category");
        console.log(err);
      });
  };
  

  // Kategoriyani o'chirish
  const deleteCategory = (locationId) => {
    if (!tokenbek) {
      toast.error("Token is missing");
      return;
    }
    fetch(`https://realauto.limsa.uz/api/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success("Ochirildi");
          getCategory();
        } else {
          toast.error(response?.massage || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error deleting category");
        console.error(err);
      });
  };

  // Malumot qo'shish
  const createCategory = (e) => {
    e.preventDefault();

    if (!tokenbek) {
      toast.error("Token is missing!");
      return;
    }

    if (!formData.name || !formData.text || !formData.file) {
      toast.error("Please fill all fields");
      return;
    }

    const formdata = new FormData();
    formdata.append("text", formData.text);
    formdata.append("name", formData.name);
    formdata.append("images", formData.file);

    fetch("https://realauto.limsa.uz/api/locations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formdata,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success(response?.massage);
          getCategory();
          setPost(false);
        } else {
          toast.error(response?.massage || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error creating category");
        console.log(err);
      });
  };

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
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>
                      <img
                        src={`https://realauto.limsa.uz/api/uploads/images/${item.image_src}`}
                        alt=""
                      />
                    </td>
                    <td>{item.text}</td>
                    <td>
                      <button onClick={() => deleteCategory(item.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleEdit(item)}>
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

      {/* Malumot qo'shish Modal */}
      <div className={post ? "Location-main activ" : "Location-main"}>
        <div className="main-parent">
          <form onSubmit={createCategory} className="Location-form">
            <div className="qut-edit" onClick={() => setPost(false)}>
              X
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Text"
            />
            <input
              type="file"
              name="file"
              onChange={handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>

      {/* Tahrir qilish Modal */}
      <div className={edit ? "Location-edit activ" : "Location-edit"}>
        <div className="main-parent">
          <form onSubmit={handleSubmit} className="Location-form">
            <div className="qut-edit" onClick={() => setEdit(false)}>
              X
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="text"
              value={formData.text}
              onChange={handleChange}
              placeholder="Text"
            />
            <input
              type="file"
              name="file"
              onChange={handleChange}
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Locations;
