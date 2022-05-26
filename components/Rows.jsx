import React, { useRef, useState } from 'react'
import moment from 'moment'
import 'moment/locale/fr'
import axios from "axios";
moment.locale('fr')

import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Checkbox } from 'primereact/checkbox';

async function deleteRessource(ressource) {
    if (window.confirm("Souhaitez-vous vraiment supprimer cette ressource ?")) {

        await axios.post("../api/ressource/deleteRessource", {
            idRessource: ressource.idRessource,
        });
    };
    window.location.reload()
}

async function deleteCommentaire(commentaire) {
    if (window.confirm("Souhaitez-vous vraiment supprimer ce commentaire ?")) {

        await axios.post("../api/commentaires/deleteCommentaire", {
            idCommentaire: commentaire.idCommentaire,
        });
    };
    window.location.reload()
}

async function deleteActions(action, libelle) {
    await axios.post("../api/actions/deleteAction", {
        idRessource: parseInt(action.idRessource),
        libelleAction: libelle
    });
    window.location.reload()

}

async function validerRessource(ressource) {
    const idRessource = ressource.idRessource
    if (window.confirm("Ressource en validation")) {

        await axios.post("../api/ressource/validerRessource", {
            idRessource,
        });

    };
    window.location.reload()
}

async function suspendreRessource(ressource) {
    const idRessource = ressource.idRessource

    await axios.post("../api/ressource/suspendreRessource", {
        idRessource,
    });
    window.location.reload()
}

async function statusCompte(compte) {
    const idCompte = compte.idCompte
    const isActive = compte.isActive

    await axios.post("../api/compte/statusCompte", {
        idCompte,
        isActive,
    });
    window.location.reload()
}

function voirRelations(obj) {
    let array = []

    for (const item in obj) {
        var id = obj[item]
        if (id === true && item.includes("relations")) {
            array.push(item)
        }
    }

    if (typeof array !== 'undefined' && array.length > 0) {
        array.forEach(function (item, i) {
            if (item == "relationstous") {
                array[i] = "Tous";
            }
            if (item == "relationssoi") {
                array[i] = "Soi";
            }
            if (item == "relationsconjoints") {
                array[i] = "Conjoints";
            }
            if (item == "relationsfamille") {
                array[i] = "Famille";
            }
            if (item == "relationspro") {
                array[i] = "Professionnelle : collègues, collaborateurs et managers";
            }
            if (item == "relationsamis") {
                array[i] = "Amis et communautés";
            }
            if (item == "relationsinconnus") {
                array[i] = "Inconnus";
            }
        })
        return array
    }

}

function getCategorie(categorie, libelleCategorie) {
    let array = []
    let cat = []
    categorie.map((item) => {
        array = Object.values(item)
        for (var i = 0; i < array.length; i++) {
            if (array[i] == libelleCategorie) {
                cat = [array[i], array[i + 1]]
            }
        }
    })
    return cat
}
///////////////////////////////////////////// PROFIL CONNECTE /////////////////////////////////////////////////////

