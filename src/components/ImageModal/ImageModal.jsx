// ImageModal.js
import Modal from "react-modal";
import { TfiClose } from "react-icons/tfi";
import css from "./ImageModal.module.css";

export const ImageModal = ({ description, img, handleModal, onOpen }) => {
  return (
    <Modal
      isOpen={onOpen}
      onRequestClose={handleModal}
      ariaHideApp={false}
      className={css.modal}
    >
      <TfiClose className={css.button} onClick={handleModal} size={30} />
      <img src={img} alt={description} className={css.image} />
    </Modal>
  );
};
