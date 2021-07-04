//간단한 ToDoList 만들기
var express = require('express');
var bodyparser = require('body-parser');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
//html 파일 (ejs)
app.set("view engine", "ejs");
//랜더링 css 파일
app.use(express.static("public"));

var job = ["cube.js", "node.js"];
var complete = ["work about mobis"];

app.post("/addjob", function (req,res) {
    var newjob = req.body.newjob;
    //새로운 일 추가 (post route 로 부터 )
    job.push(newjob);
    //작업후 페이지 리다이렉트(새로고침)
    res.redirect("/");
});

app.post("/removejob", function (req,res) {
    var copleteJob = req.body.check;
    //typeof 함수를 활용하여 자료형 확인후 push
    if (typeof completeJob === "string") {
        complete.push(completeJob);
        console.log(completeJob);
        console.log(job.indexOf(completeJob));
        //작업에서 선택되면 완료되었는지 확인후 job에서 제거(인덱스 이용)
        job.splice(job.indexOf(completeJob), 1);
    } else if (typeof completeJob === "object") {
        for (var i = 0; i < completeJob.length; i++) {
            complete.push(completeJob[i]);
            console.log(completeJob);
            console.log(job.indexOf(completeJob));
            job.splice(job.indexOf(completeJob[i]), 1);
        }
    }
    res.redirect("/");
});

//ejs에 랜더링 과 add job , complete job을 화면에 표시
app.get("/", function (req, res) {
    res.render("index", { job: job, complete: complete });
});

// port 3000번으로 서버 실행 하도록 설정
app.listen(3000, function () {
    console.log("server is running on port 3000");
});