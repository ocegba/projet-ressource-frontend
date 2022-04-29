import React, { useRef, useState } from "react"
import axios from "axios";

export default function Formulaire() {
  const [disable, setDisable] = useState(false)

  const [categorie, setCategorieRessource] = useState('')
  const [titreRessource, setTitreRessource] = useState('')
  const [typeRessource, setTypeRessource] = useState('')
  const [typeRelationRessource, setRelationRessource] = useState('')
  const [localisationRessource, setLocalisationRessource] = useState('')

  const formRef = useRef();

  return (
    <form ref={formRef} className="flex flex-col justify-center portrait:w-fit">
      <div className="flex flex-col mt-4 min-h-[80px] w-11/12 h-20 mt-3 mb-3 m-auto pr-2 pl-2">
        <label className="text-xl leading-7" htmlFor="titreRessource">Activités ou ressources :</label>
        <input className="bg-white text-base font-medium h-14 pl-2 shadow-xl rounded-xl portrait:text-xs "
          type="text"
          name="searchRessourcesTitreRessource"
          id="titreRessource"
          placeholder='ex: Chasse aux trésors'
          onChange={(e) => setTitreRessource(e.target.value)}
        />
      </div>

      <div class="flex flex-col mt-4 min-h-[80px] w-11/12 h-20 mt-3 mb-3 m-auto pr-2 pl-2 ">
        <label class="text-xl leading-7" for="categorie">Catégorie :</label>
        <select class="bg-white text-base font-medium h-14 pl-2 shadow-xl rounded-xl portrait:text-xs"
          name="searchRessourcesCategorieRessource"
          id="categorie"
          placeholder='Sélectionnez une catégorie'
          value={categorie}
          onChange={(e) => setCategorieRessource(e.target.value)}>

          {categorie?.map((compte, i) => <option value={compte.idCategorie}>{compte.libelleCategorie}</option>)}
        </select>
      </div>

      <div className="flex flex-col mt-4 min-h-[80px] w-11/12 h-20 mt-3 mb-3 m-auto pr-2 pl-2 ">
        <label className="text-xl leading-7" htmlFor="typesRessources">Types de ressources :</label>
        <select className="bg-white text-base font-medium h-14 pl-2 shadow-xl rounded-xl portrait:text-xs"
          name="searchRessourcesTypeRessource"
          id="typesRessources"
          placeholder='Sélectionnez un type de ressource'
          value={typeRessource}
          onChange={(e) => setTypeRessource(e.target.value)} >

          <option value="" selected disabled hidden>Choisir un type de ressources</option>
          <option value="activite">Activité / Jeu à réaliser</option>
          <option value="article">Article</option>
          <option value="cartedefi">Carte défi</option>
          <option value="cours">Cours au format PDF</option>
          <option value="exercice">Exercice / Atelier</option>
          <option value="fichedelecture">Fiche de lecture</option>
          <option value="jeu">Jeu en ligne</option>
          <option value="video">Video</option>
        </select>
      </div>

      <div className="flex flex-col mt-4 min-h-[80px] w-11/12 h-20 mt-3 mb-3 m-auto pr-2 pl-2">
        <label className="text-xl leading-7" htmlFor="typesRelationRessource">Types de relations :</label>
        <select className="bg-white text-base font-medium h-14 pl-2 shadow-xl rounded-xl portrait:text-xs"
          name="searchRessourcesRelationRessource"
          id="typesRelationRessource"
          placeholder='Sélectionnez une ou plusieurs relations'
          value={typeRelationRessource}
          onChange={(e) => setRelationRessource(e.target.value)}>

          <option value="" selected disabled hidden>Choisir un type de relations</option>
          <option value="Tous">Tous </option>
          <option value="Soi">Soi </option>
          <option value="Conjoints">Conjoints</option>
          <option value="Famille">Famille</option>
          <option value="Professionelle"> Professionnelle : collègues, collaborateurs et managers</option>
          <option value="Amis et communautés">Amis et communautés</option>
          <option value="Inconnus">Inconnus </option>
        </select>
      </div>

      <div className="flex flex-col mt-4 min-h-[80px] w-11/12 h-20 mt-3 mb-3 m-auto pr-2 pl-2 ">
        <label className="text-xl leading-7">Département :</label>
        <input className="bg-white text-base font-medium h-14 pl-2 shadow-xl rounded-xl portrait:text-xs"
          name="searchRessourcesLocalisationRessource"
          list="departement"
          placeholder='Sélectionnez un département'
          value={localisationRessource}
          onChange={(e) => setLocalisationRessource(e.target.value)}
        />
        <datalist id="departement">
          <option value="" />
          <option value="Ain">Ain</option>
          <option value="Aisne">Aisne</option>
          <option value="Allier">Allier</option>
          <option value="Alpes-de-Haute-Provence">Alpes-de-Haute-Provence</option>
          <option value="Alpes-Maritimes">Alpes-Maritimes</option>
          <option value="Ardennes">Ardennes</option>
          <option value="Ardèche">Ardèche</option>
          <option value="Ariège">Ariège</option>
          <option value="Aube">Aube</option>
          <option value="Aude">Aude</option>
          <option value="Aveyron">Aveyron</option>
          <option value="Bas-Rhin">Bas-Rhin</option>
          <option value="Bouches-du-Rhône">Bouches-du-Rhône</option>
          <option value="Calvados">Calvados</option>
          <option value="Cantal">Cantal</option>
          <option value="Charente">Charente</option>
          <option value="Charente-Maritime">Charente-Maritime</option>
          <option value="Cher">Cher</option>
          <option value="Corrèze">Corrèze</option>
          <option value="Corse-du-Sud">Corse-du-Sud</option>
          <option value="Creuse">Creuse</option>
          <option value="Côte-d'Or">Côte-d'Or</option>
          <option value="Côtes-d'Armor">Côtes-d'Armor</option>
          <option value="Deux-Sèvres">Deux-Sèvres</option>
          <option value="Dordogne">Dordogne</option>
          <option value="Doubs">Doubs</option>
          <option value="Drôme">Drôme</option>
          <option value="Essonne">Essonne</option>
          <option value="Eure">Eure</option>
          <option value="Eure-et-Loir">Eure-et-Loir</option>
          <option value="Finistère">Finistère</option>
          <option value="Gard">Gard</option>
          <option value="Gers">Gers</option>
          <option value="Gironde">Gironde</option>
          <option value="Guadeloupe">Guadeloupe</option>
          <option value="Guyane">Guyane</option>
          <option value="Haut-Rhin">Haut-Rhin</option>
          <option value="Haute-Corse">Haute-Corse</option>
          <option value="Haute-Garonne">Haute-Garonne</option>
          <option value="Haute-Loire">Haute-Loire</option>
          <option value="Haute-Marne">Haute-Marne</option>
          <option value="Haute-Savoie">Haute-Savoie</option>
          <option value="Haute-Saône">Haute-Saône</option>
          <option value="Haute-Vienne">Haute-Vienne</option>
          <option value="Hautes-Alpes">Hautes-Alpes</option>
          <option value="Hautes-Pyrénées">Hautes-Pyrénées</option>
          <option value="Hauts-de-Seine">Hauts-de-Seine</option>
          <option value="Hérault">Hérault</option>
          <option value="Ille-et-Vilaine">Ille-et-Vilaine</option>
          <option value="Indre">Indre</option>
          <option value="Indre-et-Loire">Indre-et-Loire</option>
          <option value="Isère">Isère</option>
          <option value="Jura">Jura</option>
          <option value="La Réunion">La Réunion</option>
          <option value="Landes">Landes</option>
          <option value="Loir-et-Cher">Loir-et-Cher</option>
          <option value="Loire">Loire</option>
          <option value="Loire-Atlantique">Loire-Atlantique</option>
          <option value="Loiret">Loiret</option>
          <option value="Lot">Lot</option>
          <option value="Lot-et-Garonne">Lot-et-Garonne</option>
          <option value="Lozère">Lozère</option>
          <option value="Maine-et-Loire">Maine-et-Loire</option>
          <option value="Manche">Manche</option>
          <option value="Marne">Marne</option>
          <option value="Martinique">Martinique</option>
          <option value="Mayenne">Mayenne</option>
          <option value="Mayotte">Mayotte</option>
          <option value="Meurthe-et-Moselle">Meurthe-et-Moselle</option>
          <option value="Meuse">Meuse</option>
          <option value="Morbihan">Morbihan</option>
          <option value="Moselle">Moselle</option>
          <option value="Nièvre">Nièvre</option>
          <option value="Nord">Nord</option>
          <option value="Oise">Oise</option>
          <option value="Orne">Orne</option>
          <option value="Paris">Paris</option>
          <option value="Pas-de-Calais">Pas-de-Calais</option>
          <option value="Puy-de-Dôme">Puy-de-Dôme</option>
          <option value="Pyrénées-Atlantiques">Pyrénées-Atlantiques</option>
          <option value="Pyrénées-Orientales">Pyrénées-Orientales</option>
          <option value="Rhône">Rhône</option>
          <option value="Sarthe">Sarthe</option>
          <option value="Savoie">Savoie</option>
          <option value="Saône-et-Loire">Saône-et-Loire</option>
          <option value="Seine-et-Marne">Seine-et-Marne</option>
          <option value="Seine-Maritime">Seine-Maritime</option>
          <option value="Seine-Saint-Denis">Seine-Saint-Denis</option>
          <option value="Somme">Somme</option>
          <option value="Tarn">Tarn</option>
          <option value="Tarn-et-Garonne">Tarn-et-Garonne</option>
          <option value="Territoire de Belfort">Territoire de Belfort</option>
          <option value="Val-d'Oise">Val-d'Oise</option>
          <option value="Val-de-Marne">Val-de-Marne</option>
          <option value="Var">Var</option>
          <option value="Vaucluse">Vaucluse</option>
          <option value="Vendée">Vendée</option>
          <option value="Vienne">Vienne</option>
          <option value="Vosges">Vosges</option>
          <option value="Yonne">Yonne</option>
          <option value="Yvelines">Yvelines</option>

        </datalist>
      </div>

      <div >
        <button className="h-20 mt-3 mb-3 bg-custom-blue text-white font-bold text-3xl w-fit pr-2 pl-2 rounded-xl portrait:text-xs block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
          type="submit" /*  onClick={() => searchNewRessource()} */>Rechercher une ressource</button>
      </div>
    </form >
  )
}