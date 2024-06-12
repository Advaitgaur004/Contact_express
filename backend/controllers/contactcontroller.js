import asyncHandler from "express-async-handler" // asycnHandler is a middleware that takes an async function and returns a function that can be used as a route handler. So two things can occur either 
import Contact from "../models/contactModel.js"; // 1. The async function throws an error, which will be caught and passed to the next function. 2. The async function returns a value, which will be passed to the next function.

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id : req.user.id});
    res.status(200).json(contacts);
});

const getContactwithID = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.contact_id)
    if (!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not authorized to view this contact")
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findByIdAndUpdate(req.params.contact_id, req.body, { new: true })
    if (!contact){
        throw new Error(`Contact not found with ID ${req.params.contact_id}`)
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not authorized to update this contact")
    }
    res.status(201).json(contact);
});

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.contact_id);
    if (!contact){
        throw new Error('Contact not found with ID', req.params.contact_id);
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Not authorized to Delete this contact")
    }
    Contact.deleteOne({
        _id : req.params.contact_id
    })
    res.status(200).json({ message: `Contact delete for id ${req.params.contact_id}` });
});

const addContact = asyncHandler(async (req, res) => {
    // console.log(req.body.name, req.body.email, req.body.phone, req.user)
    const { name, email, phone } = req.body;
    if (!name) {
        res.status(400);
        throw new Error("Name field is necessary");
    }
    const existed_email = await Contact.findOne({email})
    const existed_phone = await Contact.findOne({phone})

    if (existed_email){
        res.status(400);
        throw new Error("Email already exists");
    }
    if (existed_phone){
        res.status(400);
        throw new Error("Phone already exists");
    }
    const contact = await Contact.create({user_id : req.user.id,name,phone,email});
    if (!contact) {
        res.status(400);
        throw new Error("Contact not created");
    }
    res.status(201).json(contact);
});

export { getContact, getContactwithID, updateContact, deleteContact, addContact };
