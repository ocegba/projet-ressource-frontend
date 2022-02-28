import React from 'react'
import Image from 'next/image'
import styles from '../styles/about.module.css'
import logo from "../public/img/logo.gif"
import logoentreprise from "../public/img/logoentreprise.png"
import logoministere from "../public/img/Ministère_des_Solidarités_et_de_la_Santé.png"

const about = () => {
  return (
        <div className={styles.container}>
            <p><b>Resources relationnelles</b> a été réalisé par l’entreprise <b>4APPS</b> proposé par le <b>ministère des Solidarités et de la Santé.</b></p>
            <div>
                <Image className={styles.logo} src={logo} alt="loading..." width={260} height={260} />
                <Image className={styles.logo} src={logoentreprise} alt="loading..." width={260} height={260} />
                <Image className={styles.logo} src={logoministere} alt="loading..." width={260} height={260} />
            </div>
            <p>Cette application permet de renforcer les liens entre les citoyens à travers diverses ressources.</p>
        </div>
    )
}

export default about