import React from 'react'
import Head from 'next/head'
import SideBar from '../../components/SideBar'
import { Tabs } from '../../components/Tabs'
import { RowsCompteAdmin, RowsCommentairesAdmin, RowsCommentairesMod, RowsRessourcesModRef, RowsRessourcesModHold } from '../../components/Rows';
import JSONBig from 'json-bigint';
import prisma from '../../prisma/prisma'

function moderer(props) {
    const commentaires = props.commentaires;
    const ressourcesRef = props.ressourcesRef;
    const ressourcesHold = props.ressourcesHold;
    const [openTab, setOpenTab] = React.useState(1);
    return (
        <div className="flex">
            <Head>
                <title>Modérer</title>
                <meta name="description" content="Modérer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <div className="w-full h-full p-4 m-8 overflow-y-auto space-y-10">
                <ul className="flex text-center border-b border-gray-200">
                    <div classNameName="flex flex-wrap">
                        <div classNameName="w-full">
                            <ul
                                classNameName="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                                role="tablist"
                            >
                                <li classNameName="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        classNameName={
                                            "text-base font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                            (openTab === 1
                                                ? "text-custom-blue bg-" + "black" + "-600"
                                                : "text-" + "black" + "-600 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(1);
                                        }}
                                        data-toggle="tab"
                                        href="#link1"
                                        role="tablist"
                                    >
                                        <i classNameName="fas fa-space-shuttle text-base mr-1"></i>Modérer les échanges
                                    </a>
                                </li>
                                <li classNameName="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        classNameName={
                                            "text-base font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                                            (openTab === 2
                                                ? "text-custom-blue bg-" + "black" + "-600"
                                                : "text-" + "black" + "-600 bg-white")
                                        }
                                        onClick={e => {
                                            e.preventDefault();
                                            setOpenTab(2);
                                        }}
                                        data-toggle="tab"
                                        href="#link2"
                                        role="tablist"
                                    >
                                        <i classNameName="fas fa-cog text-base mr-1"></i>  Valider les ressources crées
                                    </a>
                                </li>

                            </ul>
                            <div>
                                <div classNameName="px-4 py-5 flex-auto">
                                    <div classNameName="tab-content tab-space">
                                        <div classNameName={openTab === 1 ? "block" : "hidden"} id="link1">
                                            <p className="py-3 px-5 text-xl">Vous pouvez répondre à un message ou supprimer un message.</p>
                                            {
                                                commentaires?.map((commentaire, i) => <RowsCommentairesMod commentaire={commentaire} key={i} />)
                                            }
                                        </div>
                                        <div classNameName={openTab === 2 ? "block" : "hidden"} id="link2">
                                            <p className="py-3 px-5 text-xl">Vous pouvez accepter une demande de création d'une ressource en donnant une raison dans le cas contraire.</p>
                                            <p className="py-3 px-5 text-lg">Les demandes de création de ressources en attente :</p>
                                            {
                                                ressourcesHold?.map((hold, i) => <RowsRessourcesModHold ressource={hold} key={i} />)
                                            }

                                            <p className="py-3 px-5 text-lg">Les demandes de création de ressources refusées :</p>
                                            {
                                                ressourcesRef?.map((ref, i) => <RowsRessourcesModRef ressource={ref} key={i} />)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>)
}

export async function getServerSideProps() {
    const rechercheCommentaire = await prisma.commentaire.findMany();
    const rechercheResHold = await prisma.ressource.findMany({
        where: {
            validerRessource: null,
        }
    }
    );

    const rechercheResRefuser = await prisma.ressource.findMany({
        where: {
            validerRessource: false,
        }
    }
    );

    return {
        props: {
            commentaires: JSONBig.parse(JSONBig.stringify(rechercheCommentaire)),
            ressourcesHold: JSONBig.parse(JSONBig.stringify(rechercheResHold)),
            ressourcesRef: JSONBig.parse(JSONBig.stringify(rechercheResRefuser)),
        },
    };
}

export default moderer