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
    file: null,
    name: "",
  });

  const [cityId, setCityId] = useState(null);
  const token = localStorage.getItem("token");

  function getCategory() {
    setIsLoading(true); // ✅ API so‘rov boshlanishida loaderni yoqish
    fetch("https://realauto.limsa.uz/api/models")
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data);
        setIsLoading(false); //
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
        setIsLoading(false); // ✅ Xato bo‘lsa ham loaderni o‘chirish
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  const handleChange = (e) => {
    console.log(e);

    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.brand_id) {
      toast.error("Please fill all fields, including the image!");
      return;
    }

    const formDataForSubmit = new FormData();

    formDataForSubmit.append("name", formData.name);
    formDataForSubmit.append("brand_id", formData.brand_id);
     
    setIsLoading(true)

    fetch("https://realauto.limsa.uz/api/models", {
      method: "POST",

      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formDataForSubmit,
    })
     .then((res) => res.json())
     .then((elem) => {
      if (elem?.succsess) {
        toast.success(elem?.message);
        setFormData({name: "" , brand_id: ""});
        getCategory();
        setPost(false);
      }else {
        toast.error(elem?.message || "Unknown error");
      }
     })
     .catch((err) => {
      toast.error("Error creating city");
      console.error(err)
     })
      .finally(() => {
        setIsLoading(false)
      })

  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      brand_id: item.brand_id

    });
    setEdit(true)
  }


  return (
    <div className="Models">
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
                  <th>Brend-Name</th>
                  <th>Brand-logo</th>
                  <th>delet</th>
                  <th>edit</th>
                </tr>
              </thead>
              <tbody className="data-count-get">
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.name}</td>
                      <td>{item?.brand_id}</td>

                      <td>
                        <button onClick={() => setPost(true)}>delet</button>
                      </td>
                      <th>
                        <button onClick={() => setEdit(true)}>edit</button>
                      </th>
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

      <div className={post ? "Models-post activ" : "Models-post"}>
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
            <input
              type="text"
              name="brand_id"
              required
              minLength={3}
              placeholder="Bread_id"
              value={formData.brand_id}
              
            />
            <button type="submit">
              Update
            </button>
          </form>
        </div>
      </div>
      <div className={edit ? "Modles-edit activ" : "Modles-edit"}>
        <div className="main-parent">
          <form className="home-form">
            <div className="qut-edit" onClick={() => setEdit(false)}>
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


export default Models;
