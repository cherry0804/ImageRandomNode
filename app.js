const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

const imageDir = path.join(__dirname, 'images');

// 讓靜態圖片可以直接被存取
app.use('/images', express.static(imageDir));

// 路由：接受 jpg/png/gif 等後綴
app.get('/random.:ext', (req, res) => {
    const ext = req.params.ext.toLowerCase();
    fs.readdir(imageDir, (err, files) => {
        if (err) return res.status(500).send('讀取圖片失敗');

        // 過濾指定副檔名的圖片
        const filtered = files.filter(file => path.extname(file).toLowerCase() === '.' + ext);

        if (filtered.length === 0) return res.status(404).send(`沒有 ${ext} 圖片`);

        // 隨機選一張
        const randomImage = filtered[Math.floor(Math.random() * filtered.length)];

        // 直接送出圖片檔案
        res.sendFile(path.join(imageDir, randomImage));
    });
});

app.listen(port, () => {
    console.log(`伺服器已啟動：http://localhost:${port}`);
});
