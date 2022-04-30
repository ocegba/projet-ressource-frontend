import React from 'react'
import Head from 'next/head'
import SideBar from '../../components/SideBar'
import { Tabs } from '../../components/Tabs'
import { RowsCompteAdmin, RowsRessourcesAdmin } from '../../components/Rows';
import JSONBig from 'json-bigint';
import prisma from '../../prisma/prisma'

function administrer(props) {
  const ressources = props.ressources;
  const categories = props.categories;
  const comptes = props.comptes;
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
              <button className="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Ajouter une catégorie</button>
              <button className="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Editer une catégorie</button>
              <button className="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Supprimer une catégorie</button>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {categories?.map((categorie, i) => <li className="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-xs leading-normal py-3 px-5 uppercase no-underline">
                {categorie.libelleCategorie}
              </li>)}
            </div>
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