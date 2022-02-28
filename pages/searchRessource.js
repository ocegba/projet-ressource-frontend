import FormulaireRes from '../components/FormulaireRes'
import styles from '../styles/SearchRessource.module.css'

const searchRessource = () => {
  return (
    <div className={styles.container}>
      <div className={styles.research}>
        <h1>Consultez les ressources de la communauté</h1>
          <div>
            <FormulaireRes/>
          </div>
        
      </div>
    </div>
  )
}

export default searchRessource
