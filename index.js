const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/bfhl', upload.single('file'), (req, res) => {
    const { data, file_b64 } = req.body;
    const user_id = "john_doe_17091999"; // Replace with dynamic user_id generation logic
    const email = "john@xyz.com";
    const roll_number = "ABCD123";

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highest_lowercase_alphabet = alphabets.filter(item => item === item.toLowerCase()).sort().slice(-1);

    let file_valid = false;
    let file_mime_type = '';
    let file_size_kb = 0;

    if (req.file) {
        file_valid = true;
        file_mime_type = req.file.mimetype;
        file_size_kb = req.file.size / 1024;
    }

    res.json({
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet,
        file_valid: file_valid,
        file_mime_type: file_mime_type,
        file_size_kb: file_size_kb
    });
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
