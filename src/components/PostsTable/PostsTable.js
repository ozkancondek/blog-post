import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
  /*  KeyboardDoubleArrowRightRoundedIcon, */
} from "@material-ui/icons";
import { useState } from "react";
import styles from "./PostsTable.module.css";
import Link from "next/link";
//order posts
const orderBy = (posts, value, direction) => {
  if (direction === "asc") {
    return [...posts].sort((a, b) => (a[value] > b[value] ? 1 : -1));
  }
  if (direction === "desc") {
    return [...posts].sort((a, b) => (a[value] > b[value] ? -1 : 1));
  }
  return posts;
};

//arrow icons component for sort posts
const SortArrow = ({ direction }) => {
  if (!direction) {
    return <></>;
  }
  if (direction === "desc") {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowDownRounded color="inherit" />
      </div>
    );
  } else {
    return (
      <div className={styles.heading_arrow}>
        <KeyboardArrowUpRounded color="inherit" />
      </div>
    );
  }
};

const PostsTable = ({ posts }) => {
  //state for define direction
  const [direction, setDirection] = useState();
  const [value, setValue] = useState();
  //arrow switch function
  const switchDirection = () => {
    if (!direction) {
      setDirection("desc");
    } else if (direction === "desc") {
      setDirection("asc");
    } else {
      setDirection(null);
    }
  };

  //set Value and switch sorting direction at once
  const setValueAndDirection = (value) => {
    switchDirection();
    setValue(value);
  };
  //take ordered posts
  const orderedPosts = orderBy(posts, value, direction);
  return (
    <div>
      <div className={styles.heading}>
        <button
          className={styles.heading_postNum}
          onClick={() => setValueAndDirection("postNum")}
        >
          <div>Post Number</div>

          {value === "postNum" && <SortArrow direction={direction} />}
        </button>

        <button
          className={styles.heading_postTitle}
          onClick={() => setValueAndDirection("postTitle")}
        >
          <div>Post Title</div>

          {value === "postTitle" && <SortArrow direction={direction} />}
        </button>
      </div>

      {orderedPosts.map((post) => (
        <Link href={`/posts/${post.id}`} key={post.id}>
          <a>
            <div className={styles.row}>
              <div className={styles.postNum}>{post.id}</div>
              <div className={styles.bullet}>
                <KeyboardArrowUpRounded size="large" />
              </div>

              <div className={styles.postTitle}>{post.title}</div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default PostsTable;
