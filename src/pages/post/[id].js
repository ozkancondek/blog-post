/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import styles from "./post.module.css";
import { blogServices } from "../../services/api";
import { toastSuccessNotify } from "../../services/Toastify";

//The details of every single posts will apper in this page
const Post = () => {
  //navigate hook
  const router = useRouter();

  //take id from query
  const { id } = router.query;

  //state for storage single post
  const [post, setPost] = useState({});

  //state for storage comments of single post
  const [comments, setComments] = useState([]);

  //run both of functions and get post + comments
  const fetchAll = async () => {
    const resPost = await blogServices.fetchSingleData(id);
    const resComments = await blogServices.fetchDataComments(id);

    //set post response to post state with setPost function
    setPost(resPost);

    //set comments response to comments state with setComments function
    setComments(resComments);
  };

  const deletePost = async () => {
    try {
      const res = await blogServices.deleteData(id);

      //toastify mesage
      toastSuccessNotify(
        "Post deleted. You are being redirected to the home page"
      );
    } catch (error) {
      console.log(error);
    }

    //go to main page after data deleted
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  //take post and comments when component mounth
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Layout title={`Post ${post.id}`}>
      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.overview_panel}>
            <img
              src="https://as2.ftcdn.net/v2/jpg/02/44/68/97/1000_F_244689725_wCaHdOOJohF5fDtXvhj4Hid1JvZYqwJc.jpg"
              alt="comment"
            />

            <h1 className={styles.overview_name}>{`Post ${post?.id}`}</h1>
            <div
              className={styles.overview_authorId}
            >{`Posted by user ${post?.id}`}</div>
            <div className={styles.button_container}>
              <Button
                variant="outline-primary"
                onClick={() => router.push(`/updatepost/${id}`)}
              >
                Update
              </Button>
              <Button variant="outline-primary" onClick={() => deletePost()}>
                Delete
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>
          <div className={styles.details_panel}>
            <h4 className={styles.details_panel_heading}>Details</h4>

            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Title</div>
              <div className={styles.details_panel_value}>{post?.title}</div>
            </div>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Content</div>
              <div className={styles.details_panel_value}>{post?.body}</div>
            </div>
          </div>
          <div className={styles.details_panel}>
            <div className={styles.details_panel_row}>
              <div className={styles.details_panel_label}>Comments</div>
              <div
                className={styles.details_panel_value}
              >{`${comments.length} comments found about this post`}</div>
            </div>
          </div>

          {comments
            ? comments.map((comment, index) => {
                return (
                  <div key={index}>
                    <div className={styles.details_panel}>
                      <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>{`Comment ${
                          index + 1
                        }`}</div>
                        <div className={styles.details_panel_value}>
                          {`${comment.email} commented`}
                        </div>
                      </div>
                      <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>Body</div>
                        <div className={styles.details_panel_value}>
                          {comment.name}
                        </div>
                      </div>
                      <div className={styles.details_panel_row}>
                        <div className={styles.details_panel_label}>
                          Content
                        </div>
                        <div className={styles.details_panel_value}>
                          {comment.body}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : {}}
        </div>
      </div>
    </Layout>
  );
};

export default Post;
