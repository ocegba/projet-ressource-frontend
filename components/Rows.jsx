import React from 'react'
import moment from 'moment'
import 'moment/locale/fr'
moment.locale('fr')

export const RowsRessources = ({ ressource }) => {
    return (
        <div class="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg shadow-lg shadow">
            <div class="col-start-1 col-span-3 text-justify	">
                {ressource.titreRessource} <br />
                crée le {moment(ressource.dateRessource).format("LL")}<br />
            </div>
            <div class="col-start-4 flex items-center justify-center">
                {ressource.validerRessource === true && <li>
                    <a>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="green" class="w-10 h-10" viewBox="0 0 576 512">
                            <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                        </svg>
                    </a>
                </li>
                }
                {ressource.validerRessource === false && <li>
                    <a class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" class="w-10 h-10" viewBox="0 0 576 512">
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />                        </svg>
                    </a>
                    <span>{ressource.notRaisonRessource}</span>
                </li>
                }
                {ressource.validerRessource === null && <li>
                    <a class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="orange" viewBox="0 0 576 512">
                            <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />                        </svg>
                    </a>
                    <span>En attente</span>
                </li>
                }
            </div>
            <div class="col-start-5">
                {ressource.categorieRessource}
            </div>
            <div class="col-start-6">
                {ressource.typeRessource} <br />
                {ressource.typeRelationRessource}
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-blue-300" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V299.6L289.3 394.3C281.1 402.5 275.3 412.8 272.5 424.1L257.4 484.2C255.1 493.6 255.7 503.2 258.8 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256zM564.1 250.1C579.8 265.7 579.8 291 564.1 306.7L534.7 336.1L463.8 265.1L493.2 235.7C508.8 220.1 534.1 220.1 549.8 235.7L564.1 250.1zM311.9 416.1L441.1 287.8L512.1 358.7L382.9 487.9C378.8 492 373.6 494.9 368 496.3L307.9 511.4C302.4 512.7 296.7 511.1 292.7 507.2C288.7 503.2 287.1 497.4 288.5 491.1L303.5 431.8C304.9 426.2 307.8 421.1 311.9 416.1V416.1z" />
                </svg>
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
            </div>
        </div>
    )
}

export const RowsCommentaires = ({ commentaire }) => {
    return (
        <div class="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div class="col-start-1 col-span-6 text-justify	">
                {commentaire.contenuCommentaire} <br />
                crée le {moment(commentaire.dateCommentaire).format("LL")}<br />
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-blue-300 " xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V299.6L289.3 394.3C281.1 402.5 275.3 412.8 272.5 424.1L257.4 484.2C255.1 493.6 255.7 503.2 258.8 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256zM564.1 250.1C579.8 265.7 579.8 291 564.1 306.7L534.7 336.1L463.8 265.1L493.2 235.7C508.8 220.1 534.1 220.1 549.8 235.7L564.1 250.1zM311.9 416.1L441.1 287.8L512.1 358.7L382.9 487.9C378.8 492 373.6 494.9 368 496.3L307.9 511.4C302.4 512.7 296.7 511.1 292.7 507.2C288.7 503.2 287.1 497.4 288.5 491.1L303.5 431.8C304.9 426.2 307.8 421.1 311.9 416.1V416.1z" />
                </svg>
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
            </div>
        </div>
    )
}

export const RowsParticipate = ({ actions }) => {
    return (
        <div class="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div class="col-start-1 col-span-4 text-justify	">
                titre <br />
                crée le <br />
            </div>
            <div class="col-start-5">
                catégories
            </div>
            <div class="col-start-6">
                relations
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-blue-300" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 560 550">
                    <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />                </svg>
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 550 550">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
            </div>
        </div>
    )
}

