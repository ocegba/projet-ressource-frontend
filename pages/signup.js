import Head from 'next/head'
import React, { useState, useRef } from 'react';
import { useForm, formState } from 'react-hook-form';
import { Alert, Button, Container, Form } from 'react-bootstrap';

const { Group, Label, Control } = { ...Form }
export default function signin() {
    const { register, handleSubmit, formState, watch } = useForm();
    const { isValid, errors } = formState;
    const [data, setData] = useState();

    const password = useRef({});
    password.current = watch("password", "");
    const onSubmit = data => console.log(data);

    return (
        <div class="flex items-center flex-col justify-center w-full p-5 bg-white h-max">
            <Head>
                <title>S'inscrire</title>
                <meta name="description" content="Inscrivez-vous pour participez aux activités" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container class="relative w-3/5 h-5/6 ">
                {/*method="post"  action="/api/register"*/}
                 <form onSubmit={handleSubmit(onSubmit)}   class="bg-custom-blue/50 border-gray-200 rounded-3xl border-solid border-0 box-border justify-center shadow-xl"> 
                    <p class="m-auto not-italic font-bold text-5xl text-center py-3.5">Créez votre compte</p>
                    <p class="text-2xl leading-7 text-center m-auto pr-4 pl-0 py-2">Créez votre compte et profitez des ressources !</p>

                    <div class="mb-2.5 p-4 m-auto">
                        {(!formState.isValid && formState.isSubmitted) ?
                        <Alert variant="danger">
                            {Object.values(formState.errors).map((e, idx) => {
                                return (<p class="bg-red-200" key={idx}>{e.message}</p>)
                            })}
                        </Alert>
                        :
                        <Alert class="bg-vert-200" variant="success">Remplissez le formulaire</Alert>
                    }
                    </div>
                    

                    <Group>
                        <Control class="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Pseudo"
                            {...register("username", {
                                required: {
                                    value: true,
                                    message: "Il faut renseigner un pseudo avant de continuer"
                                },
                                pattern: {
                                    value: /^([a-zA-Z0-9-_]{2,36})$/,
                                    message: "Un pseudonyme valide est requis"
                                },
                                minLength: {
                                    value: 5,
                                    message: "Le pseudonyme est trop court"
                                },
                                maxength: {
                                    value: 15,
                                    message: "Le pseudonyme est trop long"
                                }
                            })}
                        />

                    </Group>

                    <Group>
                        <Control class="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Adresse mail"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Un email valide est requis"
                                }, pattern: {
                                    value: /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)*$/,
                                    message: "Un email valide est requis"
                                }
                            })}
                        />
                    </Group>

                    <Group>
                        <Control class="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mot de passe"
                            {...register("password", {
                                required: {
                                    value: true,
                                    message: "Un mot de passe valide est requis"
                                }, pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Le mot de passe doit posseder une lettre minisucule, une lettre majuscule, et un caractère spécial : @$!%*?&"
                                },
                                minLength: {
                                    value: 8,
                                    message: "Le mot de passe est trop court : minimum 8 caractères"
                                },
                                maxength: {
                                    value: 15,
                                    message: "Le mot de passe est trop long"
                                }
                            })} />
                    </Group>

                    <Group>
                        <Control class="appearance-none bg-white rounded-2xl border-solid border-2 box-border block text-base leading-6 w-10/12  mx-auto mt-auto mb-2.5 px-2.5 py-3.5 text-black transition-all focus:border-l-[35px] focus:border-custom-blue "
                            type="password"
                            id="confirmpassword"
                            name="confirmpassword"
                            placeholder="Vérifiez le mot de passe"
                            {...register("confirmpassword", { validate: value => value === password.current || "Le mot de passe n'est pas identique." })} />
                    </Group>

                    <Group>
                        <Button type="submit" class="h-20 bg-custom-blue text-white font-bold text-3xl w-fit pr-2 pl-2 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300">
                            Créez votre compte
                        </Button>
                    </Group>


                    <div>
                        <a class="block text-sm text-right text-indigo-700 pr-3 underline" href="/signin">Déjà inscrit ? Connectez-vous</a>
                    </div>

                    <p class="justify-center items-center ml-5">En créant un compte, vous acceptez <a color='blue' href="#">les règles de confidentialité et conditions d'utilisation</a>.</p>
                </form>
            </Container>
        </div >
    )
}