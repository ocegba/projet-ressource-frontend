import styles from '../styles/signup.module.css';
import { useRef } from "react";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

function validCompte() {

}

function signin() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = useRef({});
    password.current = watch("password", "");
    const [userInfo, setUserInfo] = useState();
    const onSubmit = (data) => {
        setUserInfo(data);
        console.log(data);
    }
    console.log(errors);

    return (
        <div className={styles.container}>
            <form method="post" onSubmit={handleSubmit(onSubmit)} className={styles.login}>
                <p className={styles.title}>Créer votre compte</p>
                <p className={styles.subtitle}>Créer votre compte et profitez des ressources !</p>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Pseudo"
                    {...register("username", { required: "Un pseudonyme valide est requis.", pattern: "[A-Za-z0-9]+", minLength: { value: 5, message: "Le pseudo est trop court" }, maxength: { value: 12, message: "Le pseudo est trop long" } })}
                />
                {errors.username && <p className={styles.errors}>{errors.username.message}</p>}

                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adresse mail"
                    {...register("email", { required: "Un email valide est requis.", pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } })} />
                {errors.email && <p className={styles.errors}>{errors.email.message}</p>}

                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Mot de passe"
                    {...register("password", { required: "Un mot de passe valide est requis.", pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$", minLength: { value: 8, message: "Le mot de passe est trop court" }, maxength: { value: 15, message: "Le mot de passe est trop long" } })} />
                {errors.password && <p className={styles.errors}>{errors.password.message}</p>}

                <input
                    type="password"
                    id="confirmpassword"
                    name="confirmpassword"
                    placeholder="Vérifiez le mot de passe"
                    {...register("confirmpassword", {validate: value => value === password.current || "Le mot de passe n'est pas identique."})} />
                {errors.confirmpassword && <p className={styles.errors}>{errors.confirmpassword.message}</p>}

                <button>
                    <span>Créez votre compte</span>
                </button>
                <div>
                    <a href="/signin">Déjà inscrit ? Connectez-vous</a>
                </div>

                <p>En créant un compte, vous acceptez <a color='blue' href="#">les règles de confidentialité et conditions d'utilisation</a>.</p>

            </form>
        </div >
    )
}

export default signin;