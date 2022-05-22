import React, { useRef } from 'react'
import Head from 'next/head'
import axios from "axios";
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')

const Post = (props) => {
    const Comment = useRef();

    async function addNewComment(data) {
        const {
            addCommentaire
        } = Comment.current;
        const idRessource = parseInt(data.id);
        const isCommentaireSupprime = false;
        const idCompte = 24;
        const contenuCommentaire = addCommentaire.value;
        const dateCommentaire = (new Date(Date.now())).toISOString();
        await axios.post("../api/commentaires/addnewComment", {
            contenuCommentaire,
            dateCommentaire,
            idRessource,
            isCommentaireSupprime,
            idCompte
        })
        window.location.reload();
    }

    function voirRelations(item) {
        if (item.relationstous) {
          return "Tous"
        }
        else if (item.relationssoi) {
          return "Soi"
        }
        else if (item.relationsconjoints) {
          return "Conjoints"
        }
        else if (item.relationsfamille) {
          return "Famille"
        }
        else if (item.relationspro) {
          return "Professionnelle : collègues, collaborateurs et managers"
        }
        else if (item.relationsamis) {
          return "Amis et communautés"
        }
        else if (item.relationsinconnus) {
          return "Inconnus"
        }
      }
    return (
        <div className="py-4 dark:bg-gray-600">
            <Head>
                <title>{props.title}</title>
                <meta name="description" content={props.title} />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="py-4 text-4xl text-center text-gray-700 dark:text-gray-50 font-extrabold">{props.title}</h1>
            <div className="grid grid-cols-3 gap-5 p-4">
                <div className='rounded-lg drop-shadow-xl border-4 border-gray-300 shadow-lg shadow-gray-300'>
                    <h2 className='text-xl p-4 text-center'>Informations générales</h2>
                    <div className='text-lg p-2'>
                        <p>Catégorie : {props.idCategorie}</p>
                        <p>Type de ressources : {props.typeRessource}</p>
                        <p>Type de relations : {voirRelations(props)}</p>
                        <p>Lieu : {props.localisationRessource}</p>
                        <p>Lien de la ressource : <a href={props.lienRessource}>{props.lienRessource}</a></p>
                        <p>Fichier : {props.fileRessource}</p>
                        <p>Description de la ressource : {props.storyRessource}</p>
                        <p>Créée le {moment(props.dateRessource).format("LL")}</p>
                    </div>
                </div>
                <div className='col-span-2'>
                    <div className='rounded-lg drop-shadow-xl border-4 border-gray-300 shadow-lg shadow-gray-300 divide-y'>
                        <div>
                            <h2 className='text-xl p-4 text-center'>Chat</h2>
                        </div>
                        <div>
                            {props.commentaires.map((x) => <div className='rounded-lg p-5'>
                                <p>{x.contenuCommentaire} le {moment(x.dateCommentaire).format("LL")}</p>
                            </div>)}
                        </div>
                        <div className='content-center justify-center p-4'>
                            <form ref={Comment}>
                                <textarea className="border-0 rounded-2xl resize-y	font-medium shadow-xl"
                                    id="contenuCommentaire" maxLength="70" type="text" cols="30"
                                    name="addCommentaire"
                                />
                                <div className="mt-4">

                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                        onClick={() => { addNewComment(props) }}
                                    >
                                        Commenter
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Post