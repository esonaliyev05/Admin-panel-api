import React, { useEffect, useState } from "react";
import "./Cards.scss";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { IoPushOutline } from "react-icons/io5";
import { GoX } from "react-icons/go";


const Cards = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [edit , setEdit] = useState(false)
  const [post , setPost] = useState(false)
  const [delet , setDelet] = useState(false)



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

  const handleChange = (e) => {
   const {name , value , files} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ?files[0] : value,
    }))
};

const handleSubmit = (e) =>{
  e.preventDefault();


}

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
                        <button onClick={() => setEdit(true)}>edit</button>
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

       <div className={post ? "Cards-main activ" : "Cards-main"}>
            
            <div className="Cards-parent">

              <form className="Cards-form" >
                   
                   <div className="edit" onClick={() => setPost(false)}>
                 <GoX/>
                   </div>

                <div className="label">
                  <label htmlFor="dswrgf">Color</label><br />
                  <input type="text" placeholder="Color" />
                </div>
                <div className="label">
                  <label htmlFor="">Year</label><br />
                  <input type="text" placeholder="Year" />
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Seconds</label><br />
                  <input type="text" placeholder="Seconds" />
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Max speed</label><br />
                  <input type="text" placeholder="Max speed" />
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Max people</label><br />
                  <input type="text" placeholder="Max people" />
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Transmission</label><br />
                  <input type="text" placeholder="Transmission"/>
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Motor</label><br />
                  <input type="text" placeholder="Motor"/>
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Drive side</label><br />
                  <input type="text" placeholder="Drive side" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Petrol</label><br />
                  <input type="text" placeholder="Petrol"/>
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Limitperday</label><br />
                  <input type="text" placeholder="Limitperday"/>
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Premium protection</label><br />
                  <input type="text" placeholder="Premium protection" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Price in AED</label><br />
                  <input type="text" placeholder="Price in AED" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Price in USD</label><br />
                  <input type="text" placeholder="Price in USD" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Price in AED sale</label><br />
                  <input type="text" placeholder="Price in USD" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Price in USD sale</label><br />
                  <input type="text" placeholder="Price in USD sale" />
                </div>



               <div className="label">
                  <label htmlFor="dswrgf">Cover</label><br />
                  <input type="file" placeholder="Price in USD sale" />
                </div>

                <div className="label">
                  <label htmlFor="dswrgf">Price in USD sale</label><br />
                  <input type="file" placeholder="Price in USD sale" />
                </div>

                <div className="label">
                  <label htmlFor="dswrgf">Price in USD sale</label><br />
                  <input type="file" placeholder="Price in USD sale" />
                </div>

             

          {/* < ---  Select  */}
            

          <div className="label">
                  <label htmlFor="">Brand title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="">Brand title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="">Brand title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>


                <div className="label">
                  <label htmlFor="">Model title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="">Brand title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>
                
                 <button type="submit">Submit</button>
              </form>

              
            </div>

       </div>
       <div className={edit ? "Cards-edit activ" : "Cards-edit"}>
          
          <div className="Cards-parent">
          <form className="Cards-form" >
                   
                   <div className="edit" onClick={() => setEdit(false)}>
                 <GoX/>
                   </div>

                <div className="label">
                  <label htmlFor="dswrgf">Color</label><br />
                  <input type="text" placeholder="Color" />
                </div>
                <div className="label">
                  <label htmlFor="">Year</label><br />
                  <input type="text" placeholder="Year" />
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Seconds</label><br />
                  <input type="text" placeholder="Seconds" />
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Max speed</label><br />
                  <input type="text" placeholder="Max speed" />
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Max people</label><br />
                  <input type="text" placeholder="Max people" />
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Transmission</label><br />
                  <input type="text" placeholder="Transmission"/>
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Motor</label><br />
                  <input type="text" placeholder="Motor"/>
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Drive side</label><br />
                  <input type="text" placeholder="Drive side" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Petrol</label><br />
                  <input type="text" placeholder="Petrol"/>
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Limitperday</label><br />
                  <input type="text" placeholder="Limitperday"/>
                </div>
                
                <div className="label">
                  <label htmlFor="dswrgf">Premium protection</label><br />
                  <input type="text" placeholder="Premium protection" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Price in AED</label><br />
                  <input type="text" placeholder="Price in AED" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Price in USD</label><br />
                  <input type="text" placeholder="Price in USD" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Price in AED sale</label><br />
                  <input type="text" placeholder="Price in USD" />
                </div>
                <div className="label">
                  <label htmlFor="dswrgf">Price in USD sale</label><br />
                  <input type="text" placeholder="Price in USD sale" />
                </div>



               <div className="label">
                  <label htmlFor="dswrgf">Cover</label><br />
                  <input type="file" placeholder="Price in USD sale" />
                </div>

                <div className="label">
                  <label htmlFor="dswrgf">Price in USD sale</label><br />
                  <input type="file" placeholder="Price in USD sale" />
                </div>

                <div className="label">
                  <label htmlFor="dswrgf">Price in USD sale</label><br />
                  <input type="file" placeholder="Price in USD sale" />
                </div>

             

          {/* < ---  Select  */}
            

          <div className="label">
                  <label htmlFor="">Brand title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="">Brand title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="">Brand title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>


                <div className="label">
                  <label htmlFor="">Model title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>
                <div className="label">
                  <label htmlFor="">Brand title</label> <br />
                  <select>
            
                <option value="MERS">MERS</option>
                <option value="BMW">BMW</option>
                <option value="BMW-M5">BMW-M5</option>
                <option value="BMW-X5">BMW-X5</option>
                <option value="AUDI">AUDI</option>
                <option value="FERRARI">FERRARI</option>
                  </select>
                </div>
                
                 <button type="submit">Submit</button>
              </form>
          </div>

       </div>

    </div>
  );
};

export default Cards;
