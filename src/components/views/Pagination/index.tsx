import { FC, useState } from "react";

import type { IPagination } from "./type";

import style from "./Pagination.module.scss";

const Pagination: FC<IPagination> = ({
  array,
  currentPage,
  setPage,
  setMaxPageLimit,
  setMinPageLimit,
  maxPageLimit,
  minPageLimit,
  paginate,
}) => {
  const [pagesLimit] = useState(5);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(array / 15); i++) {
    pageNumbers.push(i);
  }

  const onPrev = () => {
    if (currentPage === 1) return false;

    setPage(currentPage - 1);

    if ((currentPage - 1) % pagesLimit == 0) {
      setMaxPageLimit(maxPageLimit - pagesLimit);
      setMinPageLimit(minPageLimit - pagesLimit);
    }
  };

  const onNext = () => {
    if (currentPage === pageNumbers.length) return false;

    setPage(currentPage + 1);

    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pagesLimit);
      setMinPageLimit(minPageLimit + pagesLimit);
    }
  };

  const showedPages = pageNumbers.map((num) => {
    if (num < maxPageLimit + 1 && num > minPageLimit) {
      return (
        <li className={style.pagination__item} key={num}>
          <span
            className={currentPage === num ? `${style.pagination__link_active}` : `${style.pagination__link}`}
            onClick={() => paginate(num)}
          >
            {num}
          </span>
        </li>
      );
    } else {
      return null;
    }
  });

  return (
    <div>
      <ul className={style.pagination}>
        <li className={style.pagination__item} onClick={onPrev}>
          &larr;
        </li>
        {showedPages}
        <li className={style.pagination__item} onClick={onNext}>
          &rarr;
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
