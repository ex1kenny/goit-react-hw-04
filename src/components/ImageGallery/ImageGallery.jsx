import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, openModal }) {
  return (
    <ul className={css.container}>
      {items.map((item) => (
        <li key={item.id}>
          {item.id && (
            <ImageCard
              data={item}
              openModal={(description, img) => openModal(description, img)}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
