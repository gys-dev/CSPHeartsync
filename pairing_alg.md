# thuật toán ghép cặp
- user A là người ib page
    + user A đc đưa vào db
- khi đưa A vào phải lưu lại n là số người trong db
- lấy user B là người ở cuối db
    + xóa B ra khỏi db
    + search cả db tìm C hợp B
    + nếu có C:
        * xóa c ra khỏi db
        * n -= 2
    + nếu ko có C:
        * đặt B vào đầu db
- lặp quá trình trên (n / 2)