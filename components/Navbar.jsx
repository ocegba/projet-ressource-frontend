import React, { useState } from 'react'
import Image from 'next/image'
import logo from "../public/img/logo.gif"

/*requete si c'est connecté ou non */
function isLogged() {
  return false
}

const Navbar = () => {
  const [open, setOpen] = useState("");

  return (
    <nav class="bg-black border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
      <div class="container flex flex-wrap justify-between items-center mx-auto">
        <a href="#" class="flex items-center">
          <a href="/" alt="loading..."><Image class="rounded-2xl" src={logo} width={80} height={80} /></a>
        </a>
        <div class="flex pt-5 md:order-2">
          <li>
            {isLogged() == false && <a href="/signup" class="text-white bg-custom-blue hover:bg-slate-400 focus:ring-3 focus:ring-slate-400 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >S'inscrire</a>}
            {isLogged() == true && <a href="/profil/profil" class="text-white bg-custom-blue hover:bg-slate-400 focus:ring-3 focus:ring-slate-400 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Mon profil</a>}
          </li>
          <li>
            {isLogged() == false && <a href="/signin" class="text-white bg-custom-blue hover:bg-slate-400 focus:ring-3 focus:ring-slate-400 font-medium rounded-lg text-xl px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >Se connecter</a>}
          </li>
         

          <button onClick={() => setOpen(!open)} data-collapse-toggle="mobile-menu-4" type="button" class="inline-flex items-center p-2 text-xl text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-4" aria-expanded="false">
            <span class="sr-only">Ouvrir le menu principal</span>
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
        </div>
        <div class="md:flex justify-between items-center w-full md:w-auto md:order-1" id="mobile-menu-4">
          {!open ? (
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-xl md:font-medium">
              <li>
                <a href="/createRessource" class="block hover:text-custom-blue py-2 pr-4 pl-3 text-white">Créer une ressource</a>
              </li>
              <li>
                <a href="/searchRessource" class="block hover:text-custom-blue py-2 pr-4 pl-3 text-white">Rechercher une ressource</a>
              </li>
              <li>
                <a href="/about" class="block hover:text-custom-blue py-2 pr-4 pl-3 text-white">À propos</a>
              </li>
              <li>
                {/*requete si c'est connecté ou non */}
                <a href="/help" class="block hover:text-custom-blue py-2 pr-4 pl-3 text-white">Aide</a>
              </li>
            </ul>
          ) : false}
        </div>
      </div>
    </nav>

  )
}

export default Navbar