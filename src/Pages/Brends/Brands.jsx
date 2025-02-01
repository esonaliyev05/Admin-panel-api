import React, { useEffect, useState } from 'react'
import "./Brands.scss"


const Brands = () => {
  const [data , setData] = useState([])



  function getCategory() {
    fetch("https://realauto.limsa.uz/api/brands")
       .then((res) => res.json())
       .then((response) => setData(response?.data))
       .catch((error) => {
        toast.error("Error fetching data");
        console.error(error)
       })
  }
   useEffect(() => {
    getCategory();
   } , [])
  return (
    <div className='Brands'>


<div className="data-table">


<table>
  <thead>
    <tr>
      <th>Brend-Name</th>
      <th>Bred-logo</th>
      <th>Name</th>
      <th>title</th>
      <th>Edit</th>
    </tr>
  </thead>
  <tbody className="data-count-get">

    {
     data?.map((item , index) => (
      <tr key={index}>
      <td>{item?.title}</td>
      <td>

      <img src={`https://realauto.limsa.uz/api/uploads/images/${item?.image_src}`}
                 alt="" />
                 </td>
      <td>
        {/* Image yo'q holatni ko'rsatish */}
        <span>No image available</span>
      </td>
      <td>
      title
      </td>
      <td>
      <button>d</button>
        <button>e</button>
      </td>
    </tr>
     ))
    }
 
  </tbody>
</table>

</div>

    </div>
  )
}

export default Brands