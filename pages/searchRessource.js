import FormulaireResFilter from '../components/FormulaireResFilter'
import styles from '../styles/SearchRessource.module.css'

const searchRessource = () => {
  return (
    <div className={styles.container}>
      <div className={styles.research}>
        <h1>Consultez les ressources de la communauté</h1>
        <div>
          <FormulaireResFilter />
        </div>

      </div>

      <div>

        <select>
          {/* {
            numbers.map(el => <option value={el} key={el}> {el} </option>)
          } */}
        </select>
      </div>
    </div>
  )
}

export default searchRessource


