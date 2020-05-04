import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const maxPage = Math.ceil(totalPosts / postsPerPage);

  return (
    <nav>
      <ul className="pagination">
        <div>
          <div class="pagination">
            <a
              onClick={() => {
                if (currentPage >= 2) paginate(currentPage - 1);
              }}
              href="#"
            >
              &laquo;
            </a>
            <a
              onClick={() => {
                if (currentPage >= 2) paginate(currentPage - 1);
              }}
              href="#"
            >
              {currentPage - 1}
            </a>
            <a onClick={() => paginate(currentPage)} href="#" class="active">
              {currentPage}
            </a>
            <a
              onClick={() => {
                if (currentPage < maxPage) paginate(currentPage + 1);
              }}
              href="#"
            >
              {currentPage + 1}
            </a>
            <a
              onClick={() => {
                if (currentPage < maxPage) paginate(currentPage + 1);
              }}
              href="#"
            >
              &raquo;
            </a>
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Pagination;
