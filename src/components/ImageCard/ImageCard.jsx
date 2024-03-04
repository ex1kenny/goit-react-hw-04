import { useState } from "react";
import css from "./ImageCard.module.css";
import { ImageModal } from "../ImageModal/ImageModal";

export default function ImageCard({
  data: {
    id,
    urls: { small, regular },
    alt_description,
    description,
    likes,
  },
}) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal((prevValue) => !prevValue);
  }

  return (
    <div>
      <ul className={css.imageList}>
        <li key={id}>
          <div className={css.imageContainer}>
            <img
              className={css.image}
              src={small}
              alt={alt_description}
              onClick={toggleModal}
            />
            <div className={css.imageInfo}>
              <p>Likes: {likes}</p>
              <p>description: {description}</p>
            </div>
          </div>
          <ImageModal
            description={alt_description}
            img={regular}
            handleModal={toggleModal}
            onOpen={showModal}
          />
        </li>
      </ul>
    </div>
  );
}
