import React, { useState } from 'react';


function Categories(){
  const [activeIndex, setActiveIndex] = useState(0);

  const categories =["All","Meatlover","Veggie","Traditional","Hot","Spicy",]
  const onClickCategory = (index)=>{
    setActiveIndex(index)
  }
    return(
      <div className="categories">
      <ul>
        {categories.map((value,i)=>(
          <li onClick={()=>onClickCategory(i)} className={activeIndex ===i ? "active" : ""}>{value}</li>
        ))}
      </ul>
    </div>
    )
  }

export default Categories