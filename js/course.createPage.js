var serverUrl=_spPageContextInfo.webAbsoluteUrl;
//validate form
//validate course title event
var valid=false;

$("#txtTitle").on("blur",function(){
    let inputTitle=$(this);
    if(!inputTitle.val()){
        inputTitle.removeClass("valid");
        inputTitle.addClass("invalid");
        inputTitle.next().next().removeClass("hide");
        inputTitle.next().next().addClass("show");
        valid=false;
    }
    else{
        inputTitle.removeClass("invalid");
        inputTitle.addClass("valid");
        inputTitle.next().next().removeClass("show");
        inputTitle.next().next().addClass("hide");
        valid=true;
    }
});

//validate maximum attendance event
$("#txtMaximumAttendance").on("blur",function(){
    let inputMaximum=$(this);
    if(!inputMaximum.val()){
        inputMaximum.removeClass("valid");
        inputMaximum.addClass("invalid");
        inputMaximum.next().next().removeClass("hide");
        inputMaximum.next().next().addClass("show");
        valid=false;
    }
    else{
        inputMaximum.removeClass("invalid");
        inputMaximum.addClass("valid");
        inputMaximum.next().next().removeClass("show");
        inputMaximum.next().next().addClass("hide");
        valid=true;
    }
});

//Create course event

$("btnCourseCreate").on("click",function(){
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
            url:serverUrl+"/_api/web/lists/getbytitle('Course')/items",
            method:"POST",
            data:JSON.stringify(data),
            headers:{
                "accept":"application/json;odata=verbose",
                "content-type":"application/json;odata=verbose",
                "X-RequestDigest": $("#__REQUESTDIGEST").val()
            }
        }).done(function(createCourseResponse){
            console.log("--create course success response--");
            console.log(createCourseResponse);
            alert("Create course successfully!");
        }).fail(function(errorResponse){
            console.log("--create course fail response--");
            console.log(createrrorResponseeCourseResponse);
            alert("Have an error when create course!");
        });
    }
});