import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

const defaultFonction = async (req, res) => {
  const { idRessource } = req.body;
  try {
    const deleteRessource = await prisma.ressource.delete({
      where: {
        idRessource: idRessource,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((deleteRessource))));
  } catch (error) {
    console.log(error)
    res.status(403).json({ err: "Erreur pendant la suppression d'une ressource" });
  }
};

export default defaultFonction;