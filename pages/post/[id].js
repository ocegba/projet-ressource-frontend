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
            relationstous : JSONBig.parse(JSONBig.stringify(context.query.relationstous)),
            relationssoi : JSONBig.parse(JSONBig.stringify(context.query.relationssoi)),
            relationsconjoints : JSONBig.parse(JSONBig.stringify(context.query.relationsconjoints)),
            relationsfamille : JSONBig.parse(JSONBig.stringify(context.query.relationsfamille)),
            relationspro : JSONBig.parse(JSONBig.stringify(context.query.relationspro)),
            relationsamis : JSONBig.parse(JSONBig.stringify(context.query.relationsamis)),
            relationsinconnus : JSONBig.parse(JSONBig.stringify(context.query.relationsinconnus)),
            localisationRessource: JSONBig.parse(JSONBig.stringify(context.query.localisationRessource)),
            lienRessource: JSONBig.parse(JSONBig.stringify(context.query.lienRessource)),
            fileRessource: JSONBig.parse(JSONBig.stringify(context.query.fileRessource)),
            storyRessource: JSONBig.parse(JSONBig.stringify(context.query.storyRessource)),
            dateRessource: JSONBig.parse(JSONBig.stringify(context.query.dateRessource))
        }
    }
}

export default Post