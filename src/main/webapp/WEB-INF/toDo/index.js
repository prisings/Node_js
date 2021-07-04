//������ ToDoList �����
var express = require('express');
var bodyparser = require('body-parser');
const bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
//html ���� (ejs)
app.set("view engine", "ejs");
//������ css ����
app.use(express.static("public"));

var job = ["cube.js", "node.js"];
var complete = ["work about mobis"];

app.post("/addjob", function (req,res) {
    var newjob = req.body.newjob;
    //���ο� �� �߰� (post route �� ���� )
    job.push(newjob);
    //�۾��� ������ �����̷�Ʈ(���ΰ�ħ)
    res.redirect("/");
});

app.post("/removejob", function (req,res) {
    var copleteJob = req.body.check;
    //typeof �Լ��� Ȱ���Ͽ� �ڷ��� Ȯ���� push
    if (typeof completeJob === "string") {
        complete.push(completeJob);
        console.log(completeJob);
        console.log(job.indexOf(completeJob));
        //�۾����� ���õǸ� �Ϸ�Ǿ����� Ȯ���� job���� ����(�ε��� �̿�)
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

//ejs�� ������ �� add job , complete job�� ȭ�鿡 ǥ��
app.get("/", function (req, res) {
    res.render("index", { job: job, complete: complete });
});

// port 3000������ ���� ���� �ϵ��� ����
app.listen(3000, function () {
    console.log("server is running on port 3000");
});