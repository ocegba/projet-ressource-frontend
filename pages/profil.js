import React from 'react'
import SideBar from '../components/SideBar'
import styles from '../styles/about.module.css'
import Head from 'next/head'
import Table, { SelectColumnFilter, StatusPill } from "../components/Table";

const profil = () => {
    // 3 fonctions getData,data  et colums pour les ressources crées, participation aux ressources et les commentaires

    /* RESSOURCES CREES  à remplacer avec les fonctions adéquates selon profil*/
    const getDataCRessource = () => {
        const data = [
            {
                name: "Jane Cooper",
                email: "jane.cooper@example.com",
                title: "Regional Paradigm Technician",
                department: "Optimization",
                age: 27,
                status: "Active",
                role: "Admin",
                imgUrl:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Cody Fisher",
                email: "cody.fisher@example.com",
                title: "Product Directives Officer",
                department: "Intranet",
                age: 27,
                status: "Active",
                role: "Owner",
                imgUrl:
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Esther Howard",
                email: "esther.howard@example.com",
                title: "Forward Response Developer",
                department: "Directives",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Jenny Wilson",
                email: "jenny.wilson@example.com",
                title: "Central Security Manager",
                department: "Program",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Kristin Watson",
                email: "kristin.watson@example.com",
                title: "Lean Implementation Liaison",
                department: "Mobility",
                age: 27,
                status: "Active",
                role: "Admin",
                imgUrl:
                    "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Cameron Williamson",
                email: "cameron.williamson@example.com",
                title: "Internal Applications Engineer",
                department: "Security",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
        ]
        return [...data, ...data, ...data]
    };

    const columnsCRessource = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Age",
                accessor: 'age',
            },
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: StatusPill,
            },
            {
                Header: "Role",
                accessor: "role",
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
        ],
        []
    );

    const dataCRessource = React.useMemo(() => getDataCRessource(), []);

    /* PARTICIPATIONS AUX RESSOURCES  à remplacer avec les fonctions adéquates* */
    const getDataPRessource = () => {
        const data = [
            {
                name: "Jane Cooper",
                email: "jane.cooper@example.com",
                title: "Regional Paradigm Technician",
                department: "Optimization",
                age: 27,
                status: "Active",
                role: "Admin",
                imgUrl:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Cody Fisher",
                email: "cody.fisher@example.com",
                title: "Product Directives Officer",
                department: "Intranet",
                age: 27,
                status: "Active",
                role: "Owner",
                imgUrl:
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Esther Howard",
                email: "esther.howard@example.com",
                title: "Forward Response Developer",
                department: "Directives",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Jenny Wilson",
                email: "jenny.wilson@example.com",
                title: "Central Security Manager",
                department: "Program",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Kristin Watson",
                email: "kristin.watson@example.com",
                title: "Lean Implementation Liaison",
                department: "Mobility",
                age: 27,
                status: "Active",
                role: "Admin",
                imgUrl:
                    "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Cameron Williamson",
                email: "cameron.williamson@example.com",
                title: "Internal Applications Engineer",
                department: "Security",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
        ]
        return [...data, ...data, ...data]
    };

    const columnsPRessource = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Age",
                accessor: 'age',
            },
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: StatusPill,
            },
            {
                Header: "Role",
                accessor: "role",
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
        ],
        []
    );

    const dataPRessource = React.useMemo(() => getDataPRessource(), []);

    /* COMMENTAIRES à remplacer avec les fonctions adéquates*/
    const getDataCommentaires = () => {
        const data = [
            {
                name: "Jane Cooper",
                email: "jane.cooper@example.com",
                title: "Regional Paradigm Technician",
                department: "Optimization",
                age: 27,
                status: "Active",
                role: "Admin",
                imgUrl:
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Cody Fisher",
                email: "cody.fisher@example.com",
                title: "Product Directives Officer",
                department: "Intranet",
                age: 27,
                status: "Active",
                role: "Owner",
                imgUrl:
                    "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Esther Howard",
                email: "esther.howard@example.com",
                title: "Forward Response Developer",
                department: "Directives",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Jenny Wilson",
                email: "jenny.wilson@example.com",
                title: "Central Security Manager",
                department: "Program",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Kristin Watson",
                email: "kristin.watson@example.com",
                title: "Lean Implementation Liaison",
                department: "Mobility",
                age: 27,
                status: "Active",
                role: "Admin",
                imgUrl:
                    "https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
            {
                name: "Cameron Williamson",
                email: "cameron.williamson@example.com",
                title: "Internal Applications Engineer",
                department: "Security",
                age: 27,
                status: "Active",
                role: "Member",
                imgUrl:
                    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
            },
        ]
        return [...data, ...data, ...data]
    };

    const columnsCommentaires = React.useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Age",
                accessor: 'age',
            },
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: StatusPill,
            },
            {
                Header: "Role",
                accessor: "role",
                Filter: SelectColumnFilter,
                filter: 'includes',
            },
        ],
        []
    );

    const dataCommentaires = React.useMemo(() => getDataCommentaires(), []);

    return (
        <div class="flex">
            <Head>
                <title>Mon profil</title>
                <meta name="description" content="(Re)Sources relationnelles, un guide pour vos relations" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
            <div class="w-full h-full p-4 m-8 overflow-y-auto space-y-10">
                <div>
                    <h3 class="font-medium leading-tight text-3xl mt-0 mb-2">Mes ressources crées</h3>
                    <Table columns={columnsCRessource} data={dataCRessource} />
                </div>

                <div>
                    <h3 class="font-medium leading-tight text-3xl mt-0 mb-2">Je participe à ces ressources</h3>
                    <Table columns={columnsPRessource} data={dataPRessource} />
                </div>

                <div>
                    <h3 class="font-medium leading-tight text-3xl mt-0 mb-2">Mes commentaires</h3>
                    <Table columns={columnsCommentaires} data={dataCommentaires} />
                </div>
            </div>
        </div>
    )
}

export default profil