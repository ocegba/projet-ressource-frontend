import Head from 'next/head'
import { useRef } from "react";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

function Signup() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [data, setData] = useState();

    const password = useRef({});
    password.current = watch("password", "");

    return (
        <div className="flex items-center flex-col justify-center w-full p-5 bg-white h-max">
            <Head>
                <title>S'inscrire</title>
                <meta name="description" content="Inscrivez-vous pour participez aux activités" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))} */}
            <form method="post"  action="/api/register" className="bg-custom-blue/50 border-gray-200 rounded-3xl border-solid border-0 box-border justify-center relative w-3/5 h-5/6 shadow-xl">
                <p className="m-auto not-italic font-bold text-5xl text-center py-3.5">Créez votre compte</p>
                <p className="text-2xl leading-7 text-center m-auto pr-4 pl-0 py-2">Créez votre compte et profitez des ressources !</p>
                <input className="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Pseudo"
                    {...register("username", { required: "Un pseudonyme valide est requis.", pattern: "^([a-zA-Z0-9-_]{2,36})$", minLength: { value: 5, message: "Le pseudo est trop court" }, maxength: { value: 12, message: "Le pseudo est trop long" } })}
                />
                {errors.username && <p className="text-red-700 mr-12 text-right">{errors.username.message}</p>}

                <input className="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adresse mail"
                    {...register("email", { required: "Un email valide est requis.", pattern: "^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$" })} />
                {errors.email && <p className="text-red-700 mr-12 text-right">{errors.email.message}</p>}

                <input className="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    {...register("password", { required: "Un mot de passe valide est requis.", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", minLength: { value: 8, message: "Le mot de passe est trop court" }, maxength: { value: 15, message: "Le mot de passe est trop long" } })} />
                {errors.password && <p className="text-red-700 mr-12 text-right">{errors.password.message}</p>}

                <input className="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Vérifiez le mot de passe"
                    {...register("confirmpassword", { validate: confirmpassword => confirmpassword === password.current || "Le mot de passe n'est pas identique." })} />
                {errors.confirmpassword && <p className="text-red-700 mr-12 text-right">{errors.confirmpassword.message}</p>}

                <button className="h-20 bg-custom-blue text-white font-bold text-3xl w-fit pr-2 pl-2 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300  ">
                    <span>Créez votre compte</span>
                </button>

                {data}
                <div>
                    <Link className="block text-sm text-right text-indigo-700 pr-3 underline" href="/signin">Déjà inscrit ? Connectez-vous</Link>
                </div>

                <p className="justify-center items-center ml-5">En créant un compte, vous acceptez <Link color='blue' href="#">les règles de confidentialité et conditions d'utilisation</Link>.</p>

            </form>
        </div >
    )
}

export default Signup;