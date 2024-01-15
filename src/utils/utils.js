const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SALT_ROUNDS, JWT_PRIVATEKEY } = require("./constants");

const createFrombody = (body, accepted_keys) => {
  const res = {};

  for (const key in body) {
    if (accepted_keys.includes(key)) {
      res[key] = body[key];
    }
  }

  return res;
};

class BCRYPT {
  static hash(password) {
    return bcrypt.hashSync(String(password), Number(SALT_ROUNDS));
  }

  static compare(password, hash) {
    return bcrypt.compareSync(String(password), hash);
  }
}

class JWT {
  static sign(user) {
    console.log({ JWT_PRIVATEKEY })
    return jwt.sign({ ...user }, JWT_PRIVATEKEY, { expiresIn: "2 days" });
  }

  static verify(token) {
    return jwt.verify(token, JWT_PRIVATEKEY);
  }
}

module.exports = {
  createFrombody,
  BCRYPT,
  JWT,
};
