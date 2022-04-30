import JSONBig from 'json-bigint';
import prisma from '../../../prisma/prisma'

export default async (req, res) => {
  const data = req.body;
  try {
    const result = await prisma.action.create({
      data: {
        ...data,
      },
    });
    res.status(200).json(JSONBig.parse(JSONBig.stringify((result))));
  } catch (err) {
    console.log(err);
    res.status(403).json({ err: "Problème favoris" });
  }
};