import jwt from "jsonwebtoken";

const generateToken = (id) => {
    // 💡 PERBAIKAN: Pastikan ID yang dimasukkan ke payload token adalah number (untuk keamanan)
    const payloadId = typeof id === 'string' ? parseInt(id, 10) : id;

    // ... (kode JWT sign) ...
    return jwt.sign({ id: payloadId }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d"
    });
};

export default generateToken;
