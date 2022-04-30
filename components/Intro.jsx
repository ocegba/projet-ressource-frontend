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
              <p>Proposer une plateforme autour de la qualité des liens relationnelles que nous pouvons tisser pour une meilleure qualité de vie</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.searchHomeRes}>
        <div className={styles.card}>
          <Image className={styles.logo} src={logo} alt="loading..." width={230} height={230} />
          <h2 className={styles.subTitle}>Chercher une ressource</h2>
          <p className="p-1">Découvrez des activités qui sont proposées par notre communauté<br /><br />
            Le principal enjeu du projet (RE)Sources Relationnelles est de proposer des ressources et outils pour créer, renforcer et enrichir les relations des citoyens.
            D’après la pyramide de Maslow, nos besoins d’êtres humains se structurent par priorités depuis nos besoins physiologiques jusqu’à nos besoins d’accomplissement. Au fil de cette pyramide, nous retrouvons des problématiques de recherche de sécurité, de sens, de développement personnel et, si l’on pousse la réflexion, à la recherche du bonheur.
            Bien souvent, l’un des leviers les plus importants dans ces thématiques reste la qualité de nos relations	 aux autres : parents, couple, famille, amis, collègues, etc. Chaque type de relation implique une proximité différente et donc de lignes de communications différentes.
          </p>
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