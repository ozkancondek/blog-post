import { BsSearch } from "react-icons/bs";
import styles from "./SearchInput.module.css";

const SearchInput = ({ ...rest }) => {
  return (
    <div className={styles.wrapper}>
      <BsSearch />
      <input className={styles.input} {...rest} />
    </div>
  );
};

export default SearchInput;
