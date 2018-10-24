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
            let stringTemp= "<tr data-id="+value.Id+">"
            +"<td>"+value.Title+"</td>"
            +"<td>"+value.Active+"</td>"
            +"<td>"+value.MaximumAttendance+"</td>"
            +"<td>"
                +"<button class=\"btn btn-outline-success btnEditCourse\" type=\"button\"><i class=\"fa fa-edit\"></i></button>"
                +"<button class=\"btn btn-outline-danger btnDeleteCourse\" type=\"button\"><i class=\"fa fa-trash\"></i></button>"
            +"</td>"
            +"</tr>"
            $("#myTbody").append(stringTemp);
        })
    }).fail(function(errorResponse){
        console.log("--Get list course fail--");
        console.log(errorResponse);
    });
})

//Edit button event
$("#myTbody").on("click","#btnEditCourse",function(){
    let id = $(this).parent().parent().data("id");
    $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Course')/items("+id+")",
        method:"GET",
        headers:{
            "accept":"application/json;odata=verbose",
            "content-type":"application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        }
    }).done(function(getListItemRepsone){
        let listItem=getListItemRepsone.d;
        $("#txtCouseTitle").val(listItem.Title);
        if(listItem.Active==="yes"){
            $("input[name=activeRadio]").val("true");
        }else{
            $("input[name=activeRadio]").val("false");
        }
        $("#txtMaximumAttendance").val(listItem.MaximumAttendance);
        $("#updateCourseModal").modal("show");
    }).fail(function(){
        alert("Have an error when load item("+id+")!");
    });
});

//Delete button event

$("#myTbody").on("click","#btnDeleteCourse",function(){
    if(confirm("Do you want to delete this course!")){
        $.ajax({
            url:serverUrl+"/_api/web/lists/getbytitle('Course')/items("+id+")",
            method:"GET",
            headers:{
                "accept":"application/json;odata=verbose",
                "content-type":"application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            }
        }).done(function(deleteCourseRepsones){
            console.log("--Delete course success repsponse!--");
            console.log(deleteCourseRepsones);
            alert("Delete successfully!");
        }).fail(function(errorCourseRepsones){
            console.log("--Delete course fail repsponse!--");
            console.log(errorCourseRepsones);
            alert("Have an error when delete this course!");
        });
    }
});

$("#btnUpdateCourse").on("click",function(){
    //validate course title
    let inputTitle=$("#txtTitle");
    if(!inputTitle.val()){
        inputTitle.removeClass("valid");
        inputTitle.addClass("invalid");
        inputTitle.next().next().removeClass("hide");
        inputTitle.next().next().addClass("show");
        valid=false;
    }
    //validate course title
    let inputMaximum=$("#txtMaximumAttendance");
    if(!inputMaximum.val()){
        inputMaximum.removeClass("valid");
        inputMaximum.addClass("invalid");
        inputMaximum.next().next().removeClass("hide");
        inputMaximum.next().next().addClass("show");
        valid=false;
    }

    if(valid){
        let course={}
        course.title=inputTitle.val();
        course.active=$("input[name=activeRadio]:checked").val();
        course.maxAttendance=inputMaximum.val();
        let data={ "__metadata": { "type": "SP.Data.CourseListItem" }, 
        "Title":course.title,
        "Active":course.active,
        "MaximumAttendance":course.maxAttendance};
        $.ajax({
            url:serverUrl+"/_api/web/lists/getbytitle('Course')/items("+id+")",
            method:"POST",
            data:JSON.stringify(data),
            headers:{
                "accept":"application/json;odata=verbose",
                "content-type":"application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "MERGE"
            }
        }).done(function(createCourseResponse){
            console.log("--update course success response--");
            console.log(createCourseResponse);
            alert("Update course successfully!");
        }).fail(function(errorResponse){
            console.log("--Update course fail response--");
            console.log(errorResponse);
            alert("Have an error when update course!");
        });
    }
});