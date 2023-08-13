URL Shortener
===
*縮短網址好方便*

## Screenshots
- Login
![login.png](https://i.postimg.cc/JzLN0dX6/2023-08-13-11-06-57.png)

- Register
![register.png](https://i.postimg.cc/SxfWM77y/2023-08-13-11-07-07.png)

- Index
![index.png](https://i.postimg.cc/ydMQS6Xq/2023-08-13-7-38-45.png)

- History
![history.png](https://i.postimg.cc/Y9GD9LFf/2023-08-13-7-39-19.png)

- Shorten
![shorten.png](https://i.postimg.cc/Bvww4Bjn/2023-08-13-7-39-34.png)

## Prerequisites
- express @4.18.2
- express-handlebars @3.0.0
- express-session @1.17.1
- mongoose @7.4.2
- dotenv @16.3.1
- bcryptjs @2.4.3
- passport @0.4.1
- passport-local @1.0.0

## Installation
1. 下載本專案
```
git clone
```
2. 進入專案資料夾
```
cd URL_Shortener
```
3. 專案初始化
```
npm init -y
```
4. 下載相關套件
```
npm i (related modules)
```
5. 設定環境變數
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.sgwv8lr.mongodb.net/url_shortener?retryWrites=true&w=majority
```
6. 下載種子資料
```
npm run seed
```
7. 啟動伺服器
```
npm run dev
```

## User seed
- name: root
- email: root@example.com
- password: 12345678

## Features
- 使用者登入 User 開始使用。
- 使用者可以註冊新的帳號。
- 使用者可以在首頁貼上欲縮短的原始網址。
- 使用者可以點選 Shorten 鈕執行縮短網址動作。
- 使用者可以點選 Copy 鈕進行短網址複製動作。
- 使用者可以點選 History 查看紀錄。
- 使用者只能查看屬於自己的 History 紀錄。
- 使用者可以貼上短網址直接導向原始網址。

## Development Environment
- Visual Studio Code @1.81.0

## Author
**Verna Chen**