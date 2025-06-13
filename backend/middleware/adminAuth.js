const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
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

    if (tokenDecoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: "Bu alana erişim izniniz yok." });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err.message });
  }
};

module.exports = adminAuth;
