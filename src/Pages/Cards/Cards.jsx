import React, { useEffect, useState } from "react";
import "./Cards.scss";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";
import { IoPushOutline } from "react-icons/io5";
import { GoX } from "react-icons/go";

const Cards = () => {
  const [data, setData] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [models, setModels] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [post, setPost] = useState(false);
  const [delet, setDelet] = useState(false);
  const [loding , setLoading] = useState(false)
  const tokenbek = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    brand_id: "",
    model_id: "",
    city_id: "",
    color: "",
    year: "",
    seconds: "",
    category_id: "",
    max_speed: "",
    max_people: "",
    transmission: "",
    motor: "",
    drive_side: "",
    petrol: "",
    limitperday: "",
    deposit: "",
    premium_protection: "",
    price_in_aed: "",
    price_in_usd: "",
    price_in_aed_sale: "",
    price_in_usd_sale: "",
    images: [], 
    location_id: "",
    inclusive: "",
    cover: null,
    
    
  });
  
  console.log(tokenbek);
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

    fetch("https://realauto.limsa.uz/api/brands")
      .then((res) => res.json())
      .then((response) => {
        setBrands(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
        setIsLoading(false);
      });

    fetch("https://realauto.limsa.uz/api/categories")
      .then((res) => res.json())
      .then((response) => {
        setCategories(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
        setIsLoading(false);
      });

    fetch("https://realauto.limsa.uz/api/cities")
      .then((res) => res.json())
      .then((response) => {
        setCities(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
        setIsLoading(false);
      });

    fetch("https://realauto.limsa.uz/api/locations")
      .then((res) => res.json())
      .then((response) => {
        setLocations(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
        setIsLoading(false);
      });

    fetch("https://realauto.limsa.uz/api/models")
      .then((res) => res.json())
      .then((response) => {
        setModels(response?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Error fetching data");
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    let isMounted = true;
    getCategory();

    return () => {
      isMounted = false;
    };
  }, []);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" 
        ? (name === "cover" ? files[0] : [...(prev[name] || []), ...files]) 
        : ["color", "drive_side", "motor", "petrol", "transmission"].includes(name)
          ? value.slice(0, 4) 
          : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    console.log("Yuborilayotgan ma'lumotlar:", formData); 
  
    const formDataForCreate = new FormData();
  
    Object.keys(formData).forEach((key) => {
      if (key === "images" && formData[key]?.length > 0) {
        formData[key].forEach((file) => {
          formDataForCreate.append("images", file);
        });
      } else if (key === "cover" && formData[key]) {
        formDataForCreate.append("cover", formData[key]);
      } else {
        formDataForCreate.append(key, formData[key]);
      }
    });
  
    fetch("https://realauto.limsa.uz/api/cars", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formDataForCreate,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          toast.success("Ma'lumot muvaffaqiyatli qo'shildi!");
          setPost(false);
          getCategory();
          setFormData({})
          
     
        } else {
          console.error("Xatolik:", response);
          toast.error("Xatolik yuz berdi!");
        }
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        toast.error("Server bilan bog‘lanishda muammo yuz berdi!");
      })
      .finally(() => {
        setLoading(false); 
      });
  };
  console.log("Yuborilayotgan formData:", formData);

  
  
  const deleteCategory = (id) => {
    if (!tokenbek) {
      toast.error("Token is missing");
      return;
    }

    fetch(`https://realauto.limsa.uz/api/cars/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response?.success) {
          toast.success(response?.massage);
          toast.success("O'chirildi");
          getCategory();
        } else {
          toast.error(response?.massage || "Unknown error");
        }
      })
      .catch((err) => {
        toast.error("Error deleting cargory");
        console.log(err);
      });
  };
  const handleEditSubmit = (e) => {
    e.preventDefault();

    const formDataForUpdate = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === "files" && formData[key]) {
        Array.from(formData[key]).forEach((file) => {
          formDataForUpdate.append("files", file);
        });
      } else if (key === "cover" && formData[key]) {
        formDataForUpdate.append("cover", formData[key][0]);
      } else if (key === "inclusive") {
        formDataForUpdate.append(key, formData[key].toString());
      } else {
        formDataForUpdate.append(key, formData[key]);
      }
    });

    fetch(`https://realauto.limsa.uz/api/cars/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${tokenbek}`,
      },
      body: formDataForUpdate,
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          toast.success("Ma'lumot muvaffaqiyatli yangilandi!");
          setEdit(false);
          getCategory();
        } else {
          toast.error("Xatolik yuz berdi!");
          console.error("Xatolik yuz berdi", response.message);
        }
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        toast.error("Server bilan bog‘lanishda muammo yuz berdi!");
      });
  };


  return (
    <div className="Cards">
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
              <ClockLoader />{" "}
            </h2>
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
                      <td>{item?.motor}</td>
                      <td>{item?.drive_side}</td>
                      <td>{item?.petrol}</td>
                      {/* <td>{item?.limitperday}</td>
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
                        <button onClick={() => deleteCategory(item.id)}>
                          delet
                        </button>
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
          <form className="Cards-form" onSubmit={handleSubmit}>
            <div className="edit" onClick={() => setPost(false)}>
              <GoX />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Color</label>
              <br />
              <input
                type="number"
                name="color"
                placeholder="Color"
                value={formData.color}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="">Year</label>
              <br />
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Seconds</label>
              <br />
              <input
                type="number"
                placeholder="Seconds"
                name="seconds"
                value={formData.seconds}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Max speed</label>
              <br />
              <input
                type="number"
                placeholder="Max speed"
                name="max_speed"
                value={formData.max_speed}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Max people</label>
              <br />
              <input
                type="number"
                placeholder="Max people"
                name="max_people"
                value={formData.max_people}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Transmission</label>
              <br />
              <input
                type="text"
                placeholder="Transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Motor</label>
              <br />
              <input
                type="text"
                placeholder="Motor"
                name="motor"
                value={formData.motor}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Drive side</label>
              <br />
              <input
                type="text"
                placeholder="Drive side"
                name="drive_side"
                value={formData.drive_side}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Petrol</label>
              <br />
              <input
                type="text"
                placeholder="Petrol"
                name="petrol"
                value={formData.petrol}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Limitperday</label>
              <br />
              <input
                type="number"
                placeholder="Limitperday"
                name="limitperday"
                value={formData.limitperday}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="">Deposit</label>
              <br />
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Premium protection</label>
              <br />
              <input
                type="number"
                placeholder="Premium protection"
                name="premium_protection"
                value={formData.premium_protection}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Price in AED</label>
              <br />
              <input
                type="number"
                placeholder="Price in AED"
                name="price_in_aed"
                value={formData.price_in_aed}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Price in USD</label>
              <br />
              <input
                type="number"
                placeholder="Price in USD"
                name="price_in_usd"
                value={formData.price_in_usd}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Price in AED sale</label>
              <br />
              <input
                type="number"
                placeholder="Price in USD"
                name="price_in_aed_sale"
                value={formData.price_in_aed_sale}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Price in USD sale</label>
              <br />
              <input type="number"  placeholder="Price in USD" name="price_in_usd_sale" value={formData.price_in_usd_sale} onChange={handleChange}  />
            </div>


            <div className="label">
              <label htmlFor="inclusive">Inclusive:</label>
              <br />
              <input
                type="checkbox"
                name="inclusive"
                checked={formData.inclusive}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    inclusive: e.target.checked,
                  }))
                }
              />
            </div>

            <div className="label">
              <label htmlFor="cover">Cover:</label>
              <br />
              <input type="file" 
               name="cover"
               multiple 
               accept="image/png"
               onChange={handleChange}/>

            </div>

            <div className="label">
              <label htmlFor="dswrgf">images 1</label>
              <br />
              <input
                type="file"
                name="images"
                multiple
                accept="image/png"
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">images 2</label>
              <br />
              <input
                type="file"
                name="images"
                multiple
                accept="image/png"
                onChange={handleChange}
              />
            </div>

            {/* < ---  Select  */}

            <div className="label">
              <label htmlFor="">Brand title</label> <br />
              <select
                name="brand_id"
                value={formData.brand_id}
                onChange={handleChange}
              >
                <option value="">Select Brand</option>
                {brands.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="label">
              <label htmlFor="">Model title</label> <br />
              <select
                name="model_id"
                value={formData.model_id}
                onChange={handleChange}
              >
                <option value="">Select Model</option>
                {models.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="label">
              <label htmlFor="">City</label> <br />
              <select
                name="city_id"
                value={formData.city_id}
                onChange={handleChange}
              >
                <option value="">Select City</option>
                {cities.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="label">
              <label htmlFor="">Category</label> <br />
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                {categories.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name_en}
                  </option>
                ))}
              </select>
            </div>

            <div className="label">
              <label htmlFor="">Location</label> <br />
              <select
                name="location_id"
                value={formData.location_id}
                onChange={handleChange}
              >
                <option value="">Select Location</option>
                {locations.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" disabled={loding}>
                   
                   {loding ? "Loadding ... " : "Submit"}
               
            </button>
          </form>
        </div>
      </div>

      {/* <div className={edit ? "Cards-edit activ" : "Cards-edit"}>
        <div className="Cards-parent">
          <form className="Cards-form">
            <div className="edit" onClick={() => setEdit(false)}>
              <GoX />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Color</label>
              <br />
              <input
                type="text"
                value={formData.color}
                onChange={handleChange}
                placeholder="Color"
              />
            </div>
            <div className="label">
              <label htmlFor="">Year</label>
              <br />
              <input
                type="text"
                placeholder="Year"
                value={formData.year}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Seconds</label>
              <br />
              <input
                type="text"
                placeholder="Seconds"
                value={formData.seconds}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Max speed</label>
              <br />
              <input
                type="text"
                placeholder="Max speed"
                value={formData.max_speed}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Max people</label>
              <br />
              <input
                type="text"
                placeholder="Max people"
                value={formData.max_people}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Transmission</label>
              <br />
              <input
                type="text"
                placeholder="Transmission"
                value={formData.transmission}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Motor</label>
              <br />
              <input
                type="text"
                placeholder="Motor"
                value={formData.motor}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Drive side</label>
              <br />
              <input
                type="text"
                placeholder="Drive side"
                value={formData.drive_side}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Petrol</label>
              <br />
              <input
                type="text"
                placeholder="Petrol"
                value={formData.petrol}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Limitperday</label>
              <br />
              <input
                type="text"
                placeholder="Limitperday"
                value={formData.limitperday}
                onChange={handleChange}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Premium protection</label>
              <br />
              <input
                type="text"
                placeholder="Premium protection"
                value={formData.premium_protection}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Price in AED</label>
              <br />
              <input
                type="text"
                placeholder="Price in AED"
                value={formData.price_in_aed}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Price in USD</label>
              <br />
              <input
                type="text"
                placeholder="Price in USD"
                value={formData.price_in_usd}
                onChange={handleChange}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Price in AED sale</label>
              <br />
              <input
                type="text"
                placeholder="Price in USD"
                value={formData.price_in_aed_sale}
              />
            </div>
            <div className="label">
              <label htmlFor="dswrgf">Price in USD sale</label>
              <br />
              <input
                type="text"
                placeholder="Price in USD sale"
                value={formData.price_in_usd_sale}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Cover</label>
              <br />
              <input type="file" name="cover" onChange={handleChange} />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Price in USD sale</label>
              <br />
              <input
                type="file"
                placeholder="Price in USD sale"
                value={formData.price_in_usd_sale}
              />
            </div>

            <div className="label">
              <label htmlFor="dswrgf">Price in USD sale</label>
              <br />
              <input
                type="file"
                placeholder="Price in USD sale"
                value={formData.price_in_usd_sale}
                onChange={handleChange}
              />
            </div>


            <div className="label">
              <label htmlFor="">Brand title</label> <br />
              <select
                name="brandTitle"
                value={formData.brand_id}
                onChange={handleChange}
              >
                {brands.map((item) => (
                  <option key={item.id} value={item.brand_id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="label">
              <label htmlFor="">Model title</label> <br />
              <select value={formData.model_id} onChange={handleChange}>
                {models.map((item) => (
                  <option key={item.id} value={item.model_id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="label">
              <label htmlFor="">Citiy id</label> <br />
              <select value={formData.city_id} onChange={handleChange}>
                {cities.map((item) => (
                  <option key={item.id} value={item.city_id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="label">
              <label htmlFor="">Category title</label> <br />
              <select value={formData.category_id} onChange={handleChange}>
                {categories.map((item) => (
                  <option key={item.id} value={item.category_id}>
                    {item.name_en}
                  </option>
                ))}
              </select>
            </div>
            <div className="label">
              <label htmlFor="">Location title</label> <br />
              <select value={formData.location_id} onChange={handleChange}>
                {locations.map((item) => (
                  <option key={item.id} value={item.location_id}>
                    {item.text}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div> */}
    </div>
  );
};

export default Cards;
