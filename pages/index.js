import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Resources relationnelles</title>
        <meta name="description" content="Resources relationnelles, un guide pour vos relations" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>this is an homepage</h1> 
    </div>
  )
}
