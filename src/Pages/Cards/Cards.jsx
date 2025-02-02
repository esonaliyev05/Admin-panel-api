import React, { useEffect, useState } from "react";
import "./Cards.scss";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { IoPushOutline } from "react-icons/io5";


const Cards = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  function getCategory() {
    setIsLoading(true); 
    fetch("https://realauto.limsa.uz/api/cars")
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
    <div className="Cards">
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
            <h2><ClockLoader/> </h2>
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
                      <td>{item?.max_speed}</td>
                      <td>{item?.max_people}</td>
                      <td>{item?.transmission}</td>
                      {/* <td>{item?.motor}</td>
                      <td>{item?.drive_side}</td>
                      <td>{item?.petrol}</td>
                      <td>{item?.limitperday}</td>
                      <td>{item?.deposit}</td>
                      <td>{item?.premium_protection}</td>
                      <td>{item?.price_in_aed}</td>
                      <td>{item?.price_in_usd}</td>
                      <td>{item?.price_in_aed_sale}</td>
                      <td>{item?.price_in_usd_sale}</td>
                      <td>{item?.location_id}</td>
                      <td>{item?.color}</td>
                      <td>{item?.year}</td>
                      <td>{item?.seconds}</td> */}
                      <td>
                        <img
                          src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                          alt="Car"
                        />
                      </td>
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

export default Cards;
