const emailHandler = (req, res, next) => {
    let email = req.body.email;
    if (!email) {
        res.status(400);
        throw new Error("Email is required");
      }
    if (!email.includes("@")) {
        res.status(400);
        throw new Error("Email should contain @");
    }
    if (!email.includes("iitj.ac.in")){
        console.log("Person is not from IITJ")
    }
    next();
};

export default emailHandler;