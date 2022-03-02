import React, { useState } from 'react'
import styles from '../styles/CardRes.module.css'

function addPariciper(){
    alert("Je participe")
}
function addCommenter(){
    alert("Je commente")
}

function addFavoris(){
    alert("J'ajoute à mes favoris")
}

const CardRes = () => {
    const [open, setOpen] = useState(false)

    return (
        
        <div className={styles.container}>
            <div className={styles.entete}>
                <div>
                    <h2>Reconnaitre ses émotions</h2>
                    <p>crée par 1JEAN DUPUIS le 12/01/2022</p>
                </div>
                
                <div className={styles.partage}  onClick={() => alert("ca marche")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 576 512">
                    <path d="M568.9 143.5l-150.9-138.2C404.8-6.773 384 3.039 384 21.84V96C241.2 97.63 128 126.1 128 260.6c0 54.3 35.2 108.1 74.08 136.2c12.14 8.781 29.42-2.238 24.94-16.46C186.7 252.2 256 224 384 223.1v74.2c0 18.82 20.84 28.59 34.02 16.51l150.9-138.2C578.4 167.8 578.4 152.2 568.9 143.5zM416 384c-17.67 0-32 14.33-32 32v31.1l-320-.0013V128h32c17.67 0 32-14.32 32-32S113.7 64 96 64H64C28.65 64 0 92.65 0 128v319.1c0 35.34 28.65 64 64 64l320-.0013c35.35 0 64-28.66 64-64V416C448 398.3 433.7 384 416 384z"/>
                 </svg>
                </div>
                
            </div>
            <div className={styles.contenu}>
                <p>
L’objectif de cet exercice est de reconnaître les émotions sur soi. Pour ce faire, nous noterons dans un petit cahier prévu à cet effet, à des moments prédéfinis de la journée, comment nous nous sentons émotionnellement. 

Quelle émotion nous habite ? Cette émotion est-elle positive ou négative ? 

Avec quelle force ? Quel a été le facteur déclencheur ?
Nous répèterons la démarche durant une semaine.

Après une semaine, reprenons nos notes et identifions avec un marqueur les émotions que nous
ressentons le plus souvent, si elles sont positives ou négatives et quel type de facteur déclencheur est
observé le plus souvent.
Pour conclure, demandons-nous si nos émotions auraient pu être différentes et si la situation en aurait
été changée.</p>
            </div>
            <div className={styles.reactions}>
                <svg onClick={() => Pariciper()} xmlns="http://www.w3.org/2000/svg" width="35" height="35"  viewBox="0 0 640 512"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z"/></svg>
                <svg onClick={() => Commenter()} xmlns="http://www.w3.org/2000/svg" width="35" height="35"  viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z"/></svg>
                <svg onClick={() => addFavoris()} xmlns="http://www.w3.org/2000/svg" width="35" height="35"  viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z"/></svg>
            </div>
        </div>

    )
}

export default CardRes