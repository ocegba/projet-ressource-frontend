import prisma from '../../../prisma/prisma'

export default async (req, res) => {
    const {
        prenomUtilisateur,
        nomUtilisateur,
        pseudoUtilisateur,
        regionUtilisateur,
        mailUtilisateur,
        ageUtilisateur,
        departementUtilisateur,
    } = req.body;

    try {
        const updateInfo = await prisma.compte.update({
            where: {
                pseudoUtilisateur: "oceane",
            },
            data: {
                prenomUtilisateur,
                nomUtilisateur,
                pseudoUtilisateur,
                regionUtilisateur,
                mailUtilisateur,
                ageUtilisateur,
                departementUtilisateur,
            }
        });
        res.status(200).json(updateInfo);
    } catch (error) {
        res.status(403).json({ err: "Erreur pendant la modification du compte utilisateur" });
    }
};