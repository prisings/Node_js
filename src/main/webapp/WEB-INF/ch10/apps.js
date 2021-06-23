var fs = require('fs');
var pathUtil = require('path');

// ���ε� �� ���� ���
var uploadDir = __dirname + '/upload';

//�̹��� ���� ���
var imageDir = __dirname + '/image';

var http = require('http');
var formidable = require('formidable');
const { title } = require('process');
const { url } = require('inspector');

//����Ʈ
var paintList = [];

var server = http.createServer(function (req, res) {
    // ��Ʈ ��η� ��û
    if (req.url == '/' && req.method.toLowerCase() == 'get') {
        showList(res);
    }
    // <img> �±׷� ���� �̹��� ��û
    else if (req.method.toLowerCase() == 'get' && req.url.indexOf('/imange') == 0) {
        var path = __dirname + req.url;
        res.writeHead(200, { 'Content-Tye ': 'image/jpeg' })
        fs.createReadStream(path).pipe(res);
    }
    //���ε� ��û
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

    //paintList ��� ���
    paintList.forEach(function (item, index) {
        body += '<li>';
        if (item.image) {
            body += '<img src = "' + item.image + '"style = "height:100pt"></img>';
        }

        body += 'Ÿ��Ʋ : ' + item.title + '&nbsp;&nbsp;&nbsp;';
        body += '���� : ' + item.manager + '&nbsp;&nbsp;&nbsp;';
        body += '���� : '+ item.year + '&nbsp;&nbsp;&nbsp;';
        body += '</li>';
    });
    body += '</ul>'
    //��� �߰� (form)
    body += '<form action="." enctype="multipart/form-data" method="post">' +
        '<div><label>��ȭ �̸� : </label><input type ="text" name = "title"></div>' +
        '<div><label>��ȭ ���� : </label><input type ="text" name = "manager"></div>' +
        '<div><label>��ȭ ���� : </label><input type ="number" name = "year"></div>' +
        '<div><label>��ȭ ������ :</label> <input type = "file" name = "image" value = "���ϼ��� " ></div> ' +
        '<input type="submit" value="upload">' +
        '</form>';

    body += '</body></html>';

    res.end(body);

}

server.listen(3000, function () {
    console.log('Server is running on 3000');
});

//���۹��� ���� �迭�� �߰�
function addNewPaint(req, res) {
    var form = formidable.IncomingForm();
    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files) {
        var title = fields.title;
        var manager = fields.manager;
        var year = fields.year;
        var image = files.image;

        console.log(image);


        //image ���� �̸����� (�ð�) 
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