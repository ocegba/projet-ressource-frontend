import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

const defaultFonction = async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.ressource.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((result))));
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Il y a un problème en créant une ressource" });
  }
};

export default defaultFonction;