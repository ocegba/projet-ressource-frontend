import React, { useState } from 'react'
import styles from "../styles/Navbar.module.css"
import Image from 'next/image'
import logo from "../public/img/logo.gif"
import Link from 'next/link'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.container}>
      <a href="/" alt="loading..."><Image className={styles.logo} src={logo} width={80} height={80} /></a>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <Link href="/createRessource">Créer une ressource</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/searchRessource">Rechercher une ressource</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/about">À propos</Link>
        </li>
        <li className={styles.listItem}>
          <Link href="/signin">Se connecter</Link>
        </li>
      </ul>
      <ul className={styles.list}>
        <li className={styles.listItemSign}>
          <Link href="/signup">S'inscrire</Link>
        </li>
        <li className={styles.listItemHelp}>
          <Link href="/help">Aide</Link>
        </li>
      </ul>
      <div className={styles.hamburger} onClick={() => setOpen(!open)} >
        <div className={styles.line} />
        <div className={styles.line} />
        <div className={styles.line} />
      </div>
      <ul onClick={() => setOpen(false)} className={styles.menu} style={{ right: open ? "0px" : "-50vw" }}>
        <li className={styles.menuItem}>
          <Link href="/createRessource">Créer une ressource</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/searchRessource">Rechercher une ressource</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/about">À propos</Link>
        </li>
        <li className={styles.menuItem}>
          <Link href="/signin">Se connecter</Link>
        </li>
        <li className={styles.menuItemSign}>
          <Link href="/signup">S'inscrire</Link>
        </li>
        <li className={styles.menuItemHelp}>
          <Link href="/help">Aide</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar