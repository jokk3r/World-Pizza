import React from 'react'
import ReactPaginate from 'react-paginate';
import style from "./Pagination.module.scss"
import left from "../../assets/img/left.svg"
import right from "../../assets/img/right.svg"

type PaginationProps = {
  currentPage:number;
  onChangePage: (page:number)=> void
}

const Pagination: React.FC<PaginationProps> = ({currentPage, onChangePage})=> {
  let leftImg = <img src={left} alt="previous" />
  let rightImg = <img src={right} alt="next" />
  return (
    <ReactPaginate
        className={style.root}
        breakLabel="..."
        nextLabel={rightImg}
        previousLabel={leftImg}
        onPageChange={(event)=> onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={currentPage -1}
      />
  )
}

export default Pagination