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
    <div class="flex">
      <Head>
        <title>Administrer</title>
        <meta name="description" content="Administrer" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar />

      <Tabs nomElement1="Ressources" element1={
        <div>
          <p class="py-3 px-5 text-xl" >Vous pouvez créer, modifier, suspendre ou supprimer une ressource</p>

          <a class="py-3 px-5" href="/createRessource">
            <input type="submit" href="/createRessource" class="cursor-pointer border-2 bg-white-600 hover:bg-gray-300 rounded-lg
         border-solid font-bold text-base leading-normal  py-3 px-5 uppercase" value="Créer une ressource"></input>
          </a>
          {ressources?.map((ressource, i) => <RowsRessourcesAdmin ressource={ressource} key={i} />)}
        </div>}

        nomElement2="Catégories" element2={
          <div>
            <div class="grid grid-cols-3 gap-2 p-4">
              <button class="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Ajouter une catégorie</button>
              <button class="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Editer une catégorie</button>
              <button class="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-base leading-normal py-3 px-5 uppercase no-underline">Supprimer une catégorie</button>
            </div>

            <div class="grid grid-cols-5 gap-3">
              {categories?.map((categorie, i) => <li class="shadow-md hover:bg-gray-200 border-gray-200 rounded border-solid border-0 box-border block font-bold text-xs leading-normal py-3 px-5 uppercase no-underline">
                {categorie.categorieRessource}
              </li>)}
            </div>
          </div>
        }
        nomElement3="Comptes utilisateurs" element3={
          <div>
            <p class="py-3 px-5 text-xl">Activer ou désactiver un compte</p>
          {comptes?.map((compte, i) => <RowsCompteAdmin compte={compte} key={i} />)}
          </div>
        }
      nomElement4="Statistiques"

      />
    </div>
  )
}

export async function getServerSideProps() {
  const rechercheRessource = await prisma.ressource.findMany();
  const rechercheCategorie = await prisma.ressource.findMany({
    select: {
      categorieRessource: true,
    },
    distinct: ['categorieRessource'],

  });
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