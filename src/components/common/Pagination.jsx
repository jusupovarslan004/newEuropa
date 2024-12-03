import "./Pagination.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      if (currentPage <= 4) {
        // Показываем первые 5 страниц
        for (let i = 1; i <= 5; i++) {
          pages.push(renderPageButton(i));
        }
        pages.push(
          <span key="ellipsis1" className="pagination__ellipsis">
            ...
          </span>
        );
        pages.push(renderPageButton(totalPages));
      } else if (currentPage >= totalPages - 3) {
        // Показываем последние 5 страниц
        pages.push(renderPageButton(1));
        pages.push(
          <span key="ellipsis2" className="pagination__ellipsis">
            ...
          </span>
        );
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(renderPageButton(i));
        }
      } else {
        // Показываем текущую страницу и по 2 страницы с каждой стороны
        pages.push(renderPageButton(1));
        pages.push(
          <span key="ellipsis3" className="pagination__ellipsis">
            ...
          </span>
        );
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(renderPageButton(i));
        }
        pages.push(
          <span key="ellipsis4" className="pagination__ellipsis">
            ...
          </span>
        );
        pages.push(renderPageButton(totalPages));
      }
    } else {
      // Если страниц мало, показываем все
      for (let i = 1; i <= totalPages; i++) {
        pages.push(renderPageButton(i));
      }
    }

    return pages;
  };

  const renderPageButton = (pageNumber) => (
    <button
      key={pageNumber}
      className={`pagination__button ${
        currentPage === pageNumber ? "active" : ""
      }`}
      onClick={() => onPageChange(pageNumber)}
    >
      {pageNumber}
    </button>
  );

  return (
    <div className="pagination">
      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>
      {renderPageNumbers()}
      <button
        className="pagination__arrow"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};

export default Pagination;
