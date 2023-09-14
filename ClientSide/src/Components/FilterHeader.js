import React,{useState,useEffect} from 'react';
import './Style/filter.css';


function FilterHeader() {
  
      const [querry, setQuerry] = useState("");
  
      const search = (data) => {
          return data.filter(
              (item) =>
                  item.type.toLowerCase().includes(querry) ||
                  item.milage.toLowerCase().includes(querry)
                 
          );
      };
  
   return (
      <div id="form">
         <div id="button">
            
            <select className="select" onChange={(e) => setQuerry(e.target.value)}>
            
               <option>Bus Type</option>
               <option>Sleeper</option>
               <option>Seater</option>
               <option>All</option>
            </select>
   
            <select className="select" onChange={(e) => setQuerry(e.target.value)} >
             
               <option>Milage</option>
               <option>10KM/L</option>
               <option>20KM/L</option>
               <option>15KM/L</option>
            </select>

            <select className="select" onChange={(e) => setQuerry(e.target.value)}>
           
               <option>Capacity</option>
               <option>17 Person</option>
               <option>26 Person</option>
               <option>45 Person</option>
            </select>

         </div>
         <div>
         
         </div>
      </div>

   )
}
export default FilterHeader;
