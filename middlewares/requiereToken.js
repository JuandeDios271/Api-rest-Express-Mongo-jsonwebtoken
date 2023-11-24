import jwt from "jsonwebtoken";

export const requiereToken = (req, res, next ) => {
    try {
        let token = req.headers?.authorization;

        if(!token) throw new Error('No bearer')

        token = token.split(" ")[1];
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);

        req.uid = uid;

        next();
    } catch (error) {
        console.log(error.message);


        const TokenVerificationErrors = {
            "invalid signature": "La firma del JWT no es valida",
            "jwt expired": "JWT expirado",
            "invalid token": "Token no valido",
            "No Bearer": "Utiliza formato Bearer",
            "jwt malformed":"JWT formato no valido",
        };

        return res
        .status(401)
        .send({error: TokenVerificationErrors[error.message] });
    }
};