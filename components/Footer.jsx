import styles from "../styles/Footer.module.css"
import Image from 'next/image'
import logo from "../public/img/logo.gif"
import logoentreprise from "../public/img/logoentreprise.png"


const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footerleft}>
        <Image className={styles.logo} src={logo} alt="loading..." width={260} height={260} />
        <Image className={styles.logoentreprise} src={logoentreprise} alt="loading..." width={260} height={260} />
      </div>
      <ul className={styles.footerright}>
        <li>
          <h2 className={styles.title}>
            RESOURCES RELATIONNELLES
          </h2>
          <p>Immeuble Le Quatrième
            Zone Aéroportuaire de Montpellier Méditerranée
            34130 Mauguio</p>

          <a href="mailto:contact@resourcesrelationnelles.fr">contact@resourcesrelationnelles.fr</a>
        </li>
        <li>
          <li class={styles.aboutpdf}>
            <ul className={styles.box}>
              <li><a href="mentionslegales.pdf" download="mentionslegales.PDF">Mentions légales</a></li>
              <li><a href="PolitiqueDeFonctionnalité.pdf" download="PolitiqueDeFonctionnalité.PDF">Politique de confidentialité</a></li>
              <li><a href="Conditions.pdf" download="Conditions.PDF">Conditions générales d'utilisation Resources Relationnelles</a></li>
            </ul>
          </li>
        </li>
      </ul>
      <div className={styles.footerbottom}>
        <p>Copyright &copy;2022 <a href="#">ReSources Relationnelles</a>  </p>
      </div>
    </div>
  )
}

export default Footer