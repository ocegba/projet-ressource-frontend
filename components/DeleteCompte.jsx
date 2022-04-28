import Head from 'next/head'
import { useRef } from "react";
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const DeleteCompte = () => {

    return (
        <div class="flex flex-column portrait:flex-col w-full h-fit">
            <form method="post" id="formDelete" action="/api/delete" class="portrait:grid-cols-1">
                <div class="grid gap-3 grid-cols-2 portrait:grid-cols-1 ">
                    <div class="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                        <label class="text-xl">Entrez votre email</label>
                        <input  class="bg-white border-0 rounded-2xl font-medium shadow-xl h-14 pl-11" type="email" id="email" name="email" />
                    </div>
                </div>
                <div class="flex flex-col min-h-80 mt-15 w-11/12 my-3">
                    <button class="h-20 mt-3 mb-3 bg-red-500 text-white font-bold text-3xl portrait:text-2xl w-fit pr-2 pl-2 rounded-xl block m-auto cursor-pointer rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-300" type="submit">Supprimer son compte</button>
                </div>
            </form>
        </div>
    )
}

export default DeleteCompte