import React, { useEffect, useState } from "react";
import "./Brands.scss";
import { toast } from "react-toastify";

const Brands = () => {
  const [data, setData] = useState([]);
  const [delet, setDelet] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const tokenbek = localStorage.getItem("token");

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
          setDelet(false);
        } else {
          toast.error(response.message || "Unknown error");
          
        }
      })
      .catch((err) => {
        toast.error("Eror deleting category");
        console.log(err);
      });
  };

  return (
    <div className="Brands">
      <div className="data-table">
        {isLoading ? (
          <h2>Yuklanmoqda...</h2>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Brend-Name</th>
                <th>Brand-logo</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody className="data-count-get">
              {data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.title}</td>
                    <td>
                      <img
                        src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                        alt="Brand logo"
                      />
                    </td>
                    <td>
                      <span>No image available</span>
                    </td>
                    <td>
                      <button
                        onClick={() => {
                          deleteCategory(categoryToDelete); // O'chirish funksiyasini chaqirish
                          // setDelet(false); // Modalni yopish
                        }}
                      >
                        d
                      </button>
                      <button>e</button>
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
  );
};

export default Brands;
