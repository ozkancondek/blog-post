/* eslint-disable @next/next/no-img-element */
import Layout from "../../components/Layout/Layout";
import styles from "./post.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { blogServices } from "../../services/api";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const fetchAll = async () => {
    const resPost = await blogServices.fetchSingleData(id);
    const resComments = await blogServices.fetchDataComments(id);
    setPost(resPost);
    setComments(resComments);
  };
  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Layout title={`Post ${post.id}`}>
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
              >{`${comments.length} comments found`}</div>
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
                          {comment.email}
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
