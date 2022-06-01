import { useState } from "react";
import Layout from "../components/Layout/Layout";
import styles from "../styles/Home.module.css";
import SearchInput from "../components/SearchInput/SearchInput";
import PostsTable from "../components/PostsTable/PostsTable";
import { blogServices } from "../services/api";
import { useRouter } from "next/router";
import { toastSuccessNotify } from "../services/Toastify";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "react-bootstrap";

//here is home page when app first opened
export default function Home({ posts }) {
  //hook for navigation
  const router = useRouter();

  //state for keep search input inner value
  const [keyword, setKeyword] = useState("");

  //filter post by serach input  keyword
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
      <ToastContainer />
      <div className={styles.inputContainer}>
        <div className={styles.counts}>Found {filteredPosts.length} posts</div>
        <div className={styles.btn_container}>
          <Button
            size="lg"
            variant="outline-primary"
            onClick={() => router.push("/addpost")}
          >
            Add Post
          </Button>
        </div>

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
