import css from "./SearchBar.module.css";
import toast from "react-hot-toast";

export default function SearchBar({ onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (e.target.query.value.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }

    onSubmit(e.target.query.value);
    e.target.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleFormSubmit}>
        <input
          className={css.input}
          type="text"
          name="query"
          placeholder="Search images and photos"
        />
        <button className={css.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}
