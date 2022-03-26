import React from 'react'

/*requete si c'est un moderateur ou admin */
function strRoleUser() {
    var roleUser = ["citoyen connecté", "modérateur", "administrateur"]
    // var item = roleUser[Math.floor(Math.random() * roleUser.length)];
    var item = "administrateur"
    return item
}

function isUser() {
    if (strRoleUser() === "administrateur" || strRoleUser() === "modérateur") {
        return true
    } else {
        return false
    }
}

const SideBar = () => {
    return (
        <div class="flex">
            <div class="flex flex-col w- h-screen px-10 py-8 overflow-y-auto border-r">
                <div class="flex flex-col justify-between mt-6">
                    <aside>
                        <ul>
                            <li>
                                <a class="flex items-center px-4 py-2 mt-5 text-gray-700 bg-gray-100 rounded-md ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" /></svg>
                                    {strRoleUser().charAt(0).toUpperCase()+ strRoleUser().slice(1)}</a>
                            </li>

                            {/* requete si c'est un moderateur ou admin */}
                            {isUser() == true && <li>
                                <a href="dashboard" class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200">
                                <svg xmlns="http://www.w3.org/2000/svg"  class="w-6 h-6" viewBox="0 0 576 512"><path d="M64 400C64 408.8 71.16 416 80 416H480C497.7 416 512 430.3 512 448C512 465.7 497.7 480 480 480H80C35.82 480 0 444.2 0 400V64C0 46.33 14.33 32 32 32C49.67 32 64 46.33 64 64V400zM342.6 278.6C330.1 291.1 309.9 291.1 297.4 278.6L240 221.3L150.6 310.6C138.1 323.1 117.9 323.1 105.4 310.6C92.88 298.1 92.88 277.9 105.4 265.4L217.4 153.4C229.9 140.9 250.1 140.9 262.6 153.4L320 210.7L425.4 105.4C437.9 92.88 458.1 92.88 470.6 105.4C483.1 117.9 483.1 138.1 470.6 150.6L342.6 278.6z"/></svg>
                                    <span class="mx-4 font-medium">Dashboard</span>
                                </a>
                            </li>}

                            <li>
                                <a href="parametres" class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 576 512"><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z" /></svg>
                                    <span class="mx-4 font-medium">Paramètres</span>
                                </a>
                            </li>

                            <li>
                                <a class="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md hover:bg-gray-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 576 512"><path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" /></svg>
                                    <span class="mx-4 font-medium">Se déconnecter</span>
                                </a>
                            </li>
                        </ul>

                    </aside>

                </div>
            </div>
        </div>
    )
}

export default SideBar;