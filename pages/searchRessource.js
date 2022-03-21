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

      <div class='flex h-fit items-center justify-center bg-gray-100'>
        <div class='justify-center text-justify text-4xl items-center align-center'>
          <h1 class="font-extrabold">Consultez les ressources de la communauté</h1>
          <div class="flex justify-center">
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


