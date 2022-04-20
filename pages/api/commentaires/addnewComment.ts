import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.commentaire.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((result))));
    console.log("Tu as bien créer un commentaire !");
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Il y a un problème en créant une ressource" });
  }
};