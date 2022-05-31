import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../components/Layout/Layout";
import { blogServices } from "../../services/api";
import styles from "./AddPost.module.css";
import { toastSuccessNotify } from "../../services/Toastify";

//this page includes a form element for sending new post to backend
const AddPost = () => {
  //take navigation hook for forward pages
  const router = useRouter();

  //states for storage input values
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //data for data posting
  const postData = {
    userId: +userId,
    title: title,
    body: content,
  };

  const addPost = async (e) => {
    e.preventDefault();
    const res = await blogServices.postData(postData);
    toastSuccessNotify(
      "Data added to post list.You are being redirected to the home page."
    );

    //clear input fields after form submit
    e.target.reset();

    //go to main page after submit
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };
  return (
    <Layout>
      <ToastContainer />
      <div className={styles.main}>
        <Button variant="outline-secondary" size="lg" disabled>
          Post Form
        </Button>
        <Container fluid="sm">
          <Row>
            <Col>
              <Form onSubmit={(e) => addPost(e)}>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="input"
                    onChange={(e) => setUserId(e.target.value)}
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
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.Submit">
                  <Button variant="primary" size="lg" type="submit">
                    Confirm
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

export default AddPost;
