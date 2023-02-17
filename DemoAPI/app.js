console.log ("Hello mọi người")

function kiemTraTuoiLayVo(tuoiHienTai) {
    if (tuoiHienTai >=18) {
        console.log("Bạn đã đủ tuổi lấy vợ")
    }else {
        console.log("Bạn chưa đến tuổi lấy vợ")
    }  
}

kiemTraTuoiLayVo(10)

const { request, response } = require('express')
// 1.Nhập vào thư viện Express 
const express = require('express')
// 2. Tạo ra một ứng dụng Web có biến là app
const app = express()
app.use(express.json())
// 3. Tạo ra 1 biến port
const port = 3000

// 4. Tạo ra 1 API  phương thức GET có địa chỉ là http://localhost:3000/
app.get('/', (require, response) => {
    response.send('Hello')
})

// 5. Mỏ cổng cho phép server chạy trên cổng đã tạo


app.get('/friends', (require, response) => {
    response.send([
        {
            id: 1,
            name: "Phuong"
        }, {
            id: 2,
            name: "Ly"
        }
    ])
})

// Tạo ra một API trả về 1 danh sách thời tiết ở Hà Nội
// method: get
// URL: localhost:3000/weather
// Response: [
//     {
//         IDQuan: 1
//         tenQuan: "Cầu Giấy"
//         nhietDo: 30
//     },
//     {

//     }
// ]

// 1. Cài thư viện mysql2: làm trên terminal npm install mysql2
// 2. inport thư viện
const mysql = require ('mysql2')
// 3. Tạo 1 thông tin kết nối
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: '12345678',
database: 'thuephim'
})
// 4.Kết nối đến database
connection.connect()
// 5.Tạo API, yêu cầu 
app.get('/films', (request, response) => {
connection.query("SELECT * FROM Phim", (err, data)=>{
    if (err) {
        response.send("Có lỗi")
     } else {
        response.send(data)
        }
    })
})

// INSERT INTO Phim(ID_Phim, tenPhim, ID_theLoaiPhim, ID_DanhMuc, ngaySanXuan, giaPhim)
// VALUES ('P5', 'Hai Phượng', 'HĐ', 'DM3', '2021-03-10', 120000),

app.post('/films', (request, response) => {
connection.query("INSERT INTO Phim (`ID_Phim`, `tenPhim`, `ID_theLoaiPhim`, `ID_DanhMuc`, `ngaySanXuan`, `giaPhim`) VALUE (?,?,?,?,?,?)", [
request.body.ID_Phim, request.body.tenPhim, request.body.ID_theLoaiPhim, request.body.ID_DanhMuc, request.body.ngaySanXuan, request.body.giaPhim
], (err) => {
    if (err) {
        response.send(err)
    } else {
        response.send("Thêm thành công")
    }
})
})

app.post('/Users', (request,response) => {
    connection.query("INSERT INTO User (`ID_User`, `hoTen`, `SDT`, `gioiTinh`) VALUES (?,?,?,?)",[
        request.body.ID_User, request.body.hoTen, request.body.SDT, request.body.gioiTinh
    ],(err) => {
        if (err) {
            response.send(err)
        } else {
            response.send("Them thanh cong")
        }
    }
    )
}
)

app.delete('/rent/:ID', (request,response) => {
    connection.query("DELETE FROM `thuePhim` WHERE ID_thuePhim = (?)",[
        request.params.ID
    ], (err) => {
        if (err) {
            response.send(err)
        } else {
            response.send("Xoa thanh cpng")
        }
    })
}
)

app.put("/Users/:ID", (request, response) => {
    connection.query("UPDATE User SET `SDT` = '2233333' WHERE ID_User = (?)", [
        request.params.ID, request.body.SDT
    ], (err) => {
        if (err) {
            response.send(err)
        } else {
            response.send("Update thanh cong")
        }
    })
}
)


app.listen(port, () => {
    console.log("Server chạy trên cổng 3000")

})


