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
- điều kiện để 2 người hợp
```c++
bool check (B, C)
{
    if (B.fav != "none")
        if (B.fav != C.gender) return 0;
    if (C.fav != "none")
        if (C.fav != B.gender) return 0;
    return 1;
}
```
