var serverUrl=_spPageContextInfo.webAbsoluteUrl;
var studentId;
var studentArray=[];
$(document).ready(function(){
    //get student
    $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Student')/items",
        method:"GET",
        headers:{
            "accept":"application/json;odata=verbose",
            "content-type":"application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
    }).done(function(getStudentRespone){
        console.log("--get student success repsone!--")
        console.log(getStudentRespone)
        $.each(getStudentRespone.d.results,function(key, value){
            let stringTemp="<tr data-id="+value.Id+">"
                            +"<td>"+value.StudentCode+"</td>"
                            +"<td>"+value.Full_x0020_Name+"</td>"
                            +"<td>"
                            +"<button class=\"btn btn-outline-primary btnChoose\" type=\"button\"><i class=\"fa fa-hand-pointer\"></i></button>"
                            +"</td>"
                            +"</tr>"
            $("#myTbody").append(stringTemp);
            studentArray.push(value);
        })
        
    }).fail(function(errorResponse){
        console.log("--get student fail repsone!--")
        console.log(errorResponse)
    });

    
    //Get course
    $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Course')/items",
        method:"GET",
        headers:{
            "accept":"application/json;odata=verbose",
            "content-type":"application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
    }).done(function(getCourseRespone){
        let countTemp=0;
        console.log("--get course success repsone!--")
        console.log(getCourseRespone)
        //get course_student
            $.ajax({
                url:serverUrl+"/_api/web/lists/getbytitle('StudentRegisterCourse')/items",
                method:"GET",
                headers:{
                    "accept":"application/json;odata=verbose",
                    "content-type":"application/json;odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                }
            }).done(function(studentRegisterCourseResponse){
                $.each(getStudentRespone.d.results,function(key, value){
                    //check course status
                    if(value.Active){
                        //count course attenddance
                        $.each(studentRegisterCourseResponse.d.results,function(key2,value2){
                            if(value2.CourseId===value.id){
                                countTemp++;
                            }
                        })
                        if(countTemp<value.MaximumAttendance){
                            $("#selectCourse").append("<option value="+value.Id+">"+value.Title+"</option>")
                        }
                    }
                })
            })
    }).fail(function(errorResponse){
        console.log("--get course fail repsone!--")
        console.log(errorResponse)
    });
});

//choose student button event
$("#myTbody").on("click",".btnChoose",function(){
    studentId=$(this).parent().parent().data("id");
    $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Student')/items("+studentId+")",
        method:"GET",
        headers:{
            "accept":"application/json;odata=verbose",
            "content-type":"application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
    }).done(function(getAStudentRepsone){
        console.log("Get a student success response!");
        console.log(getAStudentRepsone);
        $("#inputStudenCode").val(getAStudentRepsone.d.StudentCode);
        $("#inputStudenName").val(getAStudentRepsone.d.Full_x0020_Name);
    })
})

$("#btnStudentRegister").on("click",function(){
    if(typeof(studentId)==="undefined"){
        alert("Please choose a student!");
    }else{
        let data={ "__metadata": { "type": "SP.Data.StudentRegisterCourseListItem" }, 
        "StudentId":studentId,
        "CourseId":$("#selectCourse").val()
        }
        $.ajax({
            url:serverUrl+"/_api/web/lists/getbytitle('StudentRegisterCourse')/items",
            method:"POST",
            data:JSON.stringify(data),
            headers:{
                "accept":"application/json;odata=verbose",
                "content-type":"application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            }
        }).done(function(registerCourseResponse){
            console.log("--register course success response--")
            console.log(registerCourseResponse);
            alert("Register course successfully!");
        }).fail(function(errorResponse){
            console.log("--register course fail response--")
            console.log(errorResponse);
            alert("Have an error when register course!");
        });
        
    }
})
//search student function
function searchStudent(searchBy,searchContent,searchSource){
    let results=[];
    if(searchBy==="code"){
        $.each(searchSource,function(key, value){
            if(value.StudentCode.search(searchContent)!==-1){
                results.push(value);
            }
        });
    }else{
        $.each(searchSource,function(key, value){
            if(value.Full_x0020_Name.search(searchContent)!==-1){
                results.push(value);
            }
        });
    }
    return results
}

$("#btnSearchStudent").on("click",function(){
    if(!$("#inputSearch").val()){
        $("#myTbody").empty();
        $.each(studentArray,function(key,value){
            let stringTemp="<tr data-id="+value.Id+">"
                            +"<td>"+value.StudentCode+"</td>"
                            +"<td>"+value.Full_x0020_Name+"</td>"
                            +"<td>"
                            +"<button class=\"btn btn-outline-primary btnChoose\" type=\"button\"><i class=\"fa fa-hand-pointer\"></i></button>"
                            +"</td>"
                            +"</tr>"
            $("#myTbody").append(stringTemp);
        })
    }else{
        let results=searchStudent($("#selectSearch").val(),$("#inputSearch").val(),studentArray);
        if(results.length=0){
            alert("Have no result!");
        }else{
            $("#myTbody").empty();
        $.each(results,function(key,value){
            let stringTemp="<tr data-id="+value.Id+">"
                            +"<td>"+value.StudentCode+"</td>"
                            +"<td>"+value.Full_x0020_Name+"</td>"
                            +"<td>"
                            +"<button class=\"btn btn-outline-primary btnChoose\" type=\"button\"><i class=\"fa fa-hand-pointer\"></i></button>"
                            +"</td>"
                            +"</tr>"
            $("#myTbody").append(stringTemp);
        })
        }
    }
    
});