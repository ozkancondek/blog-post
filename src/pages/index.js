import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";

export default function Home() {
  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found 25 posts</div>

        <div className={styles.input}>
          <SearchInput
            placeholder="Filter by word"
            /* onChange={onInputChange} */
          />
        </div>
      </div>
    </Layout>
  );
}
