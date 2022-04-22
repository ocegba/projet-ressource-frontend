import React from 'react'
import Head from 'next/head'
import SideBar from '../../components/SideBar'
import { Tabs } from '../../components/Tabs'
import { RowsCompteAdmin, RowsCommentairesAdmin, RowsCommentairesMod, RowsRessourcesMod } from '../../components/Rows';
import JSONBig from 'json-bigint';
import prisma from '../../prisma/prisma'

function moderer(props) {
    const commentaires = props.commentaires;
    const ressourcesRef = props.ressourcesRef;
    const ressourcesHold = props.ressourcesHold;
    const [openTab, setOpenTab] = React.useState(1);
    console.log(ressourcesHold)
    return (
        <div class="flex">
            <Head>
                <title>Administrer</title>
                <meta name="description" content="Administrer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <div class="w-full h-full p-4 m-8 overflow-y-auto space-y-10">
                <ul class="flex text-center border-b border-gray-200">
                    <div className="flex flex-wrap">
                        <div className="w-full">
                            <ul
                                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                                role="tablist"
                            >
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        className={
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
                                        <i className="fas fa-space-shuttle text-base mr-1"></i>Modérer les échanges
                                    </a>
                                </li>
                                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                    <a
                                        className={
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
                                        <i className="fas fa-cog text-base mr-1"></i>  Valider les ressources crées
                                    </a>
                                </li>

                            </ul>
                            <div>
                                <div className="px-4 py-5 flex-auto">
                                    <div className="tab-content tab-space">
                                        <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                                            <p class="py-3 px-5 text-xl">Vous pouvez répondre à un message ou supprimer un message.</p>
                                            {
                                                commentaires?.map((commentaire, i) => <RowsCommentairesMod commentaire={commentaire} key={i} />)
                                            }
                                        </div>
                                        <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                                            <p class="py-3 px-5 text-xl">Vous pouvez accepter une demande de création d'une ressource en donnant une raison dans le cas contraire.</p>
                                            <p class="py-3 px-5 text-lg">Les demandes de création de ressources en attente :</p>
                                            {
                                                ressourcesHold?.map((hold, i) => <RowsRessourcesMod ressource={hold} key={i} />)
                                            }

                                            <p class="py-3 px-5 text-lg">Les demandes de création de ressources refusées :</p>
                                            {
                                                ressourcesRef?.map((ref, i) => <RowsRessourcesMod ressource={ref} key={i} />)
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
          validerRessource:  null,
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