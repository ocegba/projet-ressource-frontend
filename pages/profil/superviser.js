import React from 'react'
import Head from 'next/head'
import SideBar from '../../components/SideBar'
import { RowsCompteSuperAdmin } from '../../components/Rows'
import JSONBig from 'json-bigint'
import prisma from '../../prisma/prisma'

function Superviser(props){
    const comptes =props.comptes;
  return (
    <div className="flex">
            <Head>
                <title>Superviser</title>
                <meta name="description" content="Superviser" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <div className="p-6">
                <h1 className="p-4 text-3xl">Création de rôles</h1>
                    <p className="py-3 px-5 text-xl">Vous pouvez élever le rôle d'un utilisateur.</p>
            {
                comptes?.map((compte, i) => <RowsCompteSuperAdmin compte={compte} key={i}/>)
            }
            </div>
        </div>)
}

export async function getServerSideProps() {
    const rechercheCompte = await prisma.compte.findMany();

    return {
        props: {
            comptes: JSONBig.parse(JSONBig.stringify(rechercheCompte)),
        },
    };
}
export default Superviser;