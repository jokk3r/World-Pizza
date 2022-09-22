import React, { useState } from 'react';


function Categories({value, onChangeCategory}){

  const categories =["All","Meatlover","Veggie","Traditional","Hot","Spicy",]
 
    return(
      <div className="categories">
      <ul>
        {categories.map((categoryName, i)=>(
          <li key={i} onClick={() => onChangeCategory(i)}
           className={value === i ? "active" : ""}
           >{categoryName}</li>
        ))}
      </ul>
    </div>
    )
  }

export default Categories