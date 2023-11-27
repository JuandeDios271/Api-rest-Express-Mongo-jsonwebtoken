import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink, } from "../controllers/link.controller.js";
import { requiereToken } from "../middlewares/requiereToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

//GET ....... /api/v1/Links.......ALL LINKS
//GET ....... /api/v1/Links/:id.......SINGLE LINKS
//POST ...... /api/v1/Links.......CREATE LINKS
//PATCH/PUT.. /api/v1/Links/:id.......UPDATE LINKS
//DELETE .... /api/v1/Links/:id.......DELETE LINKS

router.get("/",requiereToken, getLinks);
router.get("/:nanoLink", getLink);
router.post("/",requiereToken,bodyLinkValidator, createLink);
router.delete("/:id", requiereToken,paramLinkValidator, removeLink);
router.patch("/:id", requiereToken,paramLinkValidator,bodyLinkValidator,updateLink);



export default router;