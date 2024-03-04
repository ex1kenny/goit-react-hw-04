import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "../../image-api";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState({
    items: [],
    loading: false,
    error: false,
  });

  const handleSubmit = async (newQuery) => {
    const uniqueId = nanoid();
    setQuery(`${uniqueId}/${newQuery}`);
    setPage(1);
    setImages({
      items: [],
      loading: true,
      error: false,
    });
  };

  const handlePagination = () => {
    setImages((prevElements) => ({
      ...prevElements,
      loading: true,
    }));
    setPage(page + 1);
  };

  useEffect(() => {
    if (query === "") {
      return;
    }

    async function fetchData() {
      try {
        const response = await fetchImages(query, page);
        setImages((prevElements) => ({
          ...prevElements,
          items: [...prevElements.items, ...response.results],
        }));
        setImages((prevData) => ({
          ...prevData,
          loading: false,
          error: false,
        }));
        setTotalPages(response.total_pages);
      } catch (error) {
        setImages((prevElements) => ({
          ...prevElements,
          error: true,
        }));
      } finally {
        setImages((prevElements) => ({
          ...prevElements,
          loading: false,
        }));
      }
    }

    fetchData();
  }, [query, page]);

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} />
      {images.error && <ErrorMessage />}
      {images.items.length > 0 && <ImageGallery items={images.items} />}
      {images.loading && <Loader />}
      {images.items.length > 0 && !images.loading && page < totalPages && (
        <LoadMoreBtn onPagination={handlePagination} />
      )}
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
