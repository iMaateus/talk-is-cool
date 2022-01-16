const bcrypt = require('bcryptjs');

exports.hash = async function (value) {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(value, salt)
}

exports.compare = async function (decrypted, encrypted) {
    return await bcrypt.compare(decrypted, encrypted)
}