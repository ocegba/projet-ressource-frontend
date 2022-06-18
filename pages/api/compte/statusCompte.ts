import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

const defaultFonction = async (req, res) => {
  const data = req.body;
  try {
    const statusCompte = await prisma.compte.update({
      select: {
        isActive: true
      },
      where: {
        idCompte: data.idCompte,
      },
      data: {
        isActive: !(data.isActive),
      }
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((statusCompte))));
  } catch (error) {
    console.log(error)
    res.status(403).json({ err: "Erreur pendant l'activation/désactivation d'un compte" });
  }
};

export default defaultFonction;