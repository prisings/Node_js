var fs = require('fs');
var pathUtil = require('path');

// 업로드 된 파일 경로
var uploadDir = __dirname + '/upload';

//이미지 파일 경로
var imageDir = __dirname + '/image';

var http = require('http');
var formidable = require('formidable');
const { title } = require('process');
const { url } = require('inspector');

//리스트
var paintList = [];

var server = http.createServer(function (req, res) {
    // 루트 경로로 요청
    if (req.url == '/' && req.method.toLowerCase() == 'get') {
        showList(res);
    }
    // <img> 태그로 인한 이미지 요청
    else if (req.method.toLowerCase() == 'get' && req.url.indexOf('/imange') == 0) {
        var path = __dirname + req.url;
        res.writeHead(200, { 'Content-Tye ': 'image/jpeg' })
        fs.createReadStream(path).pipe(res);
    }
    //업로드 요청
    else if (req.method.toLowerCase() == 'post') {
        addNewPaint(req, res);
    }


});

function showList(res) {
    res.writeHead(200, { 'content-type': 'text/html' });

    var body = "<html>";
    body += '<head><meta chatset="UTF-8"></head>';
    body += '<body>';
    body += '<h3>Favorite Movie</h3>';

    body += '<ul>';

    //paintList 목록 출력
    paintList.forEach(function (item, index) {
        body += '<li>';
        if (item.image) {
            body += '<img src = "' + item.image + '"style = "height:100pt"></img>';
        }

        body += '타이틀 : ' + item.title + '&nbsp;&nbsp;&nbsp;';
        body += '감독 : ' + item.manager + '&nbsp;&nbsp;&nbsp;';
        body += '연도 : '+ item.year + '&nbsp;&nbsp;&nbsp;';
        body += '</li>';
    });
    body += '</ul>'
    //목록 추가 (form)
    body += '<form action="." enctype="multipart/form-data" method="post">' +
        '<div><label>영화 이름 : </label><input type ="text" name = "title"></div>' +
        '<div><label>영화 감독 : </label><input type ="text" name = "manager"></div>' +
        '<div><label>영화 연도 : </label><input type ="number" name = "year"></div>' +
        '<div><label>영화 포스터 :</label> <input type = "file" name = "image" value = "파일선택 " ></div> ' +
        '<input type="submit" value="upload">' +
        '</form>';

    body += '</body></html>';

    res.end(body);

}

server.listen(3000, function () {
    console.log('Server is running on 3000');
});

//전송받은 값을 배열에 추가
function addNewPaint(req, res) {
    var form = formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files) {
        var title = fields.title;
        var manager = fields.manager;
        var year = fields.year;
        var image = files.image;

        console.log(image);


        //image 파일 이름변경 (시간) 
        var date = new Date();

        var newImageName = 'image_' + date.getHours() + date.getMinutes() + date.getSeconds();
        var ext = pathUtil.parse(image.name).ext;

        var newPath = __dirname + '/image/' + newImageName + ext;

        fs.renameSync(image.path, newPath);

        var url = 'image/' + newImageName + ext ;

        var info = {

            title: title, manager: manager, year: year ,image: url
        }

        paintList.push(info);

        res.statusCode = 302;
        res.setHeader('Location', '.');
        res.end('Success');

    });




}