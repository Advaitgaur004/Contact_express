import asyncHandler from "express-async-handler" // asycnHandler is a middleware that takes an async function and returns a function that can be used as a route handler. So two things can occur either 

const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Contact list" });
});

const getContactwithID = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Contact with id ${req.params.contact_id}` });
});

const updateContact = asyncHandler(async (req, res) => {
    res.status(201).json({ message: `Contact update for id ${req.params.contact_id}` });
});

const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Contact delete for id ${req.params.contact_id}` });
});

const addContact = asyncHandler(async (req, res) => {
    const { name, email, phone_Number } = req.body;
    if (!email || !phone_Number || !name) {
        res.status(400);
        throw new Error("All fields are required");
    }
    res.status(201).json({ message: "contact added" });
});

export { getContact, getContactwithID, updateContact, deleteContact, addContact };
