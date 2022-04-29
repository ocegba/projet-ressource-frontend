import React from 'react'
import Head from 'next/head'
import SideBar from '../../components/SideBar'
import InfoUpdate from '../../components/InfoUpdate'
import MdpUpdate from '../../components/MdpUpdate'
import DeleteCompte from '../../components/DeleteCompte'

const parametres = () => {
    return (
        <div className="flex">
            <Head>
                <title>Paramètres</title>
                <meta name="description" content="Paramètres" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <div className="grid px-4 pt-6 xl:gap-4">
                <h1 className="flex align-justify font-extrabold text-4xl">Paramètres</h1>
                <div className="bg-custom-blue/50 rounded-3xl flex-1 justify-center	items-center p-8 m-4 h-fit">
                    <h3 className="font-semibold text-xl pr-4 leading-7 m-0 text-gray-900 sm:text-2xl sm:leading-8">Informations générales</h3>
                    <InfoUpdate />
                </div>
                <div className="grid lg:grid-cols-2 portait:grid-cols-1">
                    <div className="bg-custom-blue/50 rounded-3xl flex-1 justify-center	items-center p-8 m-4 h-fit w-fit">
                        <h3 className="font-semibold text-xl pr-8 leading-7 m-0 text-gray-900 sm:text-2xl sm:leading-8 w-fit">Changement de mot de passe</h3>
                        <MdpUpdate />

                    </div>
                    <div className="bg-custom-blue/50 rounded-3xl flex-1 justify-center	items-center p-8 m-4 h-fit w-fit">
                        <h3 className="font-semibold text-xl pr-8 leading-7 m-0 text-gray-900 sm:text-2xl sm:leading-8 w-fit">Supprimer son compte</h3>
                        <DeleteCompte />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default parametres;