import React, { useRef, useState } from "react"
import Head from 'next/head'

const InfoUpdate = () => {

    const formRef = useRef();

    async function updateCompteInfo(params) {
        const {
            updatePrenomUtilisateur,
            updateNomUtilisateur,
            updateRessourcesTypeRessource,
            updateRegionUtilisateur,
            updateMail,
            updateDépartement,
            updateAge
        } = formRef.current;
        const prenomUtilisateur = updatePrenomUtilisateur.value;
        const nomUtilisateur = updateNomUtilisateur.value;
        const pseudoUtilisateur = updateRessourcesTypeRessource.value;
        const regionUtilisateur = updateRegionUtilisateur.value;
        const mailUtilisateur = updateMail.value;
        const departementUtilisateur = updateDépartement.value;
        const ageUtilisateur = updateAge.value;
        await axios.post("/api/parametres/updateCompte", {
            prenomUtilisateur,
            nomUtilisateur,
            pseudoUtilisateur,
            regionUtilisateur,
            mailUtilisateur,
            ageUtilisateur,
            departementUtilisateur,
        });
        alert("Informations modifiées ! ")
        window.location.reload();
    }

    return (
        <div class="flex flex-column portrait:flex-col w-full h-fit">
            <form i ref={formRef} d="formUpdate" class="grid gap-0 grid-cols-2 portrait:grid-cols-1">

                <div class="flex flex-col min-h-80 mt-15 w-10/12 my-3">
                    <label class="text-xl" for="prenomUtilisateur">Prénom</label>
                    <input class="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10" maxlength="50"
                        type="text"
                        name="updatePrenomUtilisateur"
                        id="prenomUtilisateur"
                    />
                </div>

                <div class="flex flex-col min-h-80 mt-15 w-10/12 my-3">
                    <label class="text-xl" for="nomUtilisateur">Nom</label>
                    <input class="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                        name="updateNomUtilisateur"
                        id="nomUtilisateur"
                    />
                </div>

                <div class="flex flex-col min-h-80 mt-15 w-10/12 my-3">
                    <label class="text-xl" for="pseudoUtilisateur">Pseudo</label>
                    <input class="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                        name="updatePseudoUtilisateur"
                        id="pseudoUtilisateur"
                    />
                </div>

                <div class="flex flex-col min-h-80 mt-15 w-10/12 my-3">
                    <label class="text-xl" for="mailUtilisateur">E-mail</label>
                    <input class="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                        type="mail"
                        name="updateMail"
                        id="mailUtilisateur" />
                </div>

                <div class="flex flex-col min-h-80 mt-15 w-10/12 my-3">
                    <label class="text-xl" for="ageUtilisateur">Âge</label>
                    <input type="number" class="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                        name="updateAge"
                        id="ageUtilisateur"
                        min="1" max="100" />
                </div>

                <div class="flex flex-col min-h-80 mt-15 w-10/12 my-3">
                    <label class="text-xl">Département</label>
                    <input class="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                        name="updateDépartement"
                        list="departement"
                        placeholder='Département'

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

                <div class="flex flex-col min-h-80 mt-15 w-10/12 my-3">
                    <label class="text-xl" for="regionUtilisateur">Régions</label>
                    <input class="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-10"
                        name="updateRegionUtilisateur"
                        list="regions"
                        id="regionUtilisateur">


                    </input>
                    <datalist id="regions">
                        <option value="" />
                        <option value="Île-de-France">Île-de-France</option>
                        <option value="Provence-Alpes-Côte d'Azur">Provence-Alpes-Côte d'Azur</option>
                        <option value="Pays de la Loire">Pays de la Loire</option>
                        <option value="Occitanie">Occitanie</option>
                        <option value="Nouvelle-Aquitaine">Nouvelle-Aquitaine</option>
                        <option value="Normandie">Normandie</option>
                        <option value="Mayotte">Mayotte</option>
                        <option value="Martinique">Martinique</option>
                        <option value="La Réunion">La Réunion</option>
                        <option value="Hauts-de-France">Hauts-de-France</option>
                        <option value="Guyane">Guyane</option>
                        <option value="Guadeloupe">Guadeloupe</option>
                        <option value="Grand Est">Grand Est</option>
                        <option value="Corse">Corse</option>
                        <option value="Centre-Val de Loire">Centre-Val de Loire</option>
                        <option value="Bretagne">Bretagne</option>
                        <option value="Bourgogne-Franche-Comté">Bourgogne-Franche-Comté</option>
                        <option value="Auvergne-Rhône-Alpes">Auvergne-Rhône-Alpes</option>
                    </datalist>
                </div>

                <div class="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                    <button class="h-20 mt-3 mb-3 bg-custom-blue text-white font-bold text-3xl portrait:text-2xl w-fit pr-2 pl-2 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" onClick={() => updateCompteInfo()}>Sauvegarder les changements</button>
                </div>
            </form >
        </div>
    )
}

export default InfoUpdate;