import FormulaireResFilter from '../components/FormulaireResFilter'
import styles from '../styles/SearchRessource.module.css'

const searchRessource = () => {
  return (
    <div className={styles.container}>
      <div className={styles.research}>
        <h1>Consultez les ressources de la communauté</h1>
          <div>
            <FormulaireResFilter/>
          </div>
        
      </div>
    </div>
  )
}

export default searchRessource
