const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mime = require('mime-types');

const app = express();
const upload = multer();

app.use(bodyParser.json());

app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "john_doe_17091999"; // Example user_id
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_lowercase_alphabet = alphabets.filter(item => item === item.toLowerCase()).sort().slice(-1);

    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = 0;

    if (file_b64) {
        const buffer = Buffer.from(file_b64, 'base64');
        file_mime_type = mime.lookup(buffer);
        file_size_kb = buffer.length / 1024;
        file_valid = !!file_mime_type;
    }

    res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
