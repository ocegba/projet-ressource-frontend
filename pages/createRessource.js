import Head from 'next/head'
import React, { useRef, useState } from "react"
import JSONBig from 'json-bigint';
import prisma from '../prisma/prisma'
import axios from "axios";

export default function createRessource(props) {
  const [disable, setDisable] = useState(false);

  const [titreRessource, setTitreRessource] = useState('')
  const [categorie, setCategorieRessource] = useState('')
  const [typeRessource, setTypeRessource] = useState('')
  const [typeRelationRessource, setRelationRessource] = useState('')
  const [storyRessource, setStoryRessource] = useState('')
  const [fileRessource, setFileRessource] = useState('')
  const [lienRessource, setLienRessource] = useState('')
  const [localisationRessource, setLocalisationRessource] = useState('')

  const formRef = useRef();
  const categories = props.categories;


  async function addNewRessource() {
    setDisable(true);
    const {
      addRessourcesTitreRessource,
      addRessourcesCategorieRessource,
      addRessourcesTypeRessource,
      addRessourcesRelationRessource,
      addRessourcesStoryRessource,
      addRessourcesFileRessource,
      addRessourcesLienRessource,
      addRessourcesLocalisationRessource,
    } = formRef.current;
    const titreRessource = addRessourcesTitreRessource.value;
    const idCategorie = addRessourcesCategorieRessource.value;
    const typeRessource = addRessourcesTypeRessource.value;
    const typeRelationRessource = addRessourcesRelationRessource.value;
    const storyRessource = addRessourcesStoryRessource.value;
    const fileRessource = addRessourcesFileRessource.value;
    const lienRessource = addRessourcesLienRessource.value;
    const localisationRessource = addRessourcesLocalisationRessource.value;
    const dateRessource = (new Date(Date.now())).toISOString();
    await axios.post("/api/ressource/addRessource", {
      titreRessource,
      idCategorie: parseInt(idCategorie),
      typeRessource,
      typeRelationRessource,
      storyRessource,
      fileRessource,
      lienRessource,
      localisationRessource,
      dateRessource,
    });
    setDisable(false);
    alert("Votre ressource a bien été envoyé au modérateur")
    window.location.reload();
  }
  return (
    <div className="flex flex-column portrait:flex-col w-full	bg-gray-100 h-fit">
      <Head>
        <title>Créer votre propre ressource</title>
        <meta name="description" content="Créer votre propre ressource" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-custom-blue/50 rounded-3xl flex-1 justify-center	items-center p-8 m-4 h-fit">
        <h1 className="flex justify-center items-center align-justify font-extrabold text-4xl">Créer votre ressource</h1>
        <form i ref={formRef} d="formCreate" className="flex flex-col">

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="titreRessource">Titre de la ressource :</label>
            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10" maxlength="50"
              type="text"
              name="addRessourcesTitreRessource"
              id="titreRessource"
              placeholder='ex: Chasse aux trésors'
              value={titreRessource}
              onChange={(e) => setTitreRessource(e.target.value)}
            />
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="categorieRessource">Catégorie :</label>
            <select className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
              required
              name="addRessourcesCategorieRessource"
              id="categorie"
              placeholder='Sélectionnez une catégorie'
              value={categorie}
              onChange={(e) => [setCategorieRessource(e.target.value)]}>

              {categories?.map((compte, i) => <option value={compte.idCategorie}>{compte.libelleCategorie}</option>)}
            </select>
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="typesRessources">Types de ressources :</label>
            <select className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
              required
              name="addRessourcesTypeRessource"
              id="typesRessources"
              placeholder='Sélectionnez un type de ressource'
              value={typeRessource}
              onChange={(e) => setTypeRessource(e.target.value)} >

              <option value="" selected disabled hidden>Choisir un type de ressources</option>
              <option value="Activité / Jeu à réaliser">Activité / Jeu à réaliser</option>
              <option value="Article">Article</option>
              <option value="Carte défi">Carte défi</option>
              <option value="Cours au format PDF">Cours au format PDF</option>
              <option value="Exercice / Atelier">Exercice / Atelier</option>
              <option value="Fiche de lecture">Fiche de lecture</option>
              <option value="Jeu">Jeu en ligne</option>
              <option value="Vidéo">Vidéo</option>
            </select>
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="storyRessource">Texte :</label>
            <textarea className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
              type="text"
              name="addRessourcesStoryRessource"
              id="storyRessource"
              placeholder='Expliquer votre ressource'
              value={storyRessource}
              onChange={(e) => setStoryRessource(e.target.value)} />
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="fileRessource">Fichier :</label>
            <input
              type="file"
              name="addRessourcesFileRessource"
              id="fileRessource"
              placeholder='Insérer une image, un document pdf ou word...'
              value={fileRessource}
              onChange={(e) => setFileRessource(e.target.value)} />
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="lienRessource">Entrez un lien url en complément de votre ressource :</label>
            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
              type="url"
              name="addRessourcesLienRessource"
              id="lienRessource"
              placeholder="https://example.com"
              pattern="https://.*"
              size="30"
              value={lienRessource}
              onChange={(e) => setLienRessource(e.target.value)}
            />
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="typesRelationRessource">Types de relations :</label>
            <select className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
              required
              name="addRessourcesRelationRessource"
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

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl">Département :</label>
            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
              name="addRessourcesLocalisationRessource"
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

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <button disabled={disable} className="h-20 mt-3 mb-3 bg-custom-blue text-white font-bold text-3xl w-fit pr-2 pl-2 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" onClick={() => addNewRessource()}>Créer une ressource</button>
          </div>
        </form >
      </div>

      {/* card content */}
      <div className="flex-1 justify-center	items-center p-14">
        <p className="p-6 text-lg">Un modérateur vérifiera la ressource avant sa publication alors vérifier bien les informations inscrites.</p>
        <div className="static w-600 h-550 bg-white rounded-lg drop-shadow-xl">
          <div className="flex justify-between p-2 h-24 top-0">
            <div className="h-fit">
              <h2 className="m-auto text-lg text-black">{titreRessource}</h2>
              <p className="m-auto text-black">crée par <span id="username" /><br />prévu à {localisationRessource}</p>
            </div>

            <div>
              <p class="text-xs bg-red-200" id="categorieOutput">{categorie}</p>
              <p class="text-xs bg-custom-blue" id="typesRessourcesOutput">{typeRessource}</p>
              <p class="text-xs bg-green-200" id="typesRelationRessourceOutput">{typeRelationRessource}</p>
            </div>

            <div className="cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 576 512">
                <path d="M568.9 143.5l-150.9-138.2C404.8-6.773 384 3.039 384 21.84V96C241.2 97.63 128 126.1 128 260.6c0 54.3 35.2 108.1 74.08 136.2c12.14 8.781 29.42-2.238 24.94-16.46C186.7 252.2 256 224 384 223.1v74.2c0 18.82 20.84 28.59 34.02 16.51l150.9-138.2C578.4 167.8 578.4 152.2 568.9 143.5zM416 384c-17.67 0-32 14.33-32 32v31.1l-320-.0013V128h32c17.67 0 32-14.32 32-32S113.7 64 96 64H64C28.65 64 0 92.65 0 128v319.1c0 35.34 28.65 64 64 64l320-.0013c35.35 0 64-28.66 64-64V416C448 398.3 433.7 384 416 384z" />
              </svg>
            </div>

          </div>

          <div className="h-96 bg-green-200">
            <p className="pl-2 text-justify">{storyRessource}</p>
          </div>

          <div className="grid grid-cols-2 justify-between p-2.5">
            <div className="inline-block">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 384 512"><path d="M256 0v128h128L256 0zM224 128L224 0H48C21.49 0 0 21.49 0 48v416C0 490.5 21.49 512 48 512h288c26.51 0 48-21.49 48-48V160h-127.1C238.3 160 224 145.7 224 128z" /></svg>
              <a href="fichier.pdf" id="fileRessourceOutput" download>{fileRessource}</a>
            </div>
            <div className="inline-block mr-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 640 512"><path d="M172.5 131.1C228.1 75.51 320.5 75.51 376.1 131.1C426.1 181.1 433.5 260.8 392.4 318.3L391.3 319.9C381 334.2 361 337.6 346.7 327.3C332.3 317 328.9 297 339.2 282.7L340.3 281.1C363.2 249 359.6 205.1 331.7 177.2C300.3 145.8 249.2 145.8 217.7 177.2L105.5 289.5C73.99 320.1 73.99 372 105.5 403.5C133.3 431.4 177.3 435 209.3 412.1L210.9 410.1C225.3 400.7 245.3 404 255.5 418.4C265.8 432.8 262.5 452.8 248.1 463.1L246.5 464.2C188.1 505.3 110.2 498.7 60.21 448.8C3.741 392.3 3.741 300.7 60.21 244.3L172.5 131.1zM467.5 380C411 436.5 319.5 436.5 263 380C213 330 206.5 251.2 247.6 193.7L248.7 192.1C258.1 177.8 278.1 174.4 293.3 184.7C307.7 194.1 311.1 214.1 300.8 229.3L299.7 230.9C276.8 262.1 280.4 306.9 308.3 334.8C339.7 366.2 390.8 366.2 422.3 334.8L534.5 222.5C566 191 566 139.1 534.5 108.5C506.7 80.63 462.7 76.99 430.7 99.9L429.1 101C414.7 111.3 394.7 107.1 384.5 93.58C374.2 79.2 377.5 59.21 391.9 48.94L393.5 47.82C451 6.731 529.8 13.25 579.8 63.24C636.3 119.7 636.3 211.3 579.8 267.7L467.5 380z" /></svg>
              <a href="">{lienRessource}</a>
            </div>
          </div>

          <div className="flex justify-between p-2.5 bottom-0">
            <svg className="inline-block cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 640 512"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" /></svg>
            <svg className="inline-block cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" /></svg>
            <svg className="inline-block cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" /></svg>
          </div>

        </div>

      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const rechercheCategorie = await prisma.categorie.findMany({});
  return {
    props: {
      categories: JSONBig.parse(JSONBig.stringify(rechercheCategorie)),

    },
  };
}