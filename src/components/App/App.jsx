import { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { fetchImages } from "../../image-api";
import ImageModal from "../ImageModal/ImageModal";

function App() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [images, setImages] = useState({
    items: [],
    loading: false,
    error: false,
  });
  const [modalData, setModalData] = useState({
    isOpen: false,
    description: "",
    img: "",
  });
  const openModal = (description, img) => {
    console.log(img);
    setModalData({ isOpen: true, description, img });
  };
  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleSubmit = async (newQuery) => {
    setQuery(newQuery);
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
      {images.items.length > 0 && (
        <ImageGallery items={images.items} openModal={openModal} />
      )}
      {images.loading && <Loader />}
      {images.items.length > 0 && !images.loading && page < totalPages && (
        <LoadMoreBtn onPagination={handlePagination} />
      )}
      <Toaster position="top-right" />
      <ImageModal
        isOpen={modalData.isOpen}
        description={modalData.description}
        img={modalData.img}
        handleModal={closeModal}
      />
    </div>
  );
}

export default App;
