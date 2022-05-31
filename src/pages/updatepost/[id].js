import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import { blogServices } from "../../services/api";
import styles from "../addpost/AddPost.module.css";
import { toastSuccessNotify } from "../../services/Toastify";

//this page includes form component and updates post by setting initial values to input values
const UpdatePost = () => {
  const router = useRouter();
  const { id } = router.query;

  //States for input value change
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //get single post to update
  const [post, setPost] = useState({});

  //data for post, which is gonna be update
  const updateData = {
    userId: +userId,
    title: title,
    body: content,
  };

  //get single post to give initial values of inputs
  const getPost = async () => {
    const res = await blogServices.fetchSingleData(id);
    //set it to post state
    setPost(res);
  };

  //onSubmit function
  const updatePost = async (e) => {
    //prevent reloading of page
    e.preventDefault();

    const res = await blogServices.updateData(post.id, updateData);

    toastSuccessNotify(
      "Data updated.You are being redirected to the home page"
    );

    //clear input fields
    e.target.reset();

    //forward to main page after 3 seconds
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  //get post when component mount
  useEffect(() => {
    getPost();
  }, []);

  return (
    <Layout>
      <ToastContainer />
      <div className={styles.main}>
        <Button variant="outline-secondary" size="lg" disabled>
          Update Post
        </Button>
        <Container fluid="sm">
          <Row>
            <Col>
              <Form
                onSubmit={(e) => {
                  updatePost(e);
                }}
              >
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="input"
                    onChange={(e) => setUserId(e.target.value)}
                    defaultValue={post.userId}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    type="input"
                    onChange={(e) => setTitle(e.target.value)}
                    defaultValue={post.title}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) => setContent(e.target.value)}
                    defaultValue={post.body}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="exampleForm.Submit">
                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    onClick={() => console.log(updateData)}
                  >
                    Update
                  </Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default UpdatePost;
