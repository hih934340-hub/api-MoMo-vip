const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 1. Thêm phương thức GET để khi bạn bấm link trực tiếp trên trình duyệt điện thoại không bị lỗi "Cannot GET"
app.get('/get-momo-history', (req, res) => {
    res.status(200).json({
        success: true,
        message: "API Proxy MoMo đang hoạt động bình thường! Hãy dùng phương thức POST để gọi lấy lịch sử giao dịch."
    });
});

// 2. Phương thức POST chính để gọi sang MoMo
app.post('/get-momo-history', async (req, res) => {
    try {
        const requestBody = req.body;

        const momoHeaders = {
            "Host": "api.momo.vn",
            "sessionKey": "f9acdb51-90bd-46ae-aac3-614af458afba",
            "app_code": "5.15.0",
            "userId": "01682962182",
            "user_phone": "01682962182",
            "User-Agent": "MoMoPlatform Store/5.15.0.51500 CFNetwork/1410.1 Darwin/22.6.0 (iPhone 8 Plus iOS/16.7.16) AgentID/110335164",
            "lang": "vi",
            "device_performance": "low-end",
            "app_version": "51500",
            "wbmky": "P0qtFBtU5l8xkybj8ZiWWsJwOuGe6qk75qFd6T4nMyrEx5P4wdr5GJy+sS301KoU7Jp3EMPp9OuM3wtgVUxfJjd9kRPk6aSBfPEFldncPIDGWv/N1IhMCJUVqNZS4c5WG6wEfv/4gGQIa83sy8ldBzc3SqFZAwC8TdLr5s5N58r73Z87KSqDEHJwtgMm8/iaHnbV9THyvqKQ4UVWnnHB1rwn67jW53+SQ42IjTu6xxWOE0IR0B0YhmuKUJAy9NwMbriAVInutj4tQ8RuNiI5nL1rz0Gb9eZywS+v8GiKHVFw524V5b/LbyKIUj9mafWEibddcf6BQY560RMGCiBcOQ==",
            "Accept-Encoding": "gzip, deflate, br",
            "wbmtd": "2pYAKDR0GJr4m6Xnh7QTD9pWTcBLNtxjiIm//gIBqk5X8r69XtlpvPexLS02S+4kXkqW0oi1PhtEqmxnKZ87NIdRPtGswd4eonhWd1PgS+j0FzY6fEOj+h9t0cKV+kCFRdJeYDYswZijW/BGYACdBSGRDKSxIQCrpWZn9kp6dyqGAoKBD8n14Th6iWlO/9XIumtKVe80kj4E7ufSIYYLPzXYB2lwtSk9JdVkgGieO1CEXFAU12lRTTaL6v2SB5WAC5OKmu4g5cGn2x03oTns4HiYRujwp68v37/FVcGAA1K7/mp+u0AuyXpND6HvQe9sn0JipGkPg38w000Gpg7Yk8/o8rlCxIS1OARI7VQivWUsuKQTp8LTZ+Pu3blIBzugTpm0OyJ7miGrTUDgFI/Vxm/yDuDDcLd7j/u4xlCN3GEz2fOdU+L4qE+5R58BMrtEI4lNgsxtO1NekB7+2/97FWEzCpI2EBeHcRISQmSyTFNI+K9ypEAirgW5a0M00b2HTA5cW2omK4pLCN4Qw4XYHtVksuwT+mbDWOmwYJK+l/itBWhJ/le6U65Xu52v3A2wzNquku2+0fA4wWcu2zOviuRygrpwjWE1vgskP/CuBLVzrRdPm3Ya0OFZcn7rf6/r/9W4Y0tf0VhNOfrpilufNeYjQFHBs4taOaYdrVV++bTf1PA7jfWs8nSE6qRHCdDQf4/xz4hM5WrGrRpkgRF1y75iB7XDfGbazCosEYgCGoZ9JOwPYDRwFq1RWEv3HkOxcHfbOv0Lh/gey0CmAhpgQ3RvL8fHY4ylfoEzDc3UF7DoKgRIQpNtvbFxDFnjApCELBouwgvfI3FscJO1XTHAJpu8ns4/Ns8HAyHH2ZjcjtVFhFdiu2Mxn3oObVtz3t7M6exPJBY4zr6lRodK2gtTBPjSVrwgBeXLuescKGkvoAW0ySuO9KI7/PualnAy/KmNkmTHvpZLk7lpD4w9i2/L9EPJrdYhJec5PkiJkQQsmuvG+pXVJw9m/6DIDmG3M7/uMJ1YN7P4rO/ovaC+83/rispyRVmbBcq8+yTtO6ttIKbVENXPc1vQhLsILU5t1mkiUUBOhQSkRY11btwPFTD1kQCuhzm1WDNjvhbR49IgyiXRxMj/x0I5qBDTFqtrzjb+sCCFwuNp4MIcVhlXihmMLflzi1+kGhRvHAU8uAAKycYucQmpKWKvk9xaNWwec/JlLKt6BcWuvu4XXsZSYt3OGEfAKGd+WXPFHKA9UQ8K7dw8BK98i2zJ0UbZjo80HaC7yZkSA2DtIVr5wfDi3TUErgtGSlW0INEPdUH/JlJy/7aaKCpeNcg7lxU2GRNFlaKoSmXKsKr9VJBaLwmtyjk+DGHEcUf58qVvjpppvIYYklcf3uUII+/VDJPexOwUAMUTQ/fsMxA/h55ngg6EBPkixAxl8nYB0/ku7/s5w/xk/jtVEy9p7DjoFngomitcHRAawbPaiePB+RinKhJ/k9x2zYtYRGnpi8/kp7JDK21Yr3whwbQx/9hW+I5skgoxiW8g6UlE1rE3s8QyBscn9Tei/W1urquwe4Dm4fVia2I62FQOtHpA5sA1OjdGI9HhXnfEkyyzNftz9msm7sjVczxyVS7fS4qVpwMk3aiFKnSN11C0PLBua8r5HDbRuvdLgbVUecSBbum1BfEUPQxE75SOJqhtdlue9h//2qBk41sf0m8+w60WWur/DemWei4dKiCkmn/T69Bd0hoJLZsapLHtoBiBnFSFdAwDqL15NUNiEerdhMTyREiLawjTEwfgTMADoNYh4xg/K3Q2w1fDnaI0146lp3BXGVRogZFzARZqMhsOikZ8KQbpin/RNNR5M4nsNZymOiulVkptp76svJXWxw==",
            "channel": "APP",
            "momo-session-key-tracking": "59FB81B3-C0F7-4177-AC9D-AE43534C1788",
            "wbCode": "0&1788553453061",
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyIjoiMDE2ODI5NjIxODIiLCJpbWVpIjoiNTEwMDEtMWIxYjAyMWQ1NDgyZjA4MWVkODY1ZmJkM2UwMDAwYWYyNzU4ZmIxMmUxOGRiZGUzZGMwOTM1MWI5NDI1ZWY1MyIsImhJbWVpIjoiOEZiSVBHVkI4dEsyajNkRWd2dWZURDZXTU5LWkhVMmxtWWdMRlZUNDZLOXhNM055bzRxdXRYV1FYNTlPbU1NSkh1c0pzck9ub1pqazl6RysveXAzaktidnlseER2ZHhTZC9mSlV1cUJESms9IiwiTUFQX1NBQ09NX0NBUkQiOjAsIk5BTUUiOiJUcuG6p24gTmjhuq10IEhvw6BuZyIsIkRFVklDRV9PUyI6ImlvcyIsIkFQUF9WRVIiOjUxNTAwLCJhZ2VudF9pZCI6MTEwMzM1MTY0LCJzZXNzaW9uS2V5IjoiUG5QTWxzbjQ5VktNRytKTGU3aWtqWDQ5cWZTbDBoU3VtMEVRVmgxMG45NFRkWHl3NzNQNENRPT0iLCJ1c2VyX3R5cGUiOjEsImtleSI6Im1vbW8iLCJyYXBpZF9pZCI6ImMvcFVYY28zZnd4WTlNRC85S1VOb2VaalArT0N4cUF3ZkFsNlZGaUtjN2JTamt1TDRKcVZzUTRZNnJ3Z0I0NFRnTld4MkZxZlAvYz0iLCJ1aWQiOiIwMzgyOTYyMTgyIiwiZXhwIjoxNzg4ODEyNjI1fQ.RQU3K-smSVZtTSOdr1YkN-ZVJjgQV4EsFteozfUDBywBVrW7sieiuSXrf2Zi1rhWzWRJjW1eFdXCFltbRYOLZDUg2qb79G0hRZZb2DlPMVRrY8R-Bvn_UYB9-5v-MFiQwgvc4Xi3P1MzEHV9O1KpodKccP1G2ksFY4VvMDiZwXfXDFXFWYJ0-YvvtlkjRL7vuiID2O-ITKVaaQ9l5YBDkprQukOWlczKwCuarb95qZaApZUtXQranB5Q2jvG3xbO3wGt8R-7x3ou5DDH5SF5q9HwxnQBctLYphIO9FKaJYYXh4uVtxpjkKSsF9FQd8fVXgoTWgCmp1orKJ-0IEGjCw",
            "env": "production",
            "app_type": "production",
            "device_os": "IOS",
            "http-process-timestamp": Date.now().toString(),
            "timezone": "Asia/Ho_Chi_Minh",
            "Accept-Charset": "UTF-8",
            "Accept": "application/json",
            "agent_id": "110335164",
            "Accept-Language": "vi-VN,vi;q=0.9",
            "wbSign": "LbMY+S47D+//3NDGSWBYk54xZZOA+1Apb5rhUnv7A9oX+CMJisxehL0um5pdR2LUafUyeHFkpqohutY+fNiLOeSJrApe9GPAaer8ktS8kCwiRQ==",
            "platform-timestamp": Date.now().toString()
        };

        const response = await axios.post(
            'https://api.momo.vn/transhis/api/transhis/golden-pocket/trans/browse',
            requestBody,
            { headers: momoHeaders }
        );

        return res.status(200).json({
            success: true,
            data: response.data
        });

    } catch (error) {
        console.error("Lỗi gọi API MoMo:", error.response?.data || error.message);
        return res.status(500).json({
            success: false,
            message: "Lỗi kết nối tới MoMo",
            error: error.response?.data || error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server đang chạy trên cổng ${PORT}`);
});
