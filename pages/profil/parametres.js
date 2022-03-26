import React from 'react'
import Head from 'next/head'
import SideBar from '../../components/SideBar'

const parametres = () => {
    return (
        <div class="flex">
            <Head>
                <title>Paramètres</title>
                <meta name="description" content="Paramètres" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
        </div>
    )
}

export default parametres