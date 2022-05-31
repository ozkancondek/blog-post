import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";
import PostsTable from "../components/PostsTable/PostsTable";
import { useState } from "react";
import { blogServices } from "../services/api";

export default function Home({ posts }) {
  const [keyword, setKeyword] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(keyword)
  );

  //set input value to keyword
  const onInputChange = (e) => {
    e.preventDefault();
    setKeyword(e.target.value.toLowerCase());
  };

  return (
    <Layout>
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found 25 posts</div>

        <div className={styles.input}>
          <SearchInput placeholder="Filter by word" onChange={onInputChange} />
        </div>
      </div>
      <PostsTable posts={filteredPosts} />
    </Layout>
  );
}

// This function gets called at build time on server-side.
export const getStaticProps = async () => {
  const posts = await blogServices.fetchData();

  return {
    props: {
      posts,
    },
  };
};
