import Head from 'next/head'
import styles from '../styles/signin.module.css'
import React from 'react';
import { useForm } from 'react-hook-form';

function signin() {
    const { register,  formState: { errors }} = useForm();

    return (
            
        <div className={styles.wrapper}>
            <Head>
            <title>Se connecter</title>
            <meta name="description" content="Page de connexion" />
            <link rel="icon" href="/favicon.ico" />
            </Head>
            <form  method="post" action="/profil" className={styles.login}>
                <p className={styles.title}>Se connecter</p>
                <p className={styles.subtitle}>Connectez-vous et profitez des ressources !</p>
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

                <button>
                    <span className={styles.state}>S'identifier</span>
                </button>
                <div className={styles.inputmailforgotdialog} role="document">
                    <div className={styles.inputmailforgotcontent} clearfix>
                        <a href="/forgotpsswd">Mot de passe perdu ?</a>
                    </div>
                </div>

            </form>
        </div >
  )
}

export default signin
