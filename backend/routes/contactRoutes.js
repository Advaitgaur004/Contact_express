import express from 'express';
import {getContact,getContactwithID,updateContact,deleteContact,addContact} from '../controllers/contactcontroller.js'
const router = express.Router()

router.route("/get/contacts").get(getContact)
router.route("/get/contact/:contact_id").get(getContactwithID)
router.route("/update/contact/:contact_id").put(updateContact)
router.route("/delete/contact/:contact_id").delete(deleteContact)
router.route("/add/contact/:contact_id").post(addContact)

export default router