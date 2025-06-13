const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Token bulunamadı. Yetkilendirme token'ı gerekli." });
    }

    // authorization = Bearer token -> Bearer fdksgskgfsglosdsfsahnb
    // const token = await authorization.split(" ")[1];

    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = tokenDecoded.id;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = userAuth;
