import React, { useEffect, useState } from "react";
import "./Models.scss";
import { ClockLoader } from "react-spinners";
import { IoPushOutline } from "react-icons/io5";

const Models = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getCategory() {
    setIsLoading(true); // ✅ API so‘rov boshlanishida loaderni yoqish
    fetch("https://realauto.limsa.uz/api/models")
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
    <div className="Models">
      <div className="container">
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
              <ClockLoader />{" "}
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
                      {/* <td>
                        <span>{item?.text}</span>
                      </td> */}
                      <td>
                      <button>delet</button>

                      </td>
                      <td>
                        <button>edit</button>
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
    </div>
  );
};

export default Models;
