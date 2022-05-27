import React, { useState, useEffect, useRef, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'

import Head from 'next/head';
import JSONBig from 'json-bigint';
import prisma from '../prisma/prisma';
import axios from "axios";

import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import Link from 'next/link';
import { Checkbox } from 'primereact/checkbox';

function searchRessource(props) {
  const ressources = props.ressources;
  const categorie = props.categorie;
  const Comment = useRef();

  const relations = [{ name: "Tous", key: "relationstous" },
  { name: "Soi", key: "relationssoi" },
  { name: "Conjoints", key: "relationsconjoints" },
  { name: "Famille", key: "relationsfamille" },
  { name: "Professionnelle : collègues, collaborateurs et managers", key: "relationspro" },
  { name: "Amis et communautés", key: "relationsamis" },
  { name: "Inconnus", key: "relationsinconnus" }]

  const [searchParam] = useState(["titreRessource"])
  const [selectionnerCategorie, setSelectionnerCat] = useState(["Toutes"])
  const [selectionnerRelations, setSelectionnerRel] = useState(relations.slice(0,0));
  const [selectionnerAct, setSelectionnerAct] = useState("")
  const [value, setValue] = useState("")
  const [value2, setValue2] = useState("")
  let [isOpen, setIsOpen] = useState(false)
  let [isOpenPart, setIsOpenPart] = useState(false)
  let [isOpenFav, setIsOpenFav] = useState(false)


  ////////// fct ////////////////
  async function addNewComment(data) {
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
    openModal("Part")
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
    openModal("Fav")
  };

  const onRelationChange = (e) => {
    let _setSelectionnerRel = [...selectionnerRelations];

    if (e.checked) {
      _setSelectionnerRel.push(e.value);
    }
    else {
      for (let i = 0; i < _setSelectionnerRel.length; i++) {
        const selectedCategory = _setSelectionnerRel[i];

        if (selectedCategory.key === e.value.key) {
          _setSelectionnerRel.splice(i, 1);
          break;
        }
      }
    }
    setSelectionnerRel(_setSelectionnerRel);
  }

  function voirRelations(obj) {
    let array = []

    for (const item in obj) {
      var id = obj[item]
      if (id === true && item.includes("relations")) {
        array.push(item)
      }
    }

    if (typeof array !== 'undefined' && array.length > 0) {
      array.forEach(function (item, i) {
        if (item == "relationstous") {
          array[i] = "Tous";
        }
        if (item == "relationssoi") {
          array[i] = "Soi";
        }
        if (item == "relationsconjoints") {
          array[i] = "Conjoints";
        }
        if (item == "relationsfamille") {
          array[i] = "Famille";
        }
        if (item == "relationspro") {
          array[i] = "Professionnelle : collègues, collaborateurs et managers";
        }
        if (item == "relationsamis") {
          array[i] = "Amis et communautés";
        }
        if (item == "relationsinconnus") {
          array[i] = "Inconnus";
        }
      })
      return array
    }

  }

  function search(items) {
    return items.filter((item) => {
      for (var i = 0; i < [voirRelations(item)].length; i++) {
        if ((item.idCategorie == selectionnerCategorie) && ((voirRelations(item)[i] == selectionnerRelations[i]?.name) || selectionnerRelations == "") && (item.typeRessource == selectionnerAct || selectionnerAct == "")) {
          return searchParam.some((newItem) => {
            return (
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(value.toLowerCase()) > -1
            );
          })
        }
        else if ((selectionnerCategorie == "Toutes") && ((voirRelations(item)[i] == selectionnerRelations[i]?.name) || selectionnerRelations == "") && (item.typeRessource == selectionnerAct || selectionnerAct == "")) {
          return searchParam.some((newItem) => {
            return (
              item[newItem]
                .toString()
                .toLowerCase()
                .indexOf(value.toLowerCase()) > -1
            );
          })
        }
      }
    });
  }

  const listRessources = search(ressources).map((item) => (<Card className='border-black' title={item.titreRessource} subTitle={(categorie[item.idCategorie - 1]).libelleCategorie}>
    <p className="text-lg">{item.typeRessource}</p>
    {voirRelations(item).map(function (x) {
      return (<p className="text-lg">{x}<br /></p>)
    })}
    <div className="box-border flex justify-between pt-2">
      <Link href={{
        pathname: `/post/[id]`,
        query: {
          id: item.idRessource,
          title: item.titreRessource,
          idCategorie: (categorie[item.idCategorie - 1]).libelleCategorie,
          typeRessource: item.typeRessource,
          relationstous: item.relationstous,
          relationssoi: item.relationssoi,
          relationsconjoints: item.relationsconjoints,
          relationsfamille: item.relationsfamille,
          relationspro: item.relationspro,
          relationsamis: item.relationsamis,
          relationsinconnus: item.relationsinconnus,
          localisationRessource: item.localisationRessource,
          lienRessource: item.lienRessource,
          fileRessource: item.fileRessource,
          storyRessource: item.storyRessource,
          dateRessource: item.dateRessource
        }
      }} as={`/post/${item.idRessource}`}>
        <svg className="inline-block cursor-pointer hover:fill-blue-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 640 512"><path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" /></svg>
      </Link>
      <svg onClick={() => addParticiper(item)} className="inline-block cursor-pointer hover:fill-blue-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 640 512"><path d="M224 256c70.7 0 128-57.31 128-128S294.7 0 224 0C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3C0 496.5 15.52 512 34.66 512h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304zM616 200h-48v-48C568 138.8 557.3 128 544 128s-24 10.75-24 24v48h-48C458.8 200 448 210.8 448 224s10.75 24 24 24h48v48C520 309.3 530.8 320 544 320s24-10.75 24-24v-48h48C629.3 248 640 237.3 640 224S629.3 200 616 200z" /></svg>
      <svg onClick={() => { openModal("Norm"); setValue2(item); }} className="inline-block cursor-pointer hover:fill-green-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 512 512"><path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" /></svg>
      <svg onClick={() => addFavoris(item)} className="inline-block cursor-pointer  hover:fill-yellow-500" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 576 512"><path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" /></svg>
    </div>
  </Card >))


  function closeModal(type) {
    if (type == "Norm") {
      setIsOpen(false)
    } else if (type == "Part") {
      setIsOpenPart(false)
    } else if (type == "Fav") {
      setIsOpenFav(false)
    }
  }

  function openModal(type) {
    if (type == "Norm") {
      setIsOpen(true)
    } else if (type == "Part") {
      setIsOpenPart(true)
    } else if (type == "Fav") {
      setIsOpenFav(true)
    }
  }

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
        <div className="portrait:grid-cols-1 grid grid-cols-4  justify-items-center bg-gray-50 border-solid border-r-0 border-l-0 border-t border-b box-border font-bold p-4 justify-between">
          <div>
            <select className="appearance-none bg-white rounded-md border-solid border box-border text-base m-0 p-3 hover:border-indigo-500" style={{ width: 250 }}
              onChange={(e) => setSelectionnerCat(e.target.value)}>
              <option value="Toutes">Toutes les catégories</option>
              {categorie.map((x) => <option value={x.idCategorie}>{x.libelleCategorie}</option>)}
            </select>
          </div>
          <div>
            {
              relations.map((relation, i) =>
                <p key={relation.key} className="field-checkbox">
                  <Checkbox inputId={relation.key} name="relation" value={relation} onChange={onRelationChange} checked={selectionnerRelations.some((item) => item.key === relation.key)} />
                  <label htmlFor={relation.key}>{relation.name}</label>
                </p>
              )
            }
          </div>
          <div>
            <select className="appearance-none bg-white rounded-md border-solid border box-border text-base m-0 p-3 hover:border-indigo-500" style={{ width: 250 }}
              onChange={(e) => setSelectionnerAct(e.target.value)}>
              {/* table pour recup les nvx types de ressources */}
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
            <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder="Rechercher" />
          </div>

        </div>
      </div>
      <div className="col-12 md:col-4 p-4">
        <div className=" portrait:grid-cols-1 grid grid-cols-4 gap-4">
          {listRessources}
          <Transition appear show={isOpenPart} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeModal("Part")}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Participation envoyée
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Vous souhaitez ou partcipez à cette ressource !
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={() => closeModal("Part")}
                        >
                          Compris, Merci!
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Transition appear show={isOpenFav} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeModal("Fav")}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Ajout aux favoris
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Vous avez ajouté cette ressource aux favoris !
                        </p>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-900 hover:bg-yellow-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2"
                          onClick={() => closeModal("Fav")}
                        >
                          Compris, Merci!
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => closeModal("Norm")}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center ">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h2"
                        className="text-3xl font-medium leading-6 text-gray-900"
                      >
                        Commentaires
                      </Dialog.Title>
                      <div className="mt-2">
                        <div>
                          <form ref={Comment}>
                            <textarea className="border-0 rounded-2xl resize-y	font-medium shadow-xl"
                              id="contenuCommentaire" maxLength="70" type="text" cols="30"
                              name="addCommentaire"
                            />
                            <div className="mt-4">

                              <button
                                type="button"
                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={() => { closeModal("Norm"); addNewComment(value2); }}
                              >
                                Commenter
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>


                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>

    </div>
  )
}

export async function getServerSideProps() {
  const listRessourcess = await prisma.ressource.findMany(
    {
      where: {
        validerRessource: true,
      }
    }
  );
  const rechercheCategorie = await prisma.categorie.findMany();
  return {
    props: {
      ressources: JSONBig.parse(JSONBig.stringify(listRessourcess)),
      categorie: JSONBig.parse(JSONBig.stringify(rechercheCategorie)),
    },
  };
}


export default searchRessource;