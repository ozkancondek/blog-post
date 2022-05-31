import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import styles from "./Layout.module.css";
import logo from "../../asset/images/logo.png";
import Image from "next/image";

//reusable component for header and footer on every page
const Layout = ({ children, title = "Blog Posts" }) => {
  //initial value of theme is light
  const [theme, setTheme] = useState("light");

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

  //get theme when component mounted
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      localStorage.getItem("theme")
    );

    setTheme(localStorage.getItem("theme"));
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.header_text}>
          <Link href="/">
            <Image width="40" height="45" src={logo} alt="logo" />
          </Link>
          <h2>Blog-Posts</h2>
        </div>

        <button className={styles.themeSwitcher} onClick={switchTheme}>
          {theme === "dark" ? (
            <BsFillSunFill size="30" />
          ) : (
            <MdDarkMode size="30" />
          )}
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
