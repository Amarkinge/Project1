import React from 'react';
import './../Components/Style/filter.css';

function FilterHeader(){
 return(
   <>
    <div id="filter-box-oppo">
      <div id="choose-the-car-type">
     <select className="select">
     <option>Bus Type</option>
      <option>Sleeper</option>
      <option>Seater</option>
      <option>All</option>
     </select>

     <select className="select">
     <option>Milage</option>
      <option>10KM/L</option>
      <option>20KM/L</option>
      <option>15KM/L</option>
     </select>

     <select className="select">
     <option>Capacity</option>
      <option>17 Person</option>
      <option>26 Person</option>
      <option>45 Person</option>
     </select>

     </div>
  </div>
  </>
 )
}
export default FilterHeader;