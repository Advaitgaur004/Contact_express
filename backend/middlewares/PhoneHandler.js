const PhoneHandler = (req, res, next) => {
  let Phone = req.body.phone;
  if (!Phone) {
    res.status(400);
    throw new Error("Phone number is required");
  }
  
  if (Phone.length != 10) {
    res.status(400);
    throw new Error("Phone number should be of 10 digits");
  }
  
  if (!Phone.match(/^[0-9]+$/)) {
    res.status(400);
    throw new Error("Phone number should be a number");
  }
    next();
};

export default PhoneHandler;