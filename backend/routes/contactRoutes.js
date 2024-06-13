import express from 'express';
import PhoneHandler from '../middlewares/PhoneHandler.js';
import emailHandler from '../middlewares/emailHandler.js';
import {getContact,getContactwithID,updateContact,deleteContact,addContact} from '../controllers/contactcontroller.js'
import verifyJWT from '../middlewares/verifyJWT.js';

const router = express.Router()

router.use(verifyJWT)
router.route("/get/contacts").get(getContact)
router.route("/get/contact/:contact_id").get(getContactwithID)
router.route("/update/contact/:contact_id").put(updateContact)
router.route("/delete/contact/:contact_id").delete(deleteContact)
router.route("/add/contact/").post(PhoneHandler,emailHandler, addContact)

export default router