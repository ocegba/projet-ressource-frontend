import Head from 'next/head'
import { useRef } from "react";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const MdpUpdate = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const updateMdp = useRef({});
    updateMdp.current = watch("password", "");

    async function updateMotdepasse(params) {
        const {
            updateMdp,
        } = formRef.current;
        const mdpUtilisateur = updateMdp.value;
        await axios.post("/api/parametres/updateMdp", {
            mdpUtilisateur,
        });
        alert("Mot de passe modifié")
        window.location.reload();
    }
    return (
        <div className="flex flex-column portrait:flex-col w-full h-fit">
            <form i d="formUpdate" className="portrait:grid-cols-1">
                <div className="grid gap-3 grid-cols-2 portrait:grid-cols-1 ">
                    <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                        <label className="text-xl" for="mdp">Mot de passe actuel</label>
                        <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-11" maxlength="50"
                            type="password"
                            name="mdp"
                            id="mdp"
                        />
                    </div>

                    <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                        <label className="text-xl" for="mdpUtilisateur">Nouveau de mot de passe</label>
                        <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-11" maxlength="50"
                            type="password"
                            name="updateMdp"
                            id="mdpUtilisateur"
                            {...register("updateMdp", {
                                required: "Un mot de passe valide est requis.",
                                pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
                                minLength: { value: 8, message: "Le mot de passe est trop court" }, maxength: { value: 15, message: "Le mot de passe est trop long" }
                            })} />
                    </div>

                    <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                        <label className="text-xl" for="mdpUtilisateur">Confirmation du mot de passe</label>
                        <input className="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-11" maxlength="50"
                            type="password"  {...register("confirmpassword", { validate: confirmpassword => confirmpassword === updateMdp.current || "Le mot de passe n'est pas identique." })} />
                    </div>
                </div>
                <div>
                    <p className="font-medium leading-5">Mot de passe exigé</p>
                    <p className="font-normal leading-5 mb-1 text-gray-500">
                        Assurez-vous que ces exigences sont remplies :</p>
                    <p>
                        Le mot de passe doit contenir une lettre minuscule minimum <br />
                        Le mot de passe doit contenir une lettre majuscule minimum <br />
                        Le mot de passe doit contenir un chiffre minimum <br />
                        Le mot de passe doit avoir entre 8 et 15 caractères<br />
                        Le mot de passe doit contenir au moins un de ces caractères spéciaux : ?=.*[@$!%*?&]<br />

                    </p>
                </div>
                <div className="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                    <button className="h-20 mt-3 mb-3 bg-custom-blue text-white font-bold text-3xl portrait:text-2xl w-fit pr-2 pl-2 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300" type="submit" onClick={() => updateMotdepasse()}>Sauvegarder les changements</button>
                </div>
            </form>
        </div>
    )
}

export default MdpUpdate