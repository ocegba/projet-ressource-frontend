import React from 'react'
import SideBar from '../../components/SideBar'
import Head from 'next/head'

const profil = () => {
    return (
        <div class="flex">
            <Head>
                <title>Mon profil</title>
                <meta name="description" content="(Re)Sources relationnelles, un guide pour vos relations" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <div class="w-full h-full p-4 m-8 overflow-y-auto space-y-10">
                <div>
                    <h3 class="font-medium leading-tight text-3xl mt-0 mb-2">Mes ressources crées</h3>
                </div>

                <div>
                    <h3 class="font-medium leading-tight text-3xl mt-0 mb-2">Je participe à ces ressources</h3>
                </div>

                <div>
                    <h3 class="font-medium leading-tight text-3xl mt-0 mb-2">Mes commentaires</h3>
                </div>

                <div>
                    <h3 class="font-medium leading-tight text-3xl mt-0 mb-2">Mes favoris</h3>
                </div>
            </div>
        </div>
    )
}

export default profil