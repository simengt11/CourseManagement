var serverUrl=_spPageContextInfo.webAbsoluteUrl;
$(document).ready(function(){
    var getStudent=getStudentFromList();
    getStudent.done(function(getStudentResponse){
        if(getStudentResponse.d.results.length>0){
            $.each(getStudentResponse.d.results,function(key,item){
                $("#myTbody").append("<tr data-id="+item.Id+" data-content="+item.StudentCode+">"
                +"<th scope=\"row\">"+item.Id+"</th>"
                +"<td>"+item.StudentCode+"</td>"
                +"<td>"+item.Full_x0020_Name+"</td>"
                +"<td>"+item.Email+"</td>"
                +"<td>"
                +"<button class=\"btn btn-outline-primary btnEditStudent\" type=\"button\"><i class=\"fa fa-edit\"></i></button>"
                +"<button class=\"btn btn-outline-danger btnDeleteStudent\" type=\"button\"><i class=\"fa fa-trash\"></i></button>"
                +"</td>"
                +"</tr>")
            });
            
        }else{
            alert("Have no items to show!");
        }
    });
});
//Get all student
function getStudentFromList(){
    return $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Student')/items",
        method: "GET", //Specifies the operation to create the list item  
            contentType:"application/json;odata=verbose",
            headers: {
                "Accept": "application/json;odata=verbose", //It defines the Data format   
                "X-RequestDigest": $("#__REQUESTDIGEST").val() //It gets the digest value
            }
    });
}

function OpenDialog(URL) {
    var options = SP.UI.$create_DialogOptions();
    options.url = URL;
    options.width = 1024;
    options.height = 720;
    SP.UI.ModalDialog.showModalDialog(options);
}

//delele student function
function deleteAStudentByStudentId(studentId){
    return $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Student')/items("+studentId+")",
        method: "POST", //Specifies the operation to create the list item  
        contentType:"application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",   
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        }
    });
}

//delele folder function
function deleteAFolderByFolderName(name){
    return $.ajax({
        url:serverUrl+"/_api/web/GetFolderByServerRelativeUrl('/sites/CourseManagementSite/StudentAttachments/"+name+"')",
        method: "POST", //Specifies the operation to create the list item  
        contentType:"application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",   
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        }
    });
}

//delele student register code by id
function deleteStudentCourseById(Id){
    return $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('StudentRegisterCourse')/items("+Id+")",
        method: "POST", //Specifies the operation to create the list item  
        contentType:"application/json;odata=verbose",
        headers: {
            "Accept": "application/json;odata=verbose",   
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE"
        }
    });
}

//delele student register code by id
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
//function error
function onError(error){
    console.log(error);
}

$("#myTbody").on("click",".btnEditStudent",function(){
    let self=$(this);
    sessionStorage.setItem("StudentId", self.parent().parent().data("id"));
    OpenDialog("../SitePages/student.updateInformationPage.aspx")
});

$("#myTbody").on("click",".btnDeleteStudent",function(){
    alert("button was clicked");
    let parentElement= $(this).parent().parent();
    let studentID=parentElement.data("id");
    let studentCode=parentElement.data("content");
    let studentCourseIdArray=[];
    //delete student folder
    let deleteStudentFolder=deleteAFolderByFolderName(studentCode);
        deleteStudentFolder.done(function(deleteStudentFolderRespones){
            console.log("delete student folder success!");
            console.log(deleteStudentFolderRespones);
            let getStudentCourse=getAllStudentCourse();
            //get student register course id of the student who will be deteled
            getStudentCourse.done(function(getStudentCourseRepsone){
                console.log("get student register course success!");
                console.log(getStudentCourseRepsone);
                
                $.each(getStudentCourseRepsone.d.results,function(key,item){
                    if(item.StudentId===studentID.toString()){
                        studentCourseIdArray.push(item.Id);
                    }
                })
                //delete student register course
                if(studentCourseIdArray.length>0){
                    $.each(studentCourseIdArray,function(key,id){
                        deleteStudentCourseById(id).done(function(data){
                            console.log("delete student register course id {0} success",id);
                        }).fail(function(error){
                            console.log("Have an error when delete student register course id {0}",id);
                            console.log(error)
                        })
                    })
                }

                //delete student
                let deleteStudent=deleteAStudentByStudentId(studentID);
                deleteStudent.done(function(deleteStudentResponse){
                    console.log("delte student success!");
                    console.log(deleteStudentResponse);
                    $("tr[data-id="+studentID+"]").remove();
                    alert("Delete student succesfully!");
                }).fail(onError);
            }).fail(onError);
        }).fail(onError);
});
