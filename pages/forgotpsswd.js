import styles from '../styles/forgotpsswd.module.css'
import React from 'react';
import { useForm } from 'react-hook-form';

function forgotpsswd() {
    const { register,  formState: { errors }} = useForm()

    return (
        <div className={styles.wrapper}>
            <form className={styles.login}>
                <p className={styles.subtitle}>Entrez votre adresse email, nous vous enverons un lien de réinitilalisation</p>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adresse mail"
                    {...register("email", { required: "Un email valide est requis.", pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ } })} />
                {errors.email && <p className={styles.errors}>{errors.email.message}</p>}

                <button>
                    <span className={styles.state}>Reset</span>
                </button>
            </form>
        </div >
  )
}

export default forgotpsswd