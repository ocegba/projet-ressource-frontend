import React, { useState, useRef } from 'react'
import Head from 'next/head'
import SideBar from '../../components/SideBar'
import { Tabs } from '../../components/Tabs'
import { RowsCompteAdmin, RowsRessourcesAdmin } from '../../components/Rows';
import JSONBig from 'json-bigint';
import prisma from '../../prisma/prisma'
import axios from "axios";

function administrer(props) {
  const ressources = props.ressources;
  const categories = props.categories;
  const comptes = props.comptes;

  const formAddRef = useRef();
  const formDelRef = useRef();
  const formEditRef = useRef();

  const [open, setOpen] = useState("");
  const [openDel, setOpenDel] = useState("");
  const [openEdit, setOpenEdit] = useState("");

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

          <a className="py-3 px-5" href="/createRessource">
            <input type="submit" href="/createRessource" className="cursor-pointer border-2 bg-white-600 hover:bg-gray-300 rounded-lg
         border-solid font-bold text-base leading-normal  py-3 px-5 uppercase" value="Créer une ressource"></input>
          </a>
          {ressources?.map((ressource, i) => <RowsRessourcesAdmin ressource={ressource} categorie={categories} key={i} />)}
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
        nomElement4="Statistiques"

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

  return {
    props: {
      ressources: JSONBig.parse(JSONBig.stringify(rechercheRessource)),
      categories: JSONBig.parse(JSONBig.stringify(rechercheCategorie)),
      comptes: JSONBig.parse(JSONBig.stringify(rechercheComptes)),
    },
  };
}

export default administrer