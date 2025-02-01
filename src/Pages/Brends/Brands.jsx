import React, { useEffect, useState } from "react";
import "./Brands.scss";
import { toast } from "react-toastify";

const Brands = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ Loader uchun state

  function getCategory() {
    setIsLoading(true); // ✅ API so‘rov boshlanishida loaderni yoqish
    fetch("https://realauto.limsa.uz/api/brands")
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data || []); // ✅ Agar data bo‘sh bo‘lsa, array qilib qo‘yish
        setIsLoading(false); // ✅ Ma'lumot kelgach loaderni o‘chirish
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.error(error);
        setIsLoading(false); // ✅ Xato bo‘lsa ham loaderni o‘chirish
      });
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="Brands">
      <div className="data-table">
        {isLoading ? ( // ✅ Agar yuklanayotgan bo‘lsa, loader chiqadi
          <h2>Yuklanmoqda...</h2>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Brend-Name</th>
                <th>Brand-logo</th>
                <th>Name</th>
                <th>Title</th>
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
                    <td>title</td>
                    <td>
                      <button>d</button>
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
