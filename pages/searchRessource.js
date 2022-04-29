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

      <div className='flex h-fit portrait:w-text-lg justify-center bg-gray-100'>
        <div className='bg-custom-blue/50 text-3xl mt-3 mb-3 justify-center items-center rounded-3xl shadow-xl portrait:w-min'>
          <h1 className="border-gray-200 border-solid border-0 box-border font-bold text-4xl leading-none m-auto py-3.5 text-center not-italic portrait:w-fit">Consultez les ressources de la communauté</h1>
          <div className="items-center">
            <Formulaire ressource={ressources} />
          </div>
        </div>

      </div>

      <div id="cards" className='grid grid-cols-1 lg:grid-cols-2 gap-3 justify-center bg-gray-100'>
        {ressources?.map((ressource, i) => (
          <Card ressource={ressource} key={i} />
        ))}
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
  return {
    props: {
      ressources: JSONBig.parse(JSONBig.stringify(rechercheRessource)),
    },
  };
}


export default searchRessource;