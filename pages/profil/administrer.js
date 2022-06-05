import React, { useState, useRef } from 'react'
import Head from 'next/head'
import SideBar from '../../components/SideBar'
import { Tabs } from '../../components/Tabs'
import { RowsCompteAdmin, RowsRessourcesAdmin, PieChartDemo } from '../../components/Rows';
import JSONBig from 'json-bigint';
import prisma from '../../prisma/prisma'
import axios from "axios";
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';

function administrer(props) {
  const ressources = props.ressources;
  const categories = props.categories;
  const comptes = props.comptes;
  const categoriesLib = props.categoriesLib;
  const participations = props.participations;
  const favoris = props.favoris;

  const formAddRef = useRef();
  const formDelRef = useRef();
  const formEditRef = useRef();

  const [open, setOpen] = useState("");
  const [openDel, setOpenDel] = useState("");
  const [openEdit, setOpenEdit] = useState("");

  const relations = [{ name: "Tous", key: "relationstous" },
  { name: "Soi", key: "relationssoi" },
  { name: "Conjoints", key: "relationsconjoints" },
  { name: "Famille", key: "relationsfamille" },
  { name: "Professionnelle : collègues, collaborateurs et managers", key: "relationspro" },
  { name: "Amis et communautés", key: "relationsamis" },
  { name: "Inconnus", key: "relationsinconnus" }]
  const [searchParam] = useState(["titreRessource"])
  const [selectionnerCategorie, setSelectionnerCat] = useState(["Toutes"])
  const [selectionnerRelations, setSelectionnerRel] = useState(relations.slice(0, 1));
  const [selectionnerAct, setSelectionnerAct] = useState("")
  const [value, setValue] = useState("")

  async function addCategorie() {
    const {
      addCategorieAdmin,
    } = formAddRef.current;
    const libelleCategorie = addCategorieAdmin.value;
    await axios.post("../api/actions/addCategorieAdmin", {
      libelleCategorie,

    });
    window.location.reload();
  }

  async function deleteCategorie() {
    const {
      deleteCategorieAdmin,
    } = formDelRef.current;
    const libelleCategorie = deleteCategorieAdmin.value;
    await axios.post("../api/actions/deleteCategorieAdmin", {
      libelleCategorie: libelleCategorie,
    });
    window.location.reload();
  }

  async function updateCategorie() {
    const {
      newCat,
      formerCat,
    } = formEditRef.current;
    const libelleCategorie = newCat.value;
    const formerCategorie = formerCat.value;
    await axios.put("../api/actions/updateCategorie", {
      libelleCategorie,
      formerCategorie,
    });
    alert("Informations modifiées ! ")
  }

  function voirRelations(item) {
    if (item.relationstous) {
      return "Tous"
    }
    else if (item.relationssoi) {
      return "Soi"
    }
    else if (item.relationsconjoints) {
      return "Conjoints"
    }
    else if (item.relationsfamille) {
      return "Famille"
    }
    else if (item.relationspro) {
      return "Professionnelle : collègues, collaborateurs et managers"
    }
    else if (item.relationsamis) {
      return "Amis et communautés"
    }
    else if (item.relationsinconnus) {
      return "Inconnus"
    }
  }

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

  function search(items) {
    return items.filter((item) => {
      if ((item.idCategorie == selectionnerCategorie) && ((voirRelations(item) == selectionnerRelations.map((x) => x.name)) || selectionnerRelations == "") && (item.typeRessource == selectionnerAct || selectionnerAct == "")) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(value.toLowerCase()) > -1
          );
        })
      }
      else if ((selectionnerCategorie == "Toutes") && ((voirRelations(item) == selectionnerRelations.map((x) => x.name)) || selectionnerRelations == "") && (item.typeRessource == selectionnerAct || selectionnerAct == "")) {
        return searchParam.some((newItem) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(value.toLowerCase()) > -1
          );
        })
      }
    });
  }

  console.log(participations)

  return (
    <div className="flex">
      <Head>
        <title>Administrer</title>
        <meta name="description" content="Administrer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar />

      <Tabs nomElement1="Ressources" element1={
        <div>
          <p className="py-3 px-5 text-xl" >Vous pouvez créer, modifier, suspendre ou supprimer une ressource qui a été publiée</p>

          <div className="py-3 px-5" href="/createRessource">
            <input type="submit" href="/createRessource" className="cursor-pointer border-2 bg-white-600 hover:bg-gray-300 rounded-lg
         border-solid font-bold text-base leading-normal  py-3 px-5 uppercase" value="Créer une ressource"></input>
          </div>

          <div className="rounded-lg box-border p-8">
            <div className="portrait:grid-cols-1 grid grid-cols-4  justify-items-center bg-gray-50 border-solid border-r-0 border-l-0 border-t border-b box-border font-bold p-4 justify-between">
              <div>
                <select className="appearance-none bg-white rounded-md border-solid border box-border text-base m-0 p-3 hover:border-indigo-500" style={{ width: 250 }}
                  onChange={(e) => setSelectionnerCat(e.target.value)}>
                  <option value="Toutes">Toutes les catégories</option>
                  {categories.map((x) => <option value={x.idCategorie}>{x.libelleCategorie}</option>)}
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

          {search(ressources).map((ressource, i) => <RowsRessourcesAdmin ressource={ressource} categorie={categories} key={i} />)}
        </div>}

        nomElement2="Catégories" element2={
          <div>
            <div className="grid grid-cols-3 gap-2 p-4">
              <button onClick={() => setOpen(!open) && setOpenDel(openDel) && setOpenEdit(openEdit)} className="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Ajouter une catégorie</button>
              <button onClick={() => setOpenEdit(!openEdit) && setOpenDel(openDel) && setOpen(open)} className="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Editer une catégorie</button>
              <button onClick={() => setOpenDel(!openDel) && setOpen(open) && setOpenEdit(openEdit)} className="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Supprimer une catégorie</button>
            </div>

            {!(open || openDel || openEdit) ? (<div className="grid grid-cols-5 gap-3">
              {categories?.map((categorie, i) => <li className="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-xs leading-normal py-3 px-5 uppercase no-underline">
                {categorie.libelleCategorie}
              </li>)}
            </div>) : false}

            {open ? (<div className="">
              <p className="border-gray-200 border-solid border-0 box-border text-xl leading-7 m-0 py-3 px-5">Ajouter une nouvelle catégorie :</p>
              <form ref={formAddRef}>
                <input className="border-black border-solid border-2 box-border text-xl m-0 py-3 px-5" name="addCategorieAdmin" id="libelleCategorie" />
                <button className="mt-2 mb-2 bg-custom-blue hover:bg-custom-blue-200 text-white font-bold text-xl w-fit pr-1 pl-1 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" onClick={() => addCategorie()}>Valider</button>
              </form>
            </div>) : false}

            {openEdit ? (<div>
              <p className="border-gray-200 border-solid border-0 box-border text-xl leading-7 m-0 py-3 px-5">Editer une nouvelle catégorie :</p>
              <form className="grid grid-cols-2 gap-1" ref={formEditRef}>
                <select className="rounded-lg" name="formerCat" id="idCategorie">
                  {categories?.map((categorie) => <option value={categorie.libelleCategorie}>{categorie.libelleCategorie}</option>)}
                </select>
                <input name="newCat" className="rounded-lg ml-2 w-full" placeholder='Editer la catégorie sélectionnée'></input>
                <button className="col-span-2 mt-2 mb-2 bg-custom-blue hover:bg-custom-blue-200 text-white font-bold text-xl w-fit pr-1 pl-1 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" onClick={() => updateCategorie()}>Valider</button>
              </form>
            </div>) : false}

            {openDel ? (<div className="">
              <p className="border-gray-200 border-solid border-0 box-border text-xl leading-7 m-0 py-3 px-5">Supprimer une catégorie :</p>
              <form ref={formDelRef}>
                <select className="w-fit" name="deleteCategorieAdmin" id="idCategorie">
                  {categories?.map((categorie) => <option value={categorie.libelleCategorie}>{categorie.libelleCategorie}</option>)}
                </select>
                <button className="mt-2 mb-2 bg-custom-blue hover:bg-custom-blue-200 text-white font-bold text-xl w-fit pr-1 pl-1 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" onClick={() => deleteCategorie()}>Valider</button>
              </form>
            </div>) : false}
          </div>
        }
        nomElement3="Comptes utilisateurs" element3={
          <div>
            <p className="py-3 px-5 text-xl">Activer ou désactiver un compte</p>
            {comptes?.map((compte, i) => <RowsCompteAdmin compte={compte} key={i} />)}
          </div>
        }

        nomElement4="Statistiques" element4={
        <div>
              <PieChartDemo labels={categoriesLib.map(function (x) { return x.libelleCategorie })}
                data={[
                  {
                    data: categoriesLib.map(function (x) { return parseInt((x.ressource).length) }),
                    backgroundColor: [
                      '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
                    ],
                    hoverBackgroundColor: [
                      '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'
                    ]
                  }
                ]}
                title="Nombre de ressources en fonction des catégories"
              />
        </div> 
            }
      />
    </div>
  )
}