export const RowsRessources = ({ ressource, categorie }) => {
    const formRef = useRef();

    const [open, setOpen] = useState(false);
    var arr = [];

    const relations = [{ name: "Tous", key: "relationstous" },
    { name: "Soi", key: "relationssoi" },
    { name: "Conjoints", key: "relationsconjoints" },
    { name: "Famille", key: "relationsfamille" },
    { name: "Professionnelle : collègues, collaborateurs et managers", key: "relationspro" },
    { name: "Amis et communautés", key: "relationsamis" },
    { name: "Inconnus", key: "relationsinconnus" }];

    Object.entries(relations).map(entry => {
        let key = entry[0];
        let tab = entry[1];

        var array = voirRelations(ressource);
        for (var i = 0; i < array.length; i++) {
            if (tab.name == array[i]) {
                arr.push(relations[key])
            }
        }
    });

    const [typeRelationRessource1, setRelationRessource] = useState(arr);

    const onRelationChange = (e) => {
        let _setRelationRessource = [...typeRelationRessource1];
        if (e.checked) {
            _setRelationRessource.push(e.value);
        }
        else {
            for (let i = 0; i < _setRelationRessource.length; i++) {
                const selected = _setRelationRessource[i];

                if (selected.key === e.value.key) {
                    _setRelationRessource.splice(i, 1);
                    break;
                }
            }
        }
        setRelationRessource(_setRelationRessource);
    }

    async function editRessource() {
        const {
            editRessourcesTitreRessource,
            editRessourcesCategorieRessource,
            editRessourcesTypeRessource,
            editrelationstous,
            editrelationssoi,
            editrelationsconjoints,
            editrelationsfamille,
            editrelationspro,
            editrelationsamis,
            editrelationsinconnus,
            editRessourcesStoryRessource,
            editRessourcesFileRessource,
            editRessourcesLienRessource,
            editRessourcesLocalisationRessource,
        } = formRef.current;

        const titreRessource = editRessourcesTitreRessource.value;
        const idCategorie = editRessourcesCategorieRessource.value;
        const typeRessource = editRessourcesTypeRessource.value;
        const storyRessource = editRessourcesStoryRessource.value;
        const fileRessource = editRessourcesFileRessource.value;
        const lienRessource = editRessourcesLienRessource.value;
        const localisationRessource = editRessourcesLocalisationRessource.value;
        const validerRessource = null;
        const dateRessource = (new Date(Date.now())).toISOString();

        const relationstous = Boolean(editrelationstous.checked);
        const relationssoi = Boolean(editrelationssoi.checked);
        const relationsconjoints = Boolean(editrelationsconjoints.checked);
        const relationsfamille = Boolean(editrelationsfamille.checked);
        const relationspro = Boolean(editrelationspro.checked);
        const relationsamis = Boolean(editrelationsamis.checked);
        const relationsinconnus = Boolean(editrelationsinconnus.checked);

        await axios.put("../api/ressource/editRessource", {
            idRessource: (ressource?.idRessource),
            titreRessource,
            idCategorie: parseInt(idCategorie),
            typeRessource,
            storyRessource,
            fileRessource,
            lienRessource,
            localisationRessource,
            dateRessource,
            validerRessource,
            relationstous,
            relationssoi,
            relationsconjoints,
            relationsfamille,
            relationspro,
            relationsamis,
            relationsinconnus,
        });
        window.location.reload();
    }

    return (
        <>
            <div className="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full my-3 shadow-lg rounded-lg shadow-lg shadow">
                <div className="col-start-1 col-span-2 text-justify	">
                    {ressource.titreRessource} <br />
                    crée le {moment(ressource.dateRessource).format("LL")}<br />
                </div>
                <div className="col-start-3 flex items-center justify-center">
                    {ressource.validerRessource === true && <li>
                        <a>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="green" className="w-10 h-10" viewBox="0 0 576 512">
                                <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                            </svg>
                        </a>
                    </li>
                    }
                    {ressource.validerRessource === false && <li>
                        <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="red" className="w-10 h-10" viewBox="0 0 576 512">
                                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />                        </svg>
                        </a>
                        <span>{ressource.notRaisonRessource}</span>
                    </li>
                    }
                    {ressource.validerRessource === null && <li>
                        <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="orange" viewBox="0 0 576 512">
                                <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />                        </svg>
                        </a>
                        <span>En attente</span>
                    </li>
                    }
                </div>
                <div className="col-start-4">
                    {getCategorie(categorie, ressource.idCategorie)[1]}
                </div>
                <div className="col-start-5">
                    {ressource.typeRessource}
                </div>
                <div className="col-start-6">
                    {voirRelations(ressource).map((item) => <p className="col-start-6"> {item} </p>)}
                </div>
                <div className="flex items-center justify-center">
                    <svg onClick={() => setOpen(!open)} className="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-blue-300" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                        <path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V299.6L289.3 394.3C281.1 402.5 275.3 412.8 272.5 424.1L257.4 484.2C255.1 493.6 255.7 503.2 258.8 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256zM564.1 250.1C579.8 265.7 579.8 291 564.1 306.7L534.7 336.1L463.8 265.1L493.2 235.7C508.8 220.1 534.1 220.1 549.8 235.7L564.1 250.1zM311.9 416.1L441.1 287.8L512.1 358.7L382.9 487.9C378.8 492 373.6 494.9 368 496.3L307.9 511.4C302.4 512.7 296.7 511.1 292.7 507.2C288.7 503.2 287.1 497.4 288.5 491.1L303.5 431.8C304.9 426.2 307.8 421.1 311.9 416.1V416.1z" />
                    </svg>
                </div>
                <div className="flex items-center justify-center">
                    <svg onClick={() => deleteRessource(ressource)} className="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                        <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                    </svg>
                </div>

            </div>
            <div className="md:flex bg-gray-200 justify-center items-center rounded-lg md:w-auto md:order-1" id="mobile-menu-4">
                {open ? (<>
                    <form ref={formRef} d="formCreate" className="flex flex-col">

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="titreRessource">Titre de la ressource :</label>
                            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10" maxLength="50"
                                type="text"
                                defaultValue={ressource?.titreRessource}
                                name="editRessourcesTitreRessource"
                                id="titreRessource"
                                placeholder='ex: Chasse aux trésors'
                            />
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="categorieRessource">Catégorie :</label>
                            <select className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                required
                                defaultValue={getCategorie(categorie, ressource.idCategorie)[1]}
                                name="editRessourcesCategorieRessource"
                                id="idCategorie"
                                placeholder='Sélectionnez une catégorie'
                            >
                                {categorie?.map((compte, i) => <option value={compte.idCategorie}>{compte.libelleCategorie}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="typesRessources">Types de ressources :</label>
                            <select className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                required
                                defaultValue={ressource?.typeRessource}
                                name="editRessourcesTypeRessource"
                                id="typesRessources"
                                placeholder='Sélectionnez un type de ressource'
                            >

                                <option value="" selected disabled hidden>Choisir un type de ressources</option>
                                <option value="Activité / Jeu à réaliser">Activité / Jeu à réaliser</option>
                                <option value="Article">Article</option>
                                <option value="Carte défi">Carte défi</option>
                                <option value="Cours au format PDF">Cours au format PDF</option>
                                <option value="Exercice / Atelier">Exercice / Atelier</option>
                                <option value="Fiche de lecture">Fiche de lecture</option>
                                <option value="Jeu">Jeu en ligne</option>
                                <option value="Vidéo">Vidéo</option>
                            </select>
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="storyRessource">Texte :</label>
                            <textarea className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                defaultValue={ressource?.storyRessource}
                                type="text"
                                name="editRessourcesStoryRessource"
                                id="storyRessource"
                                placeholder='Expliquer votre ressource'
                            />
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="fileRessource">Fichier :</label>
                            <input
                                defaultValue={ressource?.fileRessource}
                                type="file"
                                name="editRessourcesFileRessource"
                                id="fileRessource"
                                placeholder='Insérer une image, un document pdf ou word...'
                            />
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="lienRessource">Entrez un lien url en complément de votre ressource :</label>
                            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                defaultValue={ressource?.lienRessource}
                                type="url"
                                name="editRessourcesLienRessource"
                                id="lienRessource"
                                placeholder="https://example.com"
                                pattern="https://.*"
                                size="30"
                            />
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="typesRelationRessource">Types de relations :</label>
                            {
                                relations.map((relation) =>

                                    <p key={relation.key} className="field-checkbox">
                                        <Checkbox inputId={relation.key} name={"edit" + relation.key} value={relation} onChange={onRelationChange} checked={typeRelationRessource1.some((item) => item.name === relation.name)} />
                                        <label htmlFor={relation.key}>{relation.name}</label>
                                    </p>
                                )
                            }
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl">Département :</label>
                            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                defaultValue={ressource?.localisationRessource}
                                name="editRessourcesLocalisationRessource"
                                list="departement"
                                placeholder='Sélectionnez un département'
                            />
                            <datalist id="departement">
                                <option value="" />
                                <option value="Ain">Ain</option>
                                <option value="Aisne">Aisne</option>
                                <option value="Allier">Allier</option>
                                <option value="Alpes-de-Haute-Provence">Alpes-de-Haute-Provence</option>
                                <option value="Alpes-Maritimes">Alpes-Maritimes</option>
                                <option value="Ardennes">Ardennes</option>
                                <option value="Ardèche">Ardèche</option>
                                <option value="Ariège">Ariège</option>
                                <option value="Aube">Aube</option>
                                <option value="Aude">Aude</option>
                                <option value="Aveyron">Aveyron</option>
                                <option value="Bas-Rhin">Bas-Rhin</option>
                                <option value="Bouches-du-Rhône">Bouches-du-Rhône</option>
                                <option value="Calvados">Calvados</option>
                                <option value="Cantal">Cantal</option>
                                <option value="Charente">Charente</option>
                                <option value="Charente-Maritime">Charente-Maritime</option>
                                <option value="Cher">Cher</option>
                                <option value="Corrèze">Corrèze</option>
                                <option value="Corse-du-Sud">Corse-du-Sud</option>
                                <option value="Creuse">Creuse</option>
                                <option value="Côte-d'Or">Côte-d'Or</option>
                                <option value="Côtes-d'Armor">Côtes-d'Armor</option>
                                <option value="Deux-Sèvres">Deux-Sèvres</option>
                                <option value="Dordogne">Dordogne</option>
                                <option value="Doubs">Doubs</option>
                                <option value="Drôme">Drôme</option>
                                <option value="Essonne">Essonne</option>
                                <option value="Eure">Eure</option>
                                <option value="Eure-et-Loir">Eure-et-Loir</option>
                                <option value="Finistère">Finistère</option>
                                <option value="Gard">Gard</option>
                                <option value="Gers">Gers</option>
                                <option value="Gironde">Gironde</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guyane">Guyane</option>
                                <option value="Haut-Rhin">Haut-Rhin</option>
                                <option value="Haute-Corse">Haute-Corse</option>
                                <option value="Haute-Garonne">Haute-Garonne</option>
                                <option value="Haute-Loire">Haute-Loire</option>
                                <option value="Haute-Marne">Haute-Marne</option>
                                <option value="Haute-Savoie">Haute-Savoie</option>
                                <option value="Haute-Saône">Haute-Saône</option>
                                <option value="Haute-Vienne">Haute-Vienne</option>
                                <option value="Hautes-Alpes">Hautes-Alpes</option>
                                <option value="Hautes-Pyrénées">Hautes-Pyrénées</option>
                                <option value="Hauts-de-Seine">Hauts-de-Seine</option>
                                <option value="Hérault">Hérault</option>
                                <option value="Ille-et-Vilaine">Ille-et-Vilaine</option>
                                <option value="Indre">Indre</option>
                                <option value="Indre-et-Loire">Indre-et-Loire</option>
                                <option value="Isère">Isère</option>
                                <option value="Jura">Jura</option>
                                <option value="La Réunion">La Réunion</option>
                                <option value="Landes">Landes</option>
                                <option value="Loir-et-Cher">Loir-et-Cher</option>
                                <option value="Loire">Loire</option>
                                <option value="Loire-Atlantique">Loire-Atlantique</option>
                                <option value="Loiret">Loiret</option>
                                <option value="Lot">Lot</option>
                                <option value="Lot-et-Garonne">Lot-et-Garonne</option>
                                <option value="Lozère">Lozère</option>
                                <option value="Maine-et-Loire">Maine-et-Loire</option>
                                <option value="Manche">Manche</option>
                                <option value="Marne">Marne</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mayenne">Mayenne</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Meurthe-et-Moselle">Meurthe-et-Moselle</option>
                                <option value="Meuse">Meuse</option>
                                <option value="Morbihan">Morbihan</option>
                                <option value="Moselle">Moselle</option>
                                <option value="Nièvre">Nièvre</option>
                                <option value="Nord">Nord</option>
                                <option value="Oise">Oise</option>
                                <option value="Orne">Orne</option>
                                <option value="Paris">Paris</option>
                                <option value="Pas-de-Calais">Pas-de-Calais</option>
                                <option value="Puy-de-Dôme">Puy-de-Dôme</option>
                                <option value="Pyrénées-Atlantiques">Pyrénées-Atlantiques</option>
                                <option value="Pyrénées-Orientales">Pyrénées-Orientales</option>
                                <option value="Rhône">Rhône</option>
                                <option value="Sarthe">Sarthe</option>
                                <option value="Savoie">Savoie</option>
                                <option value="Saône-et-Loire">Saône-et-Loire</option>
                                <option value="Seine-et-Marne">Seine-et-Marne</option>
                                <option value="Seine-Maritime">Seine-Maritime</option>
                                <option value="Seine-Saint-Denis">Seine-Saint-Denis</option>
                                <option value="Somme">Somme</option>
                                <option value="Tarn">Tarn</option>
                                <option value="Tarn-et-Garonne">Tarn-et-Garonne</option>
                                <option value="Territoire de Belfort">Territoire de Belfort</option>
                                <option value="Val-d'Oise">Val-d'Oise</option>
                                <option value="Val-de-Marne">Val-de-Marne</option>
                                <option value="Var">Var</option>
                                <option value="Vaucluse">Vaucluse</option>
                                <option value="Vendée">Vendée</option>
                                <option value="Vienne">Vienne</option>
                                <option value="Vosges">Vosges</option>
                                <option value="Yonne">Yonne</option>
                                <option value="Yvelines">Yvelines</option>

                            </datalist>
                        </div>
                        <div>
                            <input className="mt-2 mb-2 bg-custom-blue hover:bg-custom-blue-200 text-white font-bold text-xl w-fit pr-1 pl-1 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" value="Modifier votre ressource" onClick={() => editRessource()} />
                        </div>
                    </form >
                </>
                ) : false}
            </div>
        </>

    )
}

export const RowsCommentaires = ({ commentaire }) => {
    const formRef = useRef();
    const [open, setOpen] = useState(false);
    async function editCommentaire() {
        const {
            editCommentaireCommentaire,
        } = formRef.current;
        const contenuCommentaire = editCommentaireCommentaire.value;
        await axios.put("../api/commentaires/editCommentaire", {
            idCommentaire: (commentaire?.idCommentaire),
            contenuCommentaire,
        });
        window.location.reload();
    }
    return (
        <>
            <div className="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full my-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
                <div className="col-start-1 col-span-6 text-justify	">
                    {commentaire.contenuCommentaire} <br />
                    crée le {moment(commentaire.dateCommentaire).format("LL")}<br />
                </div>
                <div className="flex items-center justify-center">
                    <svg onClick={() => setOpen(!open)} className="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-blue-300 " xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                        <path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V299.6L289.3 394.3C281.1 402.5 275.3 412.8 272.5 424.1L257.4 484.2C255.1 493.6 255.7 503.2 258.8 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256zM564.1 250.1C579.8 265.7 579.8 291 564.1 306.7L534.7 336.1L463.8 265.1L493.2 235.7C508.8 220.1 534.1 220.1 549.8 235.7L564.1 250.1zM311.9 416.1L441.1 287.8L512.1 358.7L382.9 487.9C378.8 492 373.6 494.9 368 496.3L307.9 511.4C302.4 512.7 296.7 511.1 292.7 507.2C288.7 503.2 287.1 497.4 288.5 491.1L303.5 431.8C304.9 426.2 307.8 421.1 311.9 416.1V416.1z" />
                    </svg>
                </div>
                <div className="flex items-center justify-center">
                    <svg onClick={() => deleteCommentaire(commentaire)} className="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                        <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                    </svg>
                </div>
            </div>
            <div className="md:flex bg-gray-200 justify-center items-center rounded-lg md:w-auto md:order-1" id="mobile-menu-4">
                {open ? (<>
                    <form ref={formRef} d="formCreate" className="flex flex-col">

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                defaultValue={commentaire?.contenuCommentaire}
                                name="editCommentaireCommentaire"
                                id="contenuCommentaire"
                            />
                        </div>
                        <div>
                            <input className="mt-2 mb-2 bg-custom-blue hover:bg-custom-blue-200 text-white font-bold text-xl w-fit pr-1 pl-1 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" value="Modifier votre commentaire" onClick={() => editCommentaire()} />
                        </div>
                    </form >
                </>
                ) : false}
            </div>
        </>
    )
}

export const RowsParticipate = ({ participations }) => {
    return (
        <div className="grid grid-cols-4 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div className="col-start-1 col-span-3 text-justify	">
                {participations.titreRessource}<br />
                créée le {moment(participations.dateRessource).format("LL")}<br />
            </div>
            <div onClick={() => deleteActions(participations, "participer")} className="hover:text-white flex items-center justify-center bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400 text-lg font-bold">
                Enlever de mes participations
            </div>
        </div>
    )

}

export const RowsFavoris = ({ favoris }) => {
    return (
        <div className="grid grid-cols-4 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div className="col-start-1 col-span-3 text-justify	">
                {favoris.titreRessource}<br />
                créée le {moment(favoris.dateRessource).format("LL")}<br />
            </div>
            <div onClick={() => deleteActions(favoris, "favoris")} className="hover:text-white flex items-center justify-center bg-yellow-300 hover:bg-yellow-400 p-3 rounded-lg cursor-pointer shadow-lg shadow-yellow-200 text-lg font-bold">
                Enlever de mes favoris
            </div>
        </div>
    )
}

///////////////////////////////////////////// ADMINISTRATEUR /////////////////////////////////////////////////////

export const RowsRessourcesAdmin = ({ ressource, categorie }) => {
    const formRef = useRef();

    const [open, setOpen] = useState(false);
    var arr = [];

    const relations = [{ name: "Tous", key: "relationstous" },
    { name: "Soi", key: "relationssoi" },
    { name: "Conjoints", key: "relationsconjoints" },
    { name: "Famille", key: "relationsfamille" },
    { name: "Professionnelle : collègues, collaborateurs et managers", key: "relationspro" },
    { name: "Amis et communautés", key: "relationsamis" },
    { name: "Inconnus", key: "relationsinconnus" }];

    Object.entries(relations).map(entry => {
        let key = entry[0];
        let tab = entry[1];

        var array = voirRelations(ressource);
        for (var i = 0; i < array.length; i++) {
            if (tab.name == array[i]) {
                arr.push(relations[key])
            }
        }
    });

    const [typeRelationRessource1, setRelationRessource] = useState(arr);

    const onRelationChange = (e) => {
        let _setRelationRessource = [...typeRelationRessource1];
        if (e.checked) {
            _setRelationRessource.push(e.value);
        }
        else {
            for (let i = 0; i < _setRelationRessource.length; i++) {
                const selected = _setRelationRessource[i];

                if (selected.key === e.value.key) {
                    _setRelationRessource.splice(i, 1);
                    break;
                }
            }
        }
        setRelationRessource(_setRelationRessource);
    }

    async function editRessource() {
        const {
            editRessourcesTitreRessource,
            editRessourcesCategorieRessource,
            editRessourcesTypeRessource,
            editrelationstous,
            editrelationssoi,
            editrelationsconjoints,
            editrelationsfamille,
            editrelationspro,
            editrelationsamis,
            editrelationsinconnus,
            editRessourcesStoryRessource,
            editRessourcesFileRessource,
            editRessourcesLienRessource,
            editRessourcesLocalisationRessource,
        } = formRef.current;

        const titreRessource = editRessourcesTitreRessource.value;
        const idCategorie = editRessourcesCategorieRessource.value;
        const typeRessource = editRessourcesTypeRessource.value;
        const storyRessource = editRessourcesStoryRessource.value;
        const fileRessource = editRessourcesFileRessource.value;
        const lienRessource = editRessourcesLienRessource.value;
        const localisationRessource = editRessourcesLocalisationRessource.value;
        const validerRessource = null;
        const dateRessource = (new Date(Date.now())).toISOString();

        const relationstous = Boolean(editrelationstous.checked);
        const relationssoi = Boolean(editrelationssoi.checked);
        const relationsconjoints = Boolean(editrelationsconjoints.checked);
        const relationsfamille = Boolean(editrelationsfamille.checked);
        const relationspro = Boolean(editrelationspro.checked);
        const relationsamis = Boolean(editrelationsamis.checked);
        const relationsinconnus = Boolean(editrelationsinconnus.checked);

        await axios.put("../api/ressource/editRessource", {
            idRessource: (ressource?.idRessource),
            titreRessource,
            idCategorie: parseInt(idCategorie),
            typeRessource,
            storyRessource,
            fileRessource,
            lienRessource,
            localisationRessource,
            dateRessource,
            validerRessource,
            relationstous,
            relationssoi,
            relationsconjoints,
            relationsfamille,
            relationspro,
            relationsamis,
            relationsinconnus,
        });
        window.location.reload();
    }

    return (
        <>
            <div className="grid grid-cols-9 gap-4 px-4 py-5 relative flex flex-col min-w-0 bg-white w-full my-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
                <div className="col-start-1 col-span-3 text-justify	">
                    {ressource.titreRessource} <br />
                    crée le {moment(ressource.dateRessource).format("LL")}<br />
                </div>
                <div className="col-start-4">
                    {getCategorie(categorie, ressource.idCategorie)[1]}
                </div>
                <div className="col-start-5">
                    {ressource.typeRessource}
                </div>
                {voirRelations(ressource).map((item) => <p className="col-start-6"> {item} </p>)}
                <div className="flex items-center justify-center">
                    <svg onClick={() => setOpen(!open)} className="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-blue-300" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                        <path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V299.6L289.3 394.3C281.1 402.5 275.3 412.8 272.5 424.1L257.4 484.2C255.1 493.6 255.7 503.2 258.8 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256zM564.1 250.1C579.8 265.7 579.8 291 564.1 306.7L534.7 336.1L463.8 265.1L493.2 235.7C508.8 220.1 534.1 220.1 549.8 235.7L564.1 250.1zM311.9 416.1L441.1 287.8L512.1 358.7L382.9 487.9C378.8 492 373.6 494.9 368 496.3L307.9 511.4C302.4 512.7 296.7 511.1 292.7 507.2C288.7 503.2 287.1 497.4 288.5 491.1L303.5 431.8C304.9 426.2 307.8 421.1 311.9 416.1V416.1z" />
                    </svg>
                </div>
                <div className="flex items-center justify-center">
                    <svg onClick={() => suspendreRessource(ressource)} className="bg-orange-500 hover:bg-orange-500  pl-3 py-1.5 rounded-lg cursor-pointer shadow-lg shadow-orange-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                        <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
                    </svg>
                </div>

                <div className="flex items-center justify-center">
                    <svg onClick={() => deleteRessource(ressource)} className="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                        <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                    </svg>
                </div>
            </div>
            <div className="md:flex bg-gray-200 justify-center items-center rounded-lg md:w-auto md:order-1" id="mobile-menu-4">
                {open ? (<>
                    <form ref={formRef} d="formCreate" className="flex flex-col">

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="titreRessource">Titre de la ressource :</label>
                            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10" maxLength="50"
                                type="text"
                                defaultValue={ressource?.titreRessource}
                                name="editRessourcesTitreRessource"
                                id="titreRessource"
                                placeholder='ex: Chasse aux trésors'
                            />
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="categorieRessource">Catégorie :</label>
                            <select className="bg-white border-0 rounded-2xl   medium shadow-xl h-14 pl-10"
                                required
                                defaultValue={getCategorie(categorie, ressource.idCategorie)[1]}
                                name="editRessourcesCategorieRessource"
                                id="idCategorie"
                                placeholder='Sélectionnez une catégorie'
                            >
                                {categorie?.map((compte, i) => <option value={compte.idCategorie}>{compte.libelleCategorie}</option>)}
                            </select>
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="typesRessources">Types de ressources :</label>
                            <select className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                required
                                defaultValue={ressource?.typeRessource}
                                name="editRessourcesTypeRessource"
                                id="typesRessources"
                                placeholder='Sélectionnez un type de ressource'
                            >

                                <option value="" selected disabled hidden>Choisir un type de ressources</option>
                                <option value="Activité / Jeu à réaliser">Activité / Jeu à réaliser</option>
                                <option value="Article">Article</option>
                                <option value="Carte défi">Carte défi</option>
                                <option value="Cours au format PDF">Cours au format PDF</option>
                                <option value="Exercice / Atelier">Exercice / Atelier</option>
                                <option value="Fiche de lecture">Fiche de lecture</option>
                                <option value="Jeu">Jeu en ligne</option>
                                <option value="Vidéo">Vidéo</option>
                            </select>
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="storyRessource">Texte :</label>
                            <textarea className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                defaultValue={ressource?.storyRessource}
                                type="text"
                                name="editRessourcesStoryRessource"
                                id="storyRessource"
                                placeholder='Expliquer votre ressource'
                            />
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="fileRessource">Fichier :</label>
                            <input
                                defaultValue={ressource?.fileRessource}
                                type="file"
                                name="editRessourcesFileRessource"
                                id="fileRessource"
                                placeholder='Insérer une image, un document pdf ou word...'
                            />
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="lienRessource">Entrez un lien url en complément de votre ressource :</label>
                            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                defaultValue={ressource?.lienRessource}
                                type="url"
                                name="editRessourcesLienRessource"
                                id="lienRessource"
                                placeholder="https://example.com"
                                pattern="https://.*"
                                size="30"
                            />
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl" htmlFor="typesRelationRessource">Types de relations :</label>
                            {
                                relations.map((relation) =>

                                    <p key={relation.key} className="field-checkbox">
                                        <Checkbox inputId={relation.key} name={"edit" + relation.key} value={relation} onChange={onRelationChange} checked={typeRelationRessource1.some((item) => item.name === relation.name)} />
                                        <label htmlFor={relation.key}>{relation.name}</label>
                                    </p>
                                )
                            }
                        </div>

                        <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                            <label className="text-xl">Département :</label>
                            <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                                defaultValue={ressource?.localisationRessource}
                                name="editRessourcesLocalisationRessource"
                                list="departement"
                                placeholder='Sélectionnez un département'
                            />
                            <datalist id="departement">
                                <option value="" />
                                <option value="Ain">Ain</option>
                                <option value="Aisne">Aisne</option>
                                <option value="Allier">Allier</option>
                                <option value="Alpes-de-Haute-Provence">Alpes-de-Haute-Provence</option>
                                <option value="Alpes-Maritimes">Alpes-Maritimes</option>
                                <option value="Ardennes">Ardennes</option>
                                <option value="Ardèche">Ardèche</option>
                                <option value="Ariège">Ariège</option>
                                <option value="Aube">Aube</option>
                                <option value="Aude">Aude</option>
                                <option value="Aveyron">Aveyron</option>
                                <option value="Bas-Rhin">Bas-Rhin</option>
                                <option value="Bouches-du-Rhône">Bouches-du-Rhône</option>
                                <option value="Calvados">Calvados</option>
                                <option value="Cantal">Cantal</option>
                                <option value="Charente">Charente</option>
                                <option value="Charente-Maritime">Charente-Maritime</option>
                                <option value="Cher">Cher</option>
                                <option value="Corrèze">Corrèze</option>
                                <option value="Corse-du-Sud">Corse-du-Sud</option>
                                <option value="Creuse">Creuse</option>
                                <option value="Côte-d'Or">Côte-d'Or</option>
                                <option value="Côtes-d'Armor">Côtes-d'Armor</option>
                                <option value="Deux-Sèvres">Deux-Sèvres</option>
                                <option value="Dordogne">Dordogne</option>
                                <option value="Doubs">Doubs</option>
                                <option value="Drôme">Drôme</option>
                                <option value="Essonne">Essonne</option>
                                <option value="Eure">Eure</option>
                                <option value="Eure-et-Loir">Eure-et-Loir</option>
                                <option value="Finistère">Finistère</option>
                                <option value="Gard">Gard</option>
                                <option value="Gers">Gers</option>
                                <option value="Gironde">Gironde</option>
                                <option value="Guadeloupe">Guadeloupe</option>
                                <option value="Guyane">Guyane</option>
                                <option value="Haut-Rhin">Haut-Rhin</option>
                                <option value="Haute-Corse">Haute-Corse</option>
                                <option value="Haute-Garonne">Haute-Garonne</option>
                                <option value="Haute-Loire">Haute-Loire</option>
                                <option value="Haute-Marne">Haute-Marne</option>
                                <option value="Haute-Savoie">Haute-Savoie</option>
                                <option value="Haute-Saône">Haute-Saône</option>
                                <option value="Haute-Vienne">Haute-Vienne</option>
                                <option value="Hautes-Alpes">Hautes-Alpes</option>
                                <option value="Hautes-Pyrénées">Hautes-Pyrénées</option>
                                <option value="Hauts-de-Seine">Hauts-de-Seine</option>
                                <option value="Hérault">Hérault</option>
                                <option value="Ille-et-Vilaine">Ille-et-Vilaine</option>
                                <option value="Indre">Indre</option>
                                <option value="Indre-et-Loire">Indre-et-Loire</option>
                                <option value="Isère">Isère</option>
                                <option value="Jura">Jura</option>
                                <option value="La Réunion">La Réunion</option>
                                <option value="Landes">Landes</option>
                                <option value="Loir-et-Cher">Loir-et-Cher</option>
                                <option value="Loire">Loire</option>
                                <option value="Loire-Atlantique">Loire-Atlantique</option>
                                <option value="Loiret">Loiret</option>
                                <option value="Lot">Lot</option>
                                <option value="Lot-et-Garonne">Lot-et-Garonne</option>
                                <option value="Lozère">Lozère</option>
                                <option value="Maine-et-Loire">Maine-et-Loire</option>
                                <option value="Manche">Manche</option>
                                <option value="Marne">Marne</option>
                                <option value="Martinique">Martinique</option>
                                <option value="Mayenne">Mayenne</option>
                                <option value="Mayotte">Mayotte</option>
                                <option value="Meurthe-et-Moselle">Meurthe-et-Moselle</option>
                                <option value="Meuse">Meuse</option>
                                <option value="Morbihan">Morbihan</option>
                                <option value="Moselle">Moselle</option>
                                <option value="Nièvre">Nièvre</option>
                                <option value="Nord">Nord</option>
                                <option value="Oise">Oise</option>
                                <option value="Orne">Orne</option>
                                <option value="Paris">Paris</option>
                                <option value="Pas-de-Calais">Pas-de-Calais</option>
                                <option value="Puy-de-Dôme">Puy-de-Dôme</option>
                                <option value="Pyrénées-Atlantiques">Pyrénées-Atlantiques</option>
                                <option value="Pyrénées-Orientales">Pyrénées-Orientales</option>
                                <option value="Rhône">Rhône</option>
                                <option value="Sarthe">Sarthe</option>
                                <option value="Savoie">Savoie</option>
                                <option value="Saône-et-Loire">Saône-et-Loire</option>
                                <option value="Seine-et-Marne">Seine-et-Marne</option>
                                <option value="Seine-Maritime">Seine-Maritime</option>
                                <option value="Seine-Saint-Denis">Seine-Saint-Denis</option>
                                <option value="Somme">Somme</option>
                                <option value="Tarn">Tarn</option>
                                <option value="Tarn-et-Garonne">Tarn-et-Garonne</option>
                                <option value="Territoire de Belfort">Territoire de Belfort</option>
                                <option value="Val-d'Oise">Val-d'Oise</option>
                                <option value="Val-de-Marne">Val-de-Marne</option>
                                <option value="Var">Var</option>
                                <option value="Vaucluse">Vaucluse</option>
                                <option value="Vendée">Vendée</option>
                                <option value="Vienne">Vienne</option>
                                <option value="Vosges">Vosges</option>
                                <option value="Yonne">Yonne</option>
                                <option value="Yvelines">Yvelines</option>

                            </datalist>
                        </div>
                        <div>
                            <input className="mt-2 mb-2 bg-custom-blue hover:bg-custom-blue-200 text-white font-bold text-xl w-fit pr-1 pl-1 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" value="Modifier votre ressource" onClick={() => editRessource()} />
                        </div>
                    </form >
                </>
                ) : false}
            </div>
        </>
    )
}

export const RowsCompteAdmin = ({ compte }) => {

    function actif(compte) {
        let result;
        if (compte === true) {
            result = "COMPTE ACTIF"
        } else {
            result = "COMPTE NON ACTIF"
        }
        return result;
    }

    return (
        <div className="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div className="col-start-1 col-span-3 text-justify	">
                {compte.nomUtilisateur}{compte.prenomUtilisateur}<br />
                {compte.mailUtilisateur} crée le {moment(compte.dateCreationUtilisateur).format("LL")}
            </div>
            <div className="col-start-5">
                {actif(compte.isActive)}
            </div>
            <div className="col-start-7">
                {compte.typeUtilisateur}
            </div>

            <div className="flex items-center justify-center">
                {actif(compte.isActive) === "COMPTE NON ACTIF" && <svg onClick={() => statusCompte(compte)} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="red" width="60" viewBox="0 0 600 550">
                    <path d="M192 352C138.1 352 96 309 96 256C96 202.1 138.1 160 192 160C245 160 288 202.1 288 256C288 309 245 352 192 352zM384 448H192C85.96 448 0 362 0 256C0 149.1 85.96 64 192 64H384C490 64 576 149.1 576 256C576 362 490 448 384 448zM384 128H192C121.3 128 64 185.3 64 256C64 326.7 121.3 384 192 384H384C454.7 384 512 326.7 512 256C512 185.3 454.7 128 384 128z" />                </svg>}
                {actif(compte.isActive) === "COMPTE ACTIF" && <svg onClick={() => statusCompte(compte)} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="green" width="60" viewBox="0 0 600 550">
                    <path d="M384 64C490 64 576 149.1 576 256C576 362 490 448 384 448H192C85.96 448 0 362 0 256C0 149.1 85.96 64 192 64H384zM384 352C437 352 480 309 480 256C480 202.1 437 160 384 160C330.1 160 288 202.1 288 256C288 309 330.1 352 384 352z" />                </svg>}
            </div>
        </div>
    )
}

///////////////////////////////////////////// MODERATEUR /////////////////////////////////////////////////////

export const RowsCommentairesMod = ({ commentaire }) => {
    return (
        <div className="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div className="col-start-1 col-span-4 text-justify">
                {commentaire.contenuCommentaire} <br />
                crée le {moment(commentaire.dateCommentaire).format("LL")}<br />
            </div>
            <div className="col-start-5"></div>
            <div className="col-start-6"></div>
            <div className="flex items-center justify-center">
                <svg className="bg-green-400 hover:bg-green-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-gren-300 " xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 655 535">
                    <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" />                </svg>
            </div>
            <div className="flex items-center justify-center">
                <svg onClick={() => deleteCommentaire(commentaire)} className="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
            </div>
        </div>
    )
}

export const RowsRessourcesModHold = ({ ressource, categorie }) => {
    const Raison = useRef();

    async function deleteDemandeRessource(ressource) {
        if (window.confirm("Souhaitez-vous vraiment supprimer cette demande de ressource ? N'oubliez pas d'inscrire la raison")) {
            const {
                raison
            } = Raison.current;
            const idRessource = (ressource?.idRessource);
            const validerRessource = false;
            const notRaisonRessource = raison.value;
            await axios.post("../api/ressource/deleteRessource", {
                idRessource,
                validerRessource,
                notRaisonRessource,
            });
        };
        window.location.reload();
    }

    let array = [voirRelations(ressource)];
    return (
        <div className="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg shadow-lg shadow">
            <div className="col-start-1 col-span-3 text-justify	">
                {ressource.titreRessource} <br />
                crée le {moment(ressource.dateRessource).format("LL")}<br />
            </div>
            <div className="col-start-4 flex items-center justify-center">
                {ressource.validerRessource == false && <li>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" className="w-10 h-10" viewBox="0 0 576 512">
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                        </svg>
                    </a>
                    <span>{ressource.notRaisonRessource}</span>
                </li>
                }
                {ressource.validerRessource == null && <li>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                        <svg href="#popup1" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="orange" viewBox="0 0 576 512">
                            <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
                        </svg>
                    </a>
                    <span>En attente</span>
                </li>
                }
            </div>
            <div className="col-start-5">
                {getCategorie(categorie, ressource.idCategorie)[1]}
            </div>
            <div className="col-start-6">
                {ressource.typeRessource} <br />
                {
                    array.map((items) => {
                        return items.map((id) => {
                            return <p className="col-start-6">  {id} </p>
                        }
                        )
                    })
                }

            </div>
            <div className="flex items-center justify-center">
                <svg onClick={() => validerRessource(ressource)} className="bg-green-400 hover:bg-green-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-green-300 hover:bg-green-500" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                </svg>
            </div>
            <div className="flex items-center justify-center">
                <form className="p-4" ref={Raison}>
                    <textarea id="notRaisonRessource" name="raison" type="text" rows="2" cols="10" />
                    <button className="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400 text-white " onClick={() => deleteDemandeRessource(ressource)}>Envoyer la raison du refus</button>
                </form>
            </div>

        </div>
    )
}

export const RowsRessourcesModRef = ({ ressource, categorie }) => {
    let array = [voirRelations(ressource)];
    return (
        <div className="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg shadow-lg shadow">
            <div className="col-start-1 col-span-3 text-justify	">
                {ressource.titreRessource} <br />
                crée le {moment(ressource.dateRessource).format("LL")}<br />
            </div>
            <div className="col-start-4 flex items-center justify-center">
                {ressource.validerRessource === true && <li>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="green" className="w-10 h-10" viewBox="0 0 576 512">
                            <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                        </svg>
                    </a>
                </li>
                }
                {ressource.validerRessource === false && <li>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" className="w-10 h-10" viewBox="0 0 576 512">
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />                        </svg>
                    </a>
                    <span>{ressource.notRaisonRessource}</span>
                </li>
                }
                {ressource.validerRessource === null && <li>
                    <a className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="orange" viewBox="0 0 576 512">
                            <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />                        </svg>
                    </a>
                    <span>En attente</span>
                </li>
                }
            </div>
            <div className="col-start-5">
                {getCategorie(categorie, ressource.idCategorie)[1]}
            </div>
            <div className="col-start-6">
                {ressource.typeRessource} <br />
                {
                    array.map((items) => {
                        return items.map((id) => {
                            return <p className="col-start-6">  {id} </p>
                        }
                        )
                    })
                }
            </div>
            <div className="flex items-center justify-center">
            </div>
            <div className="flex items-center justify-center">
                <svg onClick={() => deleteRessource(ressource)} className="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
            </div>
        </div>
    )
}

///////////////////////////////////////////// SUPER ADMIN /////////////////////////////////////////////////////

export const RowsCompteSuperAdmin = ({ compte }) => {
    const formRef = useRef();

    function actif(compte) {
        let result;
        if (compte === true) {
            result = "COMPTE ACTIF"
        } else {
            result = "COMPTE NON ACTIF"
        }
        return result;
    }

    async function typeUtilisateur() {
        const {
            editTypeUtilisateur,
        } = formRef.current;
        const typeUtilisateur = editTypeUtilisateur.value;
        await axios.post("../api/compte/editTypeUtilisateur", {
            idCompte: (compte?.idCompte),
            typeUtilisateur,

        });
        window.location.reload();
    }

    return (
        <div className="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div className="col-start-1 col-span-3 text-justify	">
                {compte.nomUtilisateur}{compte.prenomUtilisateur}<br />
                {compte.mailUtilisateur} crée le {moment(compte.dateCreationUtilisateur).format("LL")}
            </div>
            <div className="col-start-5">
                {actif(compte.isActive)}
            </div>
            <div className="col-start-6">
                {compte.typeUtilisateur}
            </div>
            <div className="col-start-7 col-span-2">
                <form ref={formRef}>
                    <select className="w-fit" name="editTypeUtilisateur"
                        id="typeUtilisateur">
                        <option className="p-1" value="USER">Citoyen connecté</option>
                        <option className="p-1" value="MODERATOR">Modérateur</option>
                        <option className="p-1" value="ADMINISTRATOR">Administrateur</option>
                        <option className="p-1" value="SUPER_ADMIN">Super administrateur</option>
                    </select>
                    <button className="mt-2 mb-2 bg-custom-blue hover:bg-custom-blue-200 text-white font-bold text-xl w-fit pr-1 pl-1 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" onClick={() => typeUtilisateur()}>Valider</button>
                </form>
            </div>

        </div >


    )
}