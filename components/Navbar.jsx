import React from 'react'
import styles from "../styles/Navbar.module.css"
import logo from "../multimedia/logo.gif"

const Navbar = () => {
  return (
    <div className={styles.container}>
        <img src={logo} alt="loading..." />
    </div>
  )
}

export default Navbar