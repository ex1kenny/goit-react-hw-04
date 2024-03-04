import css from "./ErrorMessage.module.css";

export default function ErrorMessage() {
  return (
    <div className={css.container}>
      <p>Something went wrong. Try to reload page...</p>
    </div>
  );
}
