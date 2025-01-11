import React,{useState,useContext} from 'react'
import { Context } from '../utils/Context';
function Pagination() {

    let context = useContext(Context)

    const [pageNumberLimit] = useState(3);
    let [minPageNumberLimit,setMinPageNumberLimit] = useState(0)
    let [maxPageNumberLimit,setMaxPageNumberLimit] = useState(5)
  
    let pages = [];

    //create pages based on total count
    for (let i = 1; i <= Math.ceil(context.totalCount / context.itemsPerPage); i++) {
        pages.push(i);
    }

    const handleClick = (event) => {
        context.setCurrentPage(Number(event.target.id));
    };

    const handleNext = () => {
        context.setCurrentPage((prev) => prev + 1);
        if (context.currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrev = () => {
        setCurrentPage((prev) => prev - 1);

        if ((context.currentPage - 1) % pageNumberLimit === 0) {
        setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
        setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageDecrementBtn = null;
    if (minPageNumberLimit !== 0) {
        pageDecrementBtn = (
        <li onClick={handlePrev}>
            <button>&hellip;</button>
        </li>
        );
    }

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = (
        <li onClick={handleNext}>
            <button>&hellip;</button>
        </li>
        );
    }

    let start = (context.currentPage - 1) * context.itemsPerPage + 1;
    
    let end =
        context.totalCount < context.currentPage * context.itemsPerPage
        ? context.totalCount
        : context.currentPage * context.itemsPerPage;

    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                key={number}
                id={number}
                onClick={handleClick}
                className={context.currentPage === number ? "active" : null}
                >
                <button id={number}> {number}</button>
                </li>
            );
            } 
        else 
            return null;
    });
  //pagination related function ends here

  return <div className="flex  flex-wrap justify-between mt-20">
    <div>
      <label>Show</label> &nbsp;
      <select value={context.itemsPerPage} onChange={(e)=>{context.setItemsPerPage(e.target.value);context.setCurrentPage(1)}}
        className='h-6 border border-gray-700'>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>&nbsp;
      <label>Entries</label>
    </div>

    <div>
      <p className="text-base">
        {" "}
        Showing {start} to {end} of {context.totalCount} entries
      </p>
    </div>

    <div className="custom_pagination">
      <ul>
        <li>
          <button onClick={handlePrev} disabled={context.currentPage === 1}>
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li>
          <button
            onClick={handleNext}
            disabled={context.currentPage === pages.length}
          >
              Next
          </button>
        </li>
      </ul>
    </div>
  </div>
}

export default Pagination