export const RowsFavoris = ({ actions }) => {
    return (
        <div class="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div class="col-start-1 col-span-4 text-justify	">
                titre <br />
                crée le <br />
            </div>
            <div class="col-start-5">
                catégories
            </div>
            <div class="col-start-6">
                relations
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-blue-300" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 560 550">
                    <path d="M279.6 160.4C282.4 160.1 285.2 160 288 160C341 160 384 202.1 384 256C384 309 341 352 288 352C234.1 352 192 309 192 256C192 253.2 192.1 250.4 192.4 247.6C201.7 252.1 212.5 256 224 256C259.3 256 288 227.3 288 192C288 180.5 284.1 169.7 279.6 160.4zM480.6 112.6C527.4 156 558.7 207.1 573.5 243.7C576.8 251.6 576.8 260.4 573.5 268.3C558.7 304 527.4 355.1 480.6 399.4C433.5 443.2 368.8 480 288 480C207.2 480 142.5 443.2 95.42 399.4C48.62 355.1 17.34 304 2.461 268.3C-.8205 260.4-.8205 251.6 2.461 243.7C17.34 207.1 48.62 156 95.42 112.6C142.5 68.84 207.2 32 288 32C368.8 32 433.5 68.84 480.6 112.6V112.6zM288 112C208.5 112 144 176.5 144 256C144 335.5 208.5 400 288 400C367.5 400 432 335.5 432 256C432 176.5 367.5 112 288 112z" />
                </svg>
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-yellow-300 hover:bg-yellow-400 p-3 rounded-lg cursor-pointer shadow-lg shadow-yellow-200" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 560 550">
                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                </svg>
            </div>
        </div>
    )
}

export const RowsRessourcesAdmin = ({ ressource }) => {
    return (
        <div class="grid grid-cols-9 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div class="col-start-1 col-span-3 text-justify	">
                {ressource.titreRessource} <br />
                crée le {moment(ressource.dateRessource).format("LL")}<br />
            </div>
            <div class="col-start-4">
                {ressource.categorieRessource}
            </div>
            <div class="col-start-5">
                {ressource.typeRessource} <br />
                {ressource.typeRelationRessource}
            </div>
            <div class="col-start-6"></div>
            <div class="flex items-center justify-center">
                <svg class="bg-blue-400 hover:bg-blue-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-blue-300" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M0 64C0 28.65 28.65 0 64 0H224V128C224 145.7 238.3 160 256 160H384V299.6L289.3 394.3C281.1 402.5 275.3 412.8 272.5 424.1L257.4 484.2C255.1 493.6 255.7 503.2 258.8 512H64C28.65 512 0 483.3 0 448V64zM256 128V0L384 128H256zM564.1 250.1C579.8 265.7 579.8 291 564.1 306.7L534.7 336.1L463.8 265.1L493.2 235.7C508.8 220.1 534.1 220.1 549.8 235.7L564.1 250.1zM311.9 416.1L441.1 287.8L512.1 358.7L382.9 487.9C378.8 492 373.6 494.9 368 496.3L307.9 511.4C302.4 512.7 296.7 511.1 292.7 507.2C288.7 503.2 287.1 497.4 288.5 491.1L303.5 431.8C304.9 426.2 307.8 421.1 311.9 416.1V416.1z" />
                </svg>
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-orange-500 hover:bg-orange-500  pl-3 py-1.5 rounded-lg cursor-pointer shadow-lg shadow-orange-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
                </svg>
            </div>

            <div class="flex items-center justify-center">
                <svg class="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
            </div>
        </div>
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
        <div class="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div class="col-start-1 col-span-3 text-justify	">
                {compte.nomUtilisateur}{compte.prenomUtilisateur}<br />
                {compte.mailUtilisateur} crée le {moment(compte.dateCreationUtilisateur).format("LL")}
            </div>
            <div class="col-start-5">
                {actif(compte.isActive)}
            </div>
            <div class="col-start-7">
                {compte.typeUtilisateur}
            </div>

            <div class="flex items-center justify-center">
                {actif(compte.isActive) === "COMPTE NON ACTIF" && <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="red" width="60" viewBox="0 0 600 550">
                    <path d="M192 352C138.1 352 96 309 96 256C96 202.1 138.1 160 192 160C245 160 288 202.1 288 256C288 309 245 352 192 352zM384 448H192C85.96 448 0 362 0 256C0 149.1 85.96 64 192 64H384C490 64 576 149.1 576 256C576 362 490 448 384 448zM384 128H192C121.3 128 64 185.3 64 256C64 326.7 121.3 384 192 384H384C454.7 384 512 326.7 512 256C512 185.3 454.7 128 384 128z" />                </svg>}
                {actif(compte.isActive) === "COMPTE ACTIF" && <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" fill="green" width="60" viewBox="0 0 600 550">
                    <path d="M384 64C490 64 576 149.1 576 256C576 362 490 448 384 448H192C85.96 448 0 362 0 256C0 149.1 85.96 64 192 64H384zM384 352C437 352 480 309 480 256C480 202.1 437 160 384 160C330.1 160 288 202.1 288 256C288 309 330.1 352 384 352z" />                </svg>}
            </div>
        </div>
    )
}

