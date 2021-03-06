import prisma from '../../../prisma/prisma'

const defaultFonction = async (req, res) => {
  const { pseudoUtilisateur } = req.body;
  try {
    const deleteCompte = await prisma.compte.delete({
      where: {
        pseudoUtilisateur,
      },
    });
    res.status(200).json(deleteCompte);
  } catch (error) {
    res.status(403).json({ err: "Erreur pendant la suppression du compte" });
  }
};

export default defaultFonction;