import React, { useEffect, useState } from "react";
import { IoPushOutline } from "react-icons/io5";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";

const Locations = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  function getCategory() {
    setIsLoading(true); 
    fetch("https://realauto.limsa.uz/api/locations")
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
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="Locations">
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
          {isLoading ? ( // ✅ Agar yuklanayotgan bo‘lsa, loader chiqadi
            <h2><ClockLoader/> </h2>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>ModelName	</th>
                  <th>BrandName	</th>
                  <th>text</th>
                  <th>Delet</th>
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
                    <button>delet</button>

                    </td>
                    <td>
                      <button>edit</button>
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