export const RowsCommentairesMod = ({ commentaire }) => {
    return (
        <div class="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div class="col-start-1 col-span-4 text-justify">
                {commentaire.contenuCommentaire} <br />
                crée le {moment(commentaire.dateCommentaire).format("LL")}<br />
            </div>
            <div class="col-start-5"></div>
            <div class="col-start-6"></div>
            <div class="flex items-center justify-center">
                <svg class="bg-green-400 hover:bg-green-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-gren-300 " xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 655 535">
                    <path d="M256 32C114.6 32 .0272 125.1 .0272 240c0 49.63 21.35 94.98 56.97 130.7c-12.5 50.37-54.27 95.27-54.77 95.77c-2.25 2.25-2.875 5.734-1.5 8.734C1.979 478.2 4.75 480 8 480c66.25 0 115.1-31.76 140.6-51.39C181.2 440.9 217.6 448 256 448c141.4 0 255.1-93.13 255.1-208S397.4 32 256 32z" />                </svg>
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
            </div>
        </div>
    )
}

export const RowsCompteSuperAdmin = ({ compte }) => {

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
        <div class="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg cursor-pointer shadow-lg shadow">
            <div class="col-start-1 col-span-3 text-justify	">
                {compte.nomUtilisateur}{compte.prenomUtilisateur}<br />
                {compte.mailUtilisateur} crée le {moment(compte.dateCreationUtilisateur).format("LL")}
            </div>
            <div class="col-start-5">
                {actif(compte.isActive)}
            </div>
            <div class="col-start-6">
                {compte.typeUtilisateur}
            </div>
            <div class="col-start-7 col-span-2">
                <form>
                    <select class="w-fit" name="typeUtilisateur">
                        <option class="p-1" value="Modérateur">Modérateur</option>
                        <option class="p-1" value="Administrateur">Administrateur</option>
                        <option class="p-1" value="Super administrateur">Super administrateur</option>
                    </select>
                    <button onClick={() => addNewComment()} class="mt-2 mb-2 bg-custom-blue hover:bg-custom-blue-200 text-white font-bold text-xl w-fit pr-1 pl-1 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" >Valider</button>
                </form>
            </div>

        </div >


    )
}

export const RowsRessourcesMod = ({ ressource }) => {
    return (
        <div class="grid grid-cols-8 gap-4 px-4 py-5 relative flex flex-col min-w-0 break-words bg-white w-full mb-3 shadow-lg rounded-lg shadow-lg shadow">
            <div class="col-start-1 col-span-3 text-justify	">
                {ressource.titreRessource} <br />
                crée le {moment(ressource.dateRessource).format("LL")}<br />
            </div>
            <div class="col-start-4 flex items-center justify-center">
                {ressource.validerRessource == false && <li>
                    <a class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="red" class="w-10 h-10" viewBox="0 0 576 512">
                            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                        </svg>
                    </a>
                    <span>{ressource.notRaisonRessource}</span>
                </li>
                }
                {ressource.validerRessource == null && <li>
                    <a class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="orange" viewBox="0 0 576 512">
                            <path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" />
                        </svg>
                    </a>
                    <span>En attente</span>
                </li>
                }
            </div>
            <div class="col-start-5">
                {ressource.categorieRessource}
            </div>
            <div class="col-start-6">
                {ressource.typeRessource} <br />
                {ressource.typeRelationRessource}
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-green-400 hover:bg-green-500 p-3 rounded-lg cursor-pointer shadow-lg shadow-green-300 hover:bg-green-500" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 450 535">
                    <path d="M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z" />
                </svg>
            </div>
            <div class="flex items-center justify-center">
                <svg class="bg-red-500 hover:bg-red-600 p-3 rounded-lg cursor-pointer shadow-lg shadow-red-400" xmlns="http://www.w3.org/2000/svg" width="50" viewBox="0 0 400 535">
                    <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
                </svg>
            </div>
        </div>
    )
}