export async function getServerSideProps() {
  const rechercheRessource = await prisma.ressource.findMany({
    where: {
      validerRessource: true,
    }
  });

  const rechercheCategorie = await prisma.categorie.findMany({});
  const rechercheComptes = await prisma.compte.findMany();
  const rechercheCategorieLib = await prisma.categorie.findMany({
    select: {
      libelleCategorie: true,
      ressource: true
    }

  });
  const Part = await prisma.action.findMany({
    where: {
      libelleAction: "participer"
    }, select: {
      idRessource: true,
    }
  });

  const recherchePart = await prisma.action.findMany({
    where: {
      libelleAction: "participer"
    }, select: {
      idRessource: true,
    }
  });

  const rechercheFav = await prisma.action.findMany({
    where: {
      libelleAction: "favoris"
    }, select: {
      idRessource: true,
    }
  });
  return {
    props: {
      ressources: JSONBig.parse(JSONBig.stringify(rechercheRessource)),
      categories: JSONBig.parse(JSONBig.stringify(rechercheCategorie)),
      comptes: JSONBig.parse(JSONBig.stringify(rechercheComptes)),
      categoriesLib: JSONBig.parse(JSONBig.stringify(rechercheCategorieLib)),
      participations: JSONBig.parse(JSONBig.stringify(recherchePart)),
      favoris: JSONBig.parse(JSONBig.stringify(rechercheFav)),
    },
  };
}

export default administrer