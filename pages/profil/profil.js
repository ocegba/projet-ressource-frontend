import React from 'react'
import SideBar from '../../components/SideBar'
import Head from 'next/head'
import prisma from '../../prisma/prisma'
import JSONBig from 'json-bigint';
import { RowsCommentaires, RowsFavoris, RowsParticipate, RowsRessources } from '../../components/Rows';
import { Tabs } from '../../components/Tabs';

function profil(props) {
    const ressources = props.ressources;
    const commentaires = props.commentaires;
    return (
        <div className="flex">
            <Head>
                <title>Mon profil</title>
                <meta name="description" content="(Re)Sources relationnelles, un guide pour vos relations" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <Tabs nomElement1={"Mes ressources crées"} element1={
                <div>
                    <a href="/createRessource">
                    <input type="submit" href="/createRessource" className="cursor-pointer border-2 bg-white-600 hover:bg-gray-300 rounded-lg
                    border-solid font-bold text-base leading-normal py-3 px-5 uppercase" value="Créer une ressource"></input>

                </a>
                    {ressources?.map((ressource, i) => <RowsRessources ressource={ressource} key={i} />)}
                </div>

            }
                nomElement2={"Mes commentaires"} element2={commentaires?.map((commentaire, i) => <RowsCommentaires commentaire={commentaire} key={i} />)}
                nomElement3={"Mes participations"} element3={<RowsParticipate />}
                nomElement4={"Mes favoris"} element4={<RowsFavoris />}
            />
        </div>
    )
}

export async function getServerSideProps() {
    const rechercheRessource = await prisma.ressource.findMany({
        where: {
            idCompte: 24, //à modifier pck c'est nimp
        }
    });
    const rechercheCommentaire = await prisma.commentaire.findMany({
        where: {
            idCompte: 24, //à modifier pck c'est nimp
        }
    });
    return {
        props: {
            ressources: JSONBig.parse(JSONBig.stringify(rechercheRessource)),
            commentaires: JSONBig.parse(JSONBig.stringify(rechercheCommentaire)),
        },
    };
}


export default profil