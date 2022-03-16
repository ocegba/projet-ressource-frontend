import React from 'react'
import SideBar from '../components/SideBar'
import styles from '../styles/about.module.css'
import Head from 'next/head'

const about = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>(Re)Sources relationnelles</title>
                <meta name="description" content="(Re)Sources relationnelles, un guide pour vos relations" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <div class="w-full h-full p-4 m-8 overflow-y-auto">
                <div class="flex items-center justify-center p-40 border-4 border-dotted">
                    
                </div>
            </div>
        </div>

    )
}

export default about