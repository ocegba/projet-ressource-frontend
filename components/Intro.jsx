import React from 'react'
import styles from '../styles/Intro.module.css'
import Image from 'next/image'
import logo from "../public/img/logo.gif"
import Link from 'next/link'
import Formulaire from './Formulaire'

const Intro = () => {
  return (
    <div className={styles.IntroContainer}>
      <div className={styles.IntroPres}>
        <div className={styles.IntroImage}>
          <div className={styles.IntroContent}>
            <div className={styles.IntroItems}>
              <h1>(Re)Sources Relationnelles</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit temporibus doloribus quo dolorem, rem omnis, facere autem, eius quidem necessitatibus tenetur ex tempore. Voluptatem, dignissimos dolorem. Nemo blanditiis voluptatem fugiat?</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.searchHomeRes}>
        <div className={styles.card}>
          <Image className={styles.logo} src={logo} alt="loading..." width={230} height={230} />
          <h2 className={styles.subTitle}>Chercher une ressource</h2>
          <p>Découvrez des activités qui sont proposées par notre communauté<br /><br />
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Debitis qui aliquid nam aspernatur ullam recusandae error hic autem odit. Non qui id sequi est voluptatem! Voluptatibus, at rerum! Fugit, officiis.</p>
          <a href="PROJET_CUBE_2020_INFRILAL1_MARCHEPUBLIC_CCTP_ANNEXE_EXEMPLE_RESSOURCES_RELATIONNELLES_v1_20200601.pdf" download>En savoir plus</a>
        </div>
        <div className={styles.card}>
          <h2 className={styles.subTitle}>Consulter les ressources de la communauté</h2>
          <Formulaire />
        </div>
      </div>
    </div>
  )
}

export default Intro