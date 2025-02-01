import React, { useEffect, useState } from "react";
import "./Brands.scss";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoPushOutline } from "react-icons/io5";

const Brands = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tokenbek = localStorage.getItem("token");
  const [pushopen, setPushopen] = useState(false);
  const [editopen, setEditopen] = useState(false);
  const [deletopen, setDeletopen] = useState(false);

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

  const deleteCategory = (brendId) => {
    if (!tokenbek) {
      toast.error("Token is missing");
      return;
    }
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
          toast.error(response.message || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error deleting category");
        console.log(err);
      });
  };

  return (
    <div className="Brands">
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
                <th>Action</th>
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
                        alt="Brand logo"
                      />
                    </td>
                    <td>
                      <button onClick={() => deleteCategory(item.id)}>
                        Delete
                      </button>
                    </td>
                    <td>
                      <button>Edit</button>
                    </td>
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
  );
};

export default Brands;
