import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Locations = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ Loader uchun state

  function getCategory() {
    setIsLoading(true); // ✅ API so‘rov boshlanishida loaderni yoqish
    fetch("https://realauto.limsa.uz/api/locations")
      .then((res) => res.json())
      .then((response) => {
        setData(response?.data);
        setIsLoading(false); // ✅ Ma'lumot kelgach loaderni o‘chirish
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

  return (
    <div className="Locations">
      <div className="container">
        <div className="data-table">
          {isLoading ? ( // ✅ Agar yuklanayotgan bo‘lsa, loader chiqadi
            <h2>Yuklanmoqda...</h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Brend-Name</th>
                  <th>Brend-logo</th>
                  <th>Name</th>
                  <th>Title</th>
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
                        alt=""
                      />
                    </td>
                    <td>
                      <span>{item?.text}</span>
                    </td>
                    <td>
                      <button>d</button>
                      <button>e</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Locations;
