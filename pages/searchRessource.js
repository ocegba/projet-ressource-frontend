import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import JSONBig from 'json-bigint';
import prisma from '../prisma/prisma';
import axios from "axios";

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

function searchRessource(props) {
  const ressources = props.ressources;
  const categorie = props.categorie;

  const [searchParam] = useState(["titreRessource"])
  const [selectionnerCategorie, setSelectionnerCat] = useState(["Toutes"])
  const [selectionnerRelations, setSelectionnerRel] = useState("")
  const [selectionnerAct, setSelectionnerAct] = useState("")
  const [value3, setValue3] = useState("")

  ////////// fct ////////////////
  async function addNewComment() {
    const {
      addCommentaire
    } = Comment.current;
    const idRessource = data.idRessource;
    const isCommentaireSupprime = false;
    const idCompte = 24;
    const contenuCommentaire = addCommentaire.value;
    const dateCommentaire = (new Date(Date.now())).toISOString();
    await axios.post("../api/commentaires/addnewComment", {
      contenuCommentaire,
      dateCommentaire,
      idRessource,
      isCommentaireSupprime,
      idCompte
    })
    window.location.reload();
  }

  async function addParticiper(data) {
    const idRessource = data.idRessource;
    const idCompte = 24;
    const libelleAction = "participer";
    await axios.post("../api/actions/addParticiper", {
      idRessource,
      idCompte,
      libelleAction
    })
    alert("Je participe !")
  };

  async function addFavoris(data) {
    const idRessource = data.idRessource;
    const idCompte = 24;
    const libelleAction = "favoris";
    await axios.post("../api/actions/addFavoris", {
      idRessource,
      idCompte,
      libelleAction,
    })
    alert("Je met en favoris !")
  };

  function search(items) {

    return items.filter((item) => {
      if ((item.idCategorie == selectionnerCategorie) && (item.typeRelationRessource == selectionnerRelations || selectionnerRelations == "") && (item.typeRessource == selectionnerAct || selectionnerAct == "")) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(value3.toLowerCase()) > -1
          );
        })
      }
      else if ((selectionnerCategorie == "Toutes") && (item.typeRelationRessource == selectionnerRelations || selectionnerRelations == "") && (item.typeRessource == selectionnerAct || selectionnerAct == "")) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(value3.toLowerCase()) > -1
          );
        })
      }
    });
  }

  const rechercheRessource = search(ressources).map((item) => (<Card className='border-black' title={item.titreRessource} subTitle={(categorie[item.idCategorie - 1]).libelleCategorie}>
    <p className="text-lg">{item.typeRessource}</p>
    <p className="text-lg">{item.typeRelationRessource}</p>
    <div className="box-border flex justify-between pt-2">
      <svg onClick={() => addParticiper(item)} className="inline-block cursor-pointer hover:fill-blue-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 640 512"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" /></svg>
      <svg onClick={() => setOpen(!open)} className="inline-block cursor-pointer hover:fill-green-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" /></svg>
      <svg onClick={() => addFavoris(item)} className="inline-block cursor-pointer  hover:fill-yellow-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" /></svg>
    </div>
  </Card >))

  return (
    <div>
      <Head>
        <title>Rechercher une ressource</title>
        <meta titreRessource="typeRessource" content="Rechercher une ressource" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='border-gray-200 border-solid border-0 box-border flex flex-col items-center justify-center font-bold text-6xl leading-none m-0 text-center align-middle pt-4'>
        Rechercher une ressource
      </div>
      <div className="rounded-lg box-border p-8">
        <div className="grid grid-cols-4  justify-items-center bg-gray-50 border-solid border-r-0 border-l-0 border-t border-b box-border font-bold p-4 justify-between">
          <div>
            <select className="appearance-none bg-white rounded-md border-solid border box-border text-base m-0 p-3 hover:border-indigo-500" style={{width:250}}
              onChange={(e) => setSelectionnerCat(e.target.value)}>
              <option value="Toutes">Toutes les catégories</option>
              {categorie.map((x) => <option value={x.idCategorie}>{x.libelleCategorie}</option>)}
            </select>
          </div>
          <div>
            <select className="appearance-none bg-white rounded-md border-solid border box-border text-base m-0 p-3 hover:border-indigo-500" style={{width:250}}
              onChange={(e) => setSelectionnerRel(e.target.value)}>
              <option value="">Tous types de relations</option>
              <option value="Tous">Tous</option>
              <option value="Soi">Soi</option>
              <option value="Conjoints">Conjoints</option>
              <option value="Amis et communautés">Amis et communautés</option>
              <option value="Famille">Famille</option>
              <option value="Professionelle">Professionelle</option>
              <option value="Inconnus">Inconnus</option>
            </select>
          </div>
          <div>
            <select className="appearance-none bg-white rounded-md border-solid border box-border text-base m-0 p-3 hover:border-indigo-500" style={{width:250}}
              onChange={(e) => setSelectionnerAct(e.target.value)}>
              <option value="">Tous types de ressources</option>
              <option value="Activité / Jeu à réaliser">Activité / Jeu à réaliser</option>
              <option value="Article">Article</option>
              <option value="Carte défi">Carte défi</option>
              <option value="Cours au format PDF">Cours au format PDF</option>
              <option value="Exercice / Atelier">Exercice / Atelier</option>
              <option value="Fiche de lecture">Fiche de lecture</option>
              <option value="Jeu en ligne">Jeu en ligne</option>
              <option value="Vidéo">Vidéo</option>
              </select>

          </div>
          <div>
            <InputText value={value3} onChange={(e) => setValue3(e.target.value)} placeholder="Rechercher" />
          </div>

        </div>
      </div>
      <div className="col-12 md:col-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          {rechercheRessource}
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps() {
  const rechercheRessource = await prisma.ressource.findMany(
    {
      where: {
        validerRessource: true,
      }
    }
  );
  const rechercheCategorie = await prisma.categorie.findMany({});
  return {
    props: {
      ressources: JSONBig.parse(JSONBig.stringify(rechercheRessource)),
      categorie: JSONBig.parse(JSONBig.stringify(rechercheCategorie)),

    },
  };
}


export default searchRessource;