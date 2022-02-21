import React from 'react'
import styles from "../styles/Navbar.module.css"
import Image from 'next/image'
import logo from "../public/img/logo.gif"
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className={styles.container}>
        <Image className={styles.logo} src={logo} alt="loading..." width={80} height={80}/>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/create-a-ressource">Créer une ressource</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/search-a-ressource">Rechercher une ressource</Link>
          </li>
          <li className={styles.listItem}>
            <Link href="/about">À propos</Link>
          </li>
          <li className={styles.listItem}>
          <Link href="/sign-in">Se connecter</Link>
          </li>
        </ul>
        <ul className={styles.list}>
          <li className={styles.listItemSign}>
            <Link href="/sign-up">S'inscrire</Link>
          </li>
          <li className={styles.listItemHelp}>
            <Link href="/help">Aide</Link>
          </li>
        </ul>
    </div>
  )
}

export default Navbar