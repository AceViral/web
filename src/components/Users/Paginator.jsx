import { useState } from "react";
import s from "./Paginator.module.scss";

let Paginator = ({
   totalItemsCount,
   pageSize,
   currentPage,
   onPageChanged,
   portionSize = 10,
}) => {
   let pagesCount = Math.ceil(totalItemsCount / pageSize);
   let pages = [];
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   }
   let [portionNumber, setPortionNumber] = useState(1);
   let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
   let rightPortionPageNumber = portionNumber * portionSize;

   return (
      <div className={s.paginator}>
         <ul>
            <li
               className={s.prev}
               onClick={() => {
                  setPortionNumber(portionNumber - 1);
               }}
            >
               <span>
                  <i className="fas fa-angle-left"></i>Prev
               </span>
            </li>
            {pages
               .filter(
                  (p) =>
                     p >= leftPortionPageNumber && p <= rightPortionPageNumber
               )
               .map((p) => {
                  return (
                     <li
                        className={
                           currentPage === p ? s.selectedPage : s.pageNumber
                        }
                        key={p}
                        onClick={(e) => {
                           onPageChanged(p);
                        }}
                     >
                        {p}
                     </li>
                  );
               })}
            <li
               className={s.next}
               onClick={() => {
                  setPortionNumber(portionNumber + 1);
               }}
            >
               <span>
                  Next
                  <i className="fas fa-angle-right"></i>
               </span>
            </li>
         </ul>
      </div>
   );
};

export default Paginator;
