import FormulaireResFilter from '../components/FormulaireResFilter'
import Head from 'next/head'
import Table, { SelectColumnFilter, StatusPill } from "../components/Table";

const searchRessource = () => {
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
            <FormulaireResFilter />
          </div>

        </div>

        {/* SLECTIONNER LE TABLEAU */}
        <div>

        </div>
      </div>
    </div>
  )
}

export default searchRessource


