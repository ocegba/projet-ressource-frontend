import React from 'react'
import Image from 'next/image'
import logo from "../public/img/logo.gif"
import logoentreprise from "../public/img/logoentreprise.png"
import logoministere from "../public/img/Ministère_des_Solidarités_et_de_la_Santé.png"

const about = () => {
  return (
        <div class="h-fit w-fit ml-2.5">
            <p class="w-auto text-justify text-4xl"><b>(Re)Sources relationnelles</b> a été réalisé par l’entreprise <b>4APPS</b> proposé par le <b>ministère des Solidarités et de la Santé.</b></p>
            <div>
                <Image class="rounded-3xl" src={logo} alt="loading..." width={260} height={260} />
                <Image class="rounded-3xl" src={logoentreprise} alt="loading..." width={260} height={260} />
                <Image class="rounded-3xl" src={logoministere} alt="loading..." width={260} height={260} />
            </div>
            <p class="w-auto text-justify text-4xl">Cette application permet de renforcer les liens entre les citoyens à travers diverses ressources.</p>
        </div>
    )
}

export default about