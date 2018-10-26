var serverUrl=_spPageContextInfo.webAbsoluteUrl;
//validate form
//validate course title event
var valid=false;

$(document).ready(function(){
    var getList=$.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Course')/items",
        method:"GET",
        headers:{
            "accept":"application/json;odata=verbose",
            "content-type":"application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
    });
    getList.done(function(getListResponse){
        console.log("--Get list course success--");
        console.log(getListResponse);
        $.each(getListResponse.d.results,function(key,value){
            if(value){
                let stringTemp= "<tr data-id="+value.Id+">"
                +"<td>"+value.Id+"</td>"
                +"<td>"+value.Title+"</td>"
                +"<td>"+value.Active+"</td>"
                +"<td>"+value.MaximumAttendance+"</td>"
                +"<td>"
                    +"<button class=\"btn btn-outline-primary btnStudentRegister\" type=\"button\"><i class=\"fa fa-list\"></i></button>"
                +"</td>"
                +"</tr>"
                $("#myCourseTbody").append(stringTemp);
            }
        })
    }).fail(function(errorResponse){
        console.log("--Get list course fail--");
        console.log(errorResponse);
    });
})

//get all student register course
function getAllStudentCourse(){
    return $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('StudentRegisterCourse')/items",
        method: "GET", //Specifies the operation to create the list item  
        contentType:"application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",   
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        }
    });
}

//get a student by student id
function getAStudentById(studentId){
    return $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Student')/items("+studentId+")",
        method: "GET", //Specifies the operation to create the list item  
        contentType:"application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",   
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
        }
    });
}

$("#myCourseTbody").on("click",".btnStudentRegister",function(){
    let courseId=$(this).parent().parent().data("id");
    let getStudentRegiserCourse=getAllStudentCourse();
    let studentIdArray=[];
    getStudentRegiserCourse.done(function(getStudentRegiserCourseResponse){
        console.log("--Get student register course success repsone!--");
        consosle.log(getStudentRegiserCourseResponse);
        $.each(getStudentRegiserCourseResponse.d.results,function(key,item){
            if(item.CourseId===courseId.toString()){
                studentIdArray.push(item.StudentId);
            }
        })
        if(studentIdArray.length==0){
            alert("This course have no students!");
        }else{
            $.each(studentIdArray,function(key,item){
                getAStudentById(item).done(function(getAStudentRespone){
                    console.log("--Get student have id={0} success repsone!--",item);
                    consosle.log(getAStudentRespone);
                    let student=getAStudentRespone.d;
                    let stringTemp= "<tr data-id="+student.Id+">"
                    +"<th scope=\"row\">"+student.Id+"</th>"
                    +"<td>"+student.StudentCode+"</td>"
                    +"<td>"+student.FullName+"</td>"
                    +"<td>"+student.Email+"</td>"
                    +"</tr>"
                    $("#myStudentTbody").append(stringTemp);
                })
            })
            $("#studentModal").modal("show");
        }
    })
})