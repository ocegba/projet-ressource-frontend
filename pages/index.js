import Head from 'next/head'
import Image from 'next/image'
import logo from "../public/img/logo.gif"

export default function Home() {
  return (
    <div>
      <Head>
        <title>(Re)Sources relationnelles</title>
        <meta name="description" content="(Re)Sources relationnelles, un guide pour vos relations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>
          <div className="bg-cover relative w-auto h-[45vh] bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')` }}>
            <div className="absolute h-full w-full top-0 left-0 text-white flex items-center justify-center flex-col">
              <div>
                <h1 className='font-bold flex items-center text-center align-middle justify-center flex-col text-7xl'>(Re)Sources Relationnelles</h1>
                <p className='w-auto h-32 font-bold leading-7 flex items-center text-center justify-center flex-col m-auto text-3xl'>Proposer une plateforme autour de la qualité des liens relationnelles que nous pouvons tisser pour une meilleure qualité de vie</p>
              </div>
            </div>
          </div>
        </div>
        <div className="h-fit w-full flex justify-center bg-gray-200 grid grid-cols-2 portrait:grid-cols-1">
          <div className="flex-1 justify-center items-center p-12 pr-0">
            <Image className="border-gray-200 rounded-3xl border-solid border-0 box-border block h-auto max-w-full align-middle" src={logo} alt="loading..." width={230} height={230} />
            <h2 className="font-bold text-3xl leading-7">Chercher une ressource</h2>
            <p className="p-1 font-light text-2xl leading-7 flex items-center text-justify">Découvrez des activités qui sont proposées par notre communauté<br /><br />
              Le principal enjeu du projet (RE)Sources Relationnelles est de proposer des ressources et outils pour créer, renforcer et enrichir les relations des citoyens.
              D’après la pyramide de Maslow, nos besoins d’êtres humains se structurent par priorités depuis nos besoins physiologiques jusqu’à nos besoins d’accomplissement. Au fil de cette pyramide, nous retrouvons des problématiques de recherche de sécurité, de sens, de développement personnel et, si l’on pousse la réflexion, à la recherche du bonheur.
              Bien souvent, l’un des leviers les plus importants dans ces thématiques reste la qualité de nos relations	 aux autres : parents, couple, famille, amis, collègues, etc. Chaque type de relation implique une proximité différente et donc de lignes de communications différentes.
            </p>
            <a className="rounded-xl h-16 font-bold text-3xl text-white bg-indigo-300 flex items-center justify-center hover:bg-gray-800" href="PROJET_CUBE_2020_INFRILAL1_MARCHEPUBLIC_CCTP_ANNEXE_EXEMPLE_RESSOURCES_RELATIONNELLES_v1_20200601.pdf" download>En savoir plus</a>
          </div>
          <div className="flex-1 justify-center items-center p-12 pr-0">
            <h2 className="font-bold text-3xl leading-7">Consulter les ressources de la communauté</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
