import { nanoid } from "nanoid";
import { Link } from "../models/Link.js";

export const getLinks = async(req, res) => {
    try {
        const links = await Link.find({uid: req.uid})
        return res.json({links});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Error del servidor'});
    }
};

export const getLink = async (req, res) => {
    try {
        const { nanoLink } = req.params;
        const link = await Link.findOne({ nanoLink });

        if (!link) return res.status(404).json({ error: "No existe el link" });

        return res.json({ longLink: link.longLink });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }
};
//para un CRUD tradicional
export const getLinkcrud = async (req,res) => {
    try {
        const {id} = req.params
        const link = await Link.findById(id);
        
        if(!link) return res.status(404).json({ error: "No existe el Link"});

        if(!link.uid.equals(req.uid)) return res.status(401).json({ error: "No le pertenece ese ID"});

        return res.json({link});
    } catch (error) {
        console.log(error);
        if(error.kind === "ObjectId") {
            return res.status(403).json({error: "Formato Id incorrecto"});
        }
        return res.status(500).json({error: 'Error del servidor'});
    }
};

export const createLink = async (req, res) => {
    try {
        let {longLink} = req.body;
        if(!longLink.startsWith('https://')){
            longLink = 'https://' + longLink
            };
        console.log(longLink);

        const link = new Link({longLink, nanoLink: nanoid(6), uid: req.uid});
        const newLink = await link.save();

        return res.status(201).json({newLink});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Error del servidor'});
    }
};


export const removeLink = async (req, res) => {
    const { id } = req.params;
try {
    const link = await Link.findOneAndDelete({ _id: id });

    if (!link) return res.status(404).json({ error: "No existe el link" });

    if (!link.uid.equals(req.uid))
        return res.status(401).json({ error: "No le pertenece ese id " });

    return res.json({ link });
} catch (error) {
    console.log(error);
    if (error.kind === "ObjectId") {
        return res.status(400).json({ error: "Formato id incorrecto" });
    }
    return res.status(500).json({ error: "Error interno del servidor" });
}

};

export const updateLink = async (req, res) => {
    try {
        const { id } = req.params;
        const {longLink} = req.body;
        if(!longLink.startsWith('https://')){
            longLink = 'https://' + longLink
            };

        const link = await Link.findById(id);

        if (!link) return res.status(404).json({ error: "No existe el link" });

        if (!link.uid.equals(req.uid))
            return res.status(401).json({ error: "No le pertenece ese id" });

            //actualizar
            link.longLink = longLink;
            await link.save();

        return res.json({ link });
    } catch (error) {
        console.log(error);
        if (error.kind === "ObjectId") {
            return res.status(403).json({ error: "Formato id incorrecto" });
        }
        return res.status(500).json({ error: "error de servidor" });
    }

}
