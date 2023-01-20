import React, { useState } from 'react';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import Search from '../Search/Search';

type CategoriesProps ={
  value:number;
  onChangeCategory: (i: number) => void
}
const categories =["All","Meatlover","Veggie","Traditional","Hot","Spicy",]

const Categories: React.FC<CategoriesProps> = ({value, onChangeCategory})=>{

  const [width] = useWindowWidth();
    return(
      <div className="categories">
        <ul>
          {categories.map((categoryName, i)=>(
            <li key={i} onClick={() => onChangeCategory(i)}
            className={value === i ? "active" : ""}
            >{categoryName}</li>
          ))}
        </ul>
        {width > 809 ? (<div className='categories__search'>
          <Search/>
        </div>):<></>}
       
    </div>
    )
  }

export default Categories