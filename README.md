# URL Shortener
**URL Shortener is a free tool to shorten a URL or reduce a link.**
**Use URL Shortener to create a shortened link making it easy to remember.**

## Features
+ User can create a shortened link
+ User can click the shortened url to link the website
+ User can copy and paste the shortened url

## Getting Start
What user need to do first

### Prerequisites
+ Node js 
+ Express @4.18.2
+ Express-Handlebars @6.0.6
+ Body-parser @1.20.1
+ Mongoose @6.6.5

### Installing
1. Copy and download file HTTPS
```
$ git clone https://github.com/Verna0214/URL_Shortener.git
```

2. Enter project file
```
$ cd URL_Shortener
```

3. Install npm
```
$ npm init -y
```

4. Set environment variable

**macOS : Change the username and password**
```
$ export MONGODB_URI="mongodb+srv://username:password@cluster0.qf4d2sz.mongodb.net/URL-shortener?retryWrites=true&w=majority"
```
**Windows : Change the username and password**
```
$ set MONGODB_URI="mongodb+srv://username:password@cluster0.qf4d2sz.mongodb.net/URL-shortener?retryWrites=true&w=majority"
```

5. Start project
```
$ npm run seed
```

```
$ npm run dev
```