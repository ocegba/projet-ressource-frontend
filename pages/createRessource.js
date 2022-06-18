import Head from 'next/head'
import React, { useEffect, useRef, useState } from "react"
import JSONBig from 'json-bigint';
import prisma from '../prisma/prisma'
import axios from "axios";

import { Dropdown } from 'primereact/dropdown';
import { Card } from 'primereact/card';
import Link from 'next/link';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Checkbox } from 'primereact/checkbox';

export default function createRessource(props) {
  const [disable, setDisable] = useState(false);

  const relations = [{ name: "Tous", key: "relationstous" },
  { name: "Soi", key: "relationssoi" },
  { name: "Conjoints", key: "relationsconjoints" },
  { name: "Famille", key: "relationsfamille" },
  { name: "Professionnelle : collègues, collaborateurs et managers", key: "relationspro" },
  { name: "Amis et communautés", key: "relationsamis" },
  { name: "Inconnus", key: "relationsinconnus" }]

  const options1 = [{ name: 'Activité / Jeu à réaliser', value: 'Activité / Jeu à réaliser' },
  { name: 'Article', value: 'Article' },
  { name: 'Carte défi', value: 'Carte défi' },
  { name: 'Cours au format PDF', value: 'Cours au format PDF' },
  { name: 'Exercice / Atelier', value: 'Exercice / Atelier' },
  { name: 'Fiche de lecture', value: 'Fiche de lecture' },
  { name: 'Jeu', value: 'Jeu en ligne' },
  { name: 'Vidéo', value: 'Vidéo' }]

  const [titreRessource, setTitreRessource] = useState('')
  const [categorie, setCategorieRessource] = useState('')
  const [nomcategorie, setNomCategorieRessource] = useState('')

  const [typeRessource1, setTypeRessource] = useState(null)
  const [typeRelationRessource1, setRelationRessource] = useState(relations.slice(0, 1));
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
      addRessourcesStoryRessource,
      addRessourcesFileRessource,
      addRessourcesLienRessource,
      addRessourcesLocalisationRessource,
    } = formRef.current;
    const titreRessource = addRessourcesTitreRessource.value;
    const idCategorie = addRessourcesCategorieRessource.value;
    const typeRessource = typeRessource1;
    const storyRessource = addRessourcesStoryRessource.value;
    const fileRessource = addRessourcesFileRessource.value;
    const lienRessource = addRessourcesLienRessource.value;
    const localisationRessource = addRessourcesLocalisationRessource.value;
    const dateRessource = (new Date(Date.now())).toISOString();

    const relationstous = typeRelationRessource1.some(item => (item.key) === "relationstous");
    const relationssoi = typeRelationRessource1.some(item => (item.key) === "relationssoi");
    const relationsconjoints = typeRelationRessource1.some(item => (item.key) === "relationsconjoints");
    const relationsfamille = typeRelationRessource1.some(item => (item.key) === "relationsfamille");
    const relationspro = typeRelationRessource1.some(item => (item.key) === "relationspro");
    const relationsamis = typeRelationRessource1.some(item => (item.key) === "relationsamis");
    const relationsinconnus = typeRelationRessource1.some(item => (item.key) === "relationsinconnus");

    await axios.post("/api/ressource/addRessource", {
      titreRessource,
      idCategorie: parseInt(idCategorie),
      typeRessource,
      storyRessource,
      fileRessource,
      lienRessource,
      localisationRessource,
      dateRessource,
      relationstous,
      relationssoi,
      relationsconjoints,
      relationsfamille,
      relationspro,
      relationsamis,
      relationsinconnus,

    });
    setDisable(false);
    alert("Votre ressource a bien été envoyé au modérateur")
    window.location.reload();
  }

  const onTypeRessource = (e) => {
    setTypeRessource(e.target.value);
  }

  const onRelationChange = (e) => {
    let _setRelationRessource = [...typeRelationRessource1];

    if (e.checked) {
      _setRelationRessource.push(e.value);
    }
    else {
      for (let i = 0; i < _setRelationRessource.length; i++) {
        const selectedCategory = _setRelationRessource[i];

        if (selectedCategory.key === e.value.key) {
          _setRelationRessource.splice(i, 1);
          break;
        }
      }
    }
    setRelationRessource(_setRelationRessource);
  }

  const categorieChange = (e) => {
    [setNomCategorieRessource(e.target.label)];
    [setCategorieRessource(e.target.value)];}
  
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
              required onChange={(e) => setTitreRessource(e.target.value)}
            />
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="categorieRessource">Catégorie :</label>
            <select className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
              required
              name="addRessourcesCategorieRessource"
              id="categorie"
              placeholder='Sélectionnez une catégorie'
              value={categorie} label={nomcategorie}
              onChange={categorieChange}>

              <option value="">Choisir une catégorie</option>
              {categories?.map((compte, i) => <option value={compte.idCategorie} label={compte.libelleCategorie} >{compte.libelleCategorie}</option>)}
            </select>
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="typesRessources">Types de ressources :</label>
            <Dropdown
              required
              name="addRessourcesTypeRessource"
              id="typesRessources"
              placeholder='Sélectionnez un type de ressource'
              options={options1}
              value={typeRessource1}
              onChange={onTypeRessource} optionLabel="name" editable />
          </div>

          <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
            <label className="text-xl" htmlFor="storyRessource">Texte :</label>
            <textarea className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
              required
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
            {
              relations.map((relation, i) =>
                <div key={relation.key} className="field-checkbox">
                  <Checkbox inputId={relation.key} name="relation" value={relation} onChange={onRelationChange} checked={typeRelationRessource1.some((item) => item.key === relation.key)} />
                  <label htmlFor={relation.key}>{relation.name}</label>
                </div>
              )
            }

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
          <Card className='border-black' title={titreRessource} subTitle={categorie}>
          <p className="text-lg">{typeRessource1}</p>
            {
              typeRelationRessource1.map((x) =>
                <p className="text-lg" id="typesRelationRessourceOutput">{x.name}<br /></p>
              )
            }
            <div className="box-border flex justify-between pt-2">
              <svg className="inline-block cursor-pointer hover:fill-blue-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 640 512"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" /></svg>
              <svg className="inline-block cursor-pointer hover:fill-green-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" /></svg>
              <svg className="inline-block cursor-pointer hover:fill-yellow-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" /></svg>
            </div>
          </Card>

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