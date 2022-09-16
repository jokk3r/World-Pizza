import React, { useState } from 'react';


function Categories(){
  const [activeIndex, setActiveIndex] = useState(3);

    return(
      <div className="categories">
      <ul>
        <li className={activeIndex ===0 ? "active" : ""}>all</li>
        <li className={activeIndex ===1 ? "active" : ""}>Meatlover</li>
        <li className={activeIndex ===2 ? "active" : ""}>Veggie</li>
        <li className={activeIndex ===3 ? "active" : ""}>Traditional</li>
        <li className={activeIndex ===4 ? "active" : ""}>Hot</li>
        <li className={activeIndex ===5 ? "active" : ""}>Spicy</li>
      </ul>
    </div>
    )
  }

export default Categories