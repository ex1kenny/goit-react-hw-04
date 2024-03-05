import css from "./ImageCard.module.css";

export default function ImageCard({
  data: {
    urls: { small, regular },
    alt_description,
    description,
    likes,
  },
  openModal,
}) {
  const handleClick = () => {
    openModal({ description: alt_description, img: regular });
  };

  return (
    <div className={css.imageContainer}>
      <img
        className={css.image}
        src={small}
        alt={alt_description}
        onClick={handleClick}
      />
      <div className={css.imageInfo}>
        <p>Likes: {likes}</p>
        <p>Description: {description}</p>
      </div>
    </div>
  );
}
