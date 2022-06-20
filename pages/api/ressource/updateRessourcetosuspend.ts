import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

const defaultFonction = async (req, res) => {

  const { idRessource, notRaisonRessource } = req.body;
 
  try {
    const deleteRessource = await prisma.ressource.update({
      where: {
        idRessource: idRessource,
      },
      data : {
        validerRessource : false,
        notRaisonRessource : notRaisonRessource,
      }
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((deleteRessource))));
  } catch (error) {
    console.log(error)
    res.status(403).json({ err: "Erreur pendant la suppression d'une ressource" });
  }
};

export default defaultFonction;