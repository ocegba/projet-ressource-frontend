import Post from './index'
import JSONBig from 'json-bigint';


export async function getServerSideProps(context) {
    const listCommentaire = await prisma.commentaire.findMany(
        {
            where: {
                idRessource: parseInt(context.query.id)
            }
        }
    );
    return {
        props: {
            commentaires: JSONBig.parse(JSONBig.stringify(listCommentaire)),
            id: JSONBig.parse(JSONBig.stringify(context.query.id)),
            title: JSONBig.parse(JSONBig.stringify(context.query.title)),
            idCategorie: JSONBig.parse(JSONBig.stringify(context.query.idCategorie)),
            typeRessource: JSONBig.parse(JSONBig.stringify(context.query.typeRessource)),
            typeRelation: JSONBig.parse(JSONBig.stringify(context.query.typeRelationRessource)),
            localisationRessource: JSONBig.parse(JSONBig.stringify(context.query.localisationRessource)),
            lienRessource: JSONBig.parse(JSONBig.stringify(context.query.lienRessource)),
            fileRessource: JSONBig.parse(JSONBig.stringify(context.query.fileRessource)),
            storyRessource: JSONBig.parse(JSONBig.stringify(context.query.storyRessource)),
            dateRessource: JSONBig.parse(JSONBig.stringify(context.query.dateRessource))
        }
    }
}

export default Post