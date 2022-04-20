import Formulaire, { returnDataForm } from '../components/Formulaire'
import Head from 'next/head'
import Card from '../components/Card';
import JSONBig from 'json-bigint';
import prisma from '../prisma/prisma'

function searchRessource(props) {
  const ressources = props.ressources;
  return (
    <div>
      <Head>
        <title>Rechercher une ressource</title>
        <meta name="description" content="Rechercher une ressource" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div class='flex h-fit justify-center bg-gray-100'>
        <div class='bg-custom-blue/50 text-3xl mt-3 mb-3 justify-center items-center rounded-3xl shadow-xl'>
          <h1 class="border-gray-200 border-solid border-0 box-border font-bold text-4xl leading-none m-auto py-3.5 text-center not-italic">Consultez les ressources de la communauté</h1>
          <div class="items-center">
            <Formulaire ressource={ressources} />
          </div>
        </div>

      </div>

      <div id="cards" class='grid grid-cols-1 lg:grid-cols-2 gap-3 justify-center bg-gray-100'>
        {ressources?.map((ressource, i) => (
          <Card ressource={ressource} key={i} />
        ))}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const rechercheRessource = await prisma.ressource.findMany();
  return {
    props: {
      ressources: JSONBig.parse(JSONBig.stringify(rechercheRessource)),
    },
  };
}


export default searchRessource;