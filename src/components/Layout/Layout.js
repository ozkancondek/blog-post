import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Brightness6Rounded } from "@material-ui/icons";
import styles from "./Layout.module.css";
import logo from "../../asset/images/logo.png";
import Image from "next/image";

const Layout = ({ children, title = "Blog Posts" }) => {
  const [theme, setTheme] = useState("light");

  //get theme when component mounted
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );

    setTheme(localStorage.getItem("theme"));
  }, []);

  //toggle theme
  const switchTheme = () => {
    theme === "light" ? saveTheme("dark") : saveTheme("light");
  };

  //save theme to local storage
  const saveTheme = (theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
    //set value of attribute on element or update it
    document.documentElement.setAttribute("data-theme", theme);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Link href="/">
          <Image width="40" height="45" src={logo} alt="logo" />
        </Link>
        <p>Blog-Posts</p>

        <button className={styles.themeSwitcher} onClick={switchTheme}>
          <Brightness6Rounded fontSize="large" />
        </button>
      </header>

      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>
        OBI-Task Blog-Posts Project @2022
      </footer>
    </div>
  );
};

export default Layout;
