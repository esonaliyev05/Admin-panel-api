import React, { useEffect, useState } from "react";
import "./Cities.scss";
import { toast } from "react-toastify";

const Cities = () => {
  const [data, setData] = useState([]);

  function getCategory() {
    fetch("https://realauto.limsa.uz/api/cities")
      .then((res) => res.json())

      .then((response) =>
        setData(response?.data, toast.success(response.massage))
      )
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
      });
  }
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="Cities">
      <div className="container">
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Number</th>
                <th>Img</th>
                <th>Delete</th>
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
                  <td>{item?.text}</td>

                  <td>
                    {/* Image yo'q holatni ko'rsatish */}
                    <span>No image available</span>
                  </td>
                  <td>
                    <button>d</button>
                  </td>
                  <td>
                    <button>e</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cities;
