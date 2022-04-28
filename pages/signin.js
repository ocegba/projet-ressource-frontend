import Head from 'next/head'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function signin() {
    const { register, formState: { errors } } = useForm();
    const [open, setOpen] = useState(true);

    return (

        <div class="flex items-center flex-col justify-center w-full p-5 bg-white h-max">
            <Head>
                <title>Se connecter</title>
                <meta name="description" content="Page de connexion" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <form method="post" action="api/profil" class="bg-custom-blue/50 border-gray-200 rounded-3xl border-solid border-0 box-border justify-center relative w-3/5 h-5/6 shadow-xl">
                <p class="m-auto not-italic font-bold text-5xl text-center py-3.5">Se connecter</p>
                <p class="text-2xl leading-7 text-center m-auto pr-4 pl-0 py-2">Connectez-vous et profitez des ressources !</p>
                <input class="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adresse mail"
                    {...register("email", { required: "Un email valide est requis.", pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } })} />
                {errors.email && <p class="text-red-700 mr-12 text-right">{errors.email.message}</p>}
                <input class="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    {...register("password", { required: "Un mot de passe valide est requis.", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", minLength: { value: 8, message: "Le mot de passe est trop court" }, maxength: { value: 15, message: "Le mot de passe est trop long" } })} />
                {errors.password && <p class="text-red-700 mr-12 text-right">{errors.password.message}</p>}

                <button class="h-20 bg-custom-blue text-white font-bold text-3xl w-fit pr-2 pl-2 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
                    <span>S'identifier</span>
                </button>
                <p class="pl-2">Si perte de mot de passe, contactez le support technique</p>

            </form>
        </div >
    )
}

export default signin
