import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onPagination }) => {
  return (
    <div className={css.container}>
      <button className={css.button} onClick={onPagination}>
        Load more images
      </button>
    </div>
  );
};

export default LoadMoreBtn;
