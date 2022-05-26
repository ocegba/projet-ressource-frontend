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
    const categorie = props.categorie;
    const participations = props.participations;
    const favoris = props.favoris;

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
                    {ressources?.map((ressource, i) => <RowsRessources ressource={ressource} categorie={categorie} />)}
                </div>

            }
                nomElement2={"Mes commentaires"} element2={commentaires.map((commentaire, i) => <RowsCommentaires commentaire={commentaire} />)}

                nomElement3={"Mes participations"} element3={
                    participations.map((items) => {
                        return items.map((val) => {
                            return <RowsParticipate participations={val} />
                        }
                        )
                    })
                }
                nomElement4={"Mes favoris"} element4={
                    favoris.map((items) => {
                        return items.map((val) => {
                            return <RowsFavoris favoris={val} />
                        }
                        )
                    })
                }
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
    const rechercheCategorie = await prisma.categorie.findMany({});

    const recherchePart = await prisma.action.findMany({
        where: {
            idCompte: 24, //à modifier pck c'est nimp
            libelleAction: "participer"
        }, select: {
            idRessource: true,
        }

    });

    const rechercheFav = await prisma.action.findMany({
        where: {
            idCompte: 24, //à modifier pck c'est nimp
            libelleAction: "favoris"
        }, select: {
            idRessource: true,
        }
    });

    const rechercheParticipations = await Promise.all(recherchePart.map(
        async (val) => {
            return await prisma.ressource.findMany({
                where: {
                    idRessource: parseInt(val.idRessource)
                },
                select: {
                    idRessource: true,
                    titreRessource: true,
                    dateRessource: true
                }
            })
        }
    ));

    const rechercheFavoris = await Promise.all(rechercheFav.map(
        async (val) => {
            return await prisma.ressource.findMany({
                where: {
                    idRessource: parseInt(val.idRessource)
                },
                select: {
                    idRessource: true,
                    titreRessource: true,
                    dateRessource: true
                }
            })
        }
    ));

    return {
        props: {
            ressources: JSONBig.parse(JSONBig.stringify(rechercheRessource)),
            commentaires: JSONBig.parse(JSONBig.stringify(rechercheCommentaire)),
            categorie: JSONBig.parse(JSONBig.stringify(rechercheCategorie)),
            participations: JSONBig.parse(JSONBig.stringify(rechercheParticipations)),
            favoris: JSONBig.parse(JSONBig.stringify(rechercheFavoris)),
        },
    };
}


export default profil