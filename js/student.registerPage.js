$(document).ready(function(){
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }
})
var valid=false;
var serverUrl=_spPageContextInfo.webAbsoluteUrl;
//validadte event form
//validate input studentcode
$("#txtStudentCode").on("blur",function(){
    let inputStudentCode=$(this);
    if(!inputStudentCode.val()){
        inputStudentCode.removeClass("valid");
        inputStudentCode.addClass("invalid");
        inputStudentCode.next().next().removeClass("hide");
        inputStudentCode.next().next().addClass("show");
        valid=false;
    }
    else{
        inputStudentCode.removeClass("invalid");
        inputStudentCode.addClass("valid");
        inputStudentCode.next().next().removeClass("show");
        inputStudentCode.next().next().addClass("hide");
        valid=true;
    }
});
//validate input email
$("#txtEmail").on("blur",function(){
    let inputEmail=$(this);
    let email=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!inputEmail.val()){
        inputEmail.removeClass("valid");
        inputEmail.addClass("invalid");
        inputEmail.next().next().removeClass("hide");
        inputEmail.next().next().addClass("show");
        valid=false;
    }
    else{
        inputEmail.removeClass("invalid");
        inputEmail.addClass("valid");
        inputEmail.next().next().removeClass("show");
        inputEmail.next().next().addClass("hide");
        valid=true;
    }

    if(inputEmail.val()){
        if(email.test(inputEmail.val())){
            inputEmail.removeClass("invalid");
            inputEmail.addClass("valid");
            inputEmail.next().next().next().removeClass("show");
            inputEmail.next().next().next().addClass("hide");
            valid=false;
        }else{
            inputEmail.removeClass("valid");
            inputEmail.addClass("invalid");
            inputEmail.next().next().next().removeClass("hide");
            inputEmail.next().next().next().addClass("show");
            valid=true;
        }
    }
    
});

//validate input fullname
$("#txtFullname").on("blur",function(){
    let inputFullname=$(this);
    if(!inputFullname.val()){
        inputFullname.removeClass("valid");
        inputFullname.addClass("invalid");
        inputFullname.next().next().removeClass("hide");
        inputFullname.next().next().addClass("show");
        valid=false;
    }
    else{
        inputFullname.removeClass("invalid");
        inputFullname.addClass("valid");
        inputFullname.next().next().removeClass("show");
        inputFullname.next().next().addClass("hide");
        valid=true;
    }
});


//validate file input
$("#fileInput").on("blur",function(){
    let inputFullname=$(this);
    if(!inputFullname.val()){
        inputFullname.removeClass("valid");
        inputFullname.addClass("invalid");
        inputFullname.next().next().removeClass("hide");
        inputFullname.next().next().addClass("show");
        valid=false;
    }
    else{
        inputFullname.removeClass("invalid");
        inputFullname.addClass("valid");
        inputFullname.next().next().removeClass("show");
        inputFullname.next().next().addClass("hide");
        valid=true;
    }
});

//submit
$("#btnStudentRegister").on("click",function(){
    $("#myModalCenter").modal("show");
    let student={};
    if(valid){
        let fileInput=$("#fileInput");
        student.studentCode=$("#txtStudentCode").val();
        student.studentEmail=$("#txtEmail").val();
        student.studentFullName=$("#txtFullname").val();
        let data={
            "__metadata":{"type": "SP.Data.StudentListItem"},
            //Pass the parameters
            "Title":"Student",
            "StudentCode": student.studentCode,
            "Email": student.studentEmail,
            "Full_x0020_Name": student.studentFullName
        }
        //Insert student information to student list
        let insertStudent=registerStudentList(data);
        insertStudent.done(function(insertStudentResponse){
            console.log("---insert student response!---");
            console.log(insertStudentResponse);
            //Create folder with folder name is student code
            let createFolder= createStudentAttachmentFolder(insertStudentResponse.d.StudentCode);
            createFolder.done(function(createFoldeRresponse){
                console.log("---create Folder response!---");
                console.log(createFoldeRresponse);
                //Read file
                let readFile=getFileBuffer(fileInput);
                readFile.done(function(arrayBuffer){
                    //Upload file to folder
                    let uploadFile=uploadStudentFile(arrayBuffer,createFoldeRresponse.d.ServerRelativeUrl,fileInput);
                    uploadFile.done(function(uploadFileResponse){
                        console.log("---upload file response!---");
                        console.log(uploadFileResponse);
                        //Get id
                        let getListId=getListItem();
                        getListId.done(function(getListIdResponse){
                            //Update file properties
                            console.log("---List Id response!---");
                            console.log(getListIdResponse);
                            let fileID=getListIdResponse.d.results[getListIdResponse.d.results.length-1].Id;
                            let updateFile=updateFilePropertieLevel(fileID,insertStudentResponse.d.Id)
                            updateFile.done(function(updateFileResponse){
                                console.log("---update file response!---");
                                console.log(updateFileResponse);
                                $(".loader").addClass("hide");
                                $(".modal-header").addClass("hide")
                                $(".showMessage").removeClass("hide");
                                $(".modal-footer").removeClass("hide");
                                }).fail(onError);
                            }).fail(onError);
                    }).fail(onError);
                }).fail(onError);
            }).fail(onError);
        }).fail(onError);
    }else{
        alert("Your form is invalid!");
    }
});

//Register student function
function registerStudentList(data){
    return $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Student')/items",
        method: "POST", //Specifies the operation to create the list item  
            data:JSON.stringify(data),
            contentType:"application/json;odata=verbose",
            headers: {
                "Accept": "application/json;odata=verbose", //It defines the Data format   
                "X-RequestDigest": $("#__REQUESTDIGEST").val() //It gets the digest value
            }
    });
}

// Get the local file as an array buffer.
function getFileBuffer(fileInput) {
    let deferred = $.Deferred();
    let reader = new FileReader();
    reader.onloadend = function (e) {
        deferred.resolve(e.target.result);
    }
    reader.onerror = function (e) {
        deferred.reject(e.target.error);
    }
    reader.readAsArrayBuffer(fileInput[0].files[0]);
    return deferred.promise();
}

//get id from listitem

function getListItem(){
    return $.ajax({
        url: serverUrl+"/_api/web/lists/GetByTitle('StudentAttachments')/items",
        method: "GET", 
        headers: {
        "accept": "application/json;odata=verbose",
        "content-type": "application/json;odata=verbose"
        }
});
}

//Create student attachment folder
function createStudentAttachmentFolder(foderName){
    let data={ "__metadata": { "type": "SP.Folder" }, "ServerRelativeUrl":"/sites/CourseManagementSite/StudentAttachments/"+foderName};
    return $.ajax({
        url: serverUrl+"/_api/web/Folders",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json;odata=verbose", 
        headers: {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "Accept": "application/json;odata=verbose"
        }
        });
}

//error
function onError(error) {
    alert(error.responseText);
}

$("#btnCloseModal").on("click",function(){
    $("#myModalCenter").modal("hide");
});

//Upload file function
function uploadStudentFile(arrayBuffer,folderUrl,fileInput){
    // Get the file name from the file input control on the page.
    let parts = fileInput[0].value.split('\\');
    let fileName = parts[parts.length - 1];

    // Send the request and return the response.
    // This call returns the SharePoint file.
    return $.ajax({
        url: serverUrl+"/_api/web/GetFolderByServerRelativeUrl('"+folderUrl+"')/Files/add(overwrite=true,url='"+fileName+"')",
        type: "POST",
        data: arrayBuffer,
        processData: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
    });
}
//Update file properties function
function updateFilePropertieLevel(fieldID,studentId){
    let data={ '__metadata': { 'type': 'SP.Data.StudentAttachmentsItem' },'StudentId':studentId.toString()};
    let uri=serverUrl+"/_api/web/lists/GetByTitle('StudentAttachments')/items("+fieldID+")"
    return $.ajax({
        url: uri,
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json;odata=verbose", 
        headers: {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "Accept": "application/json;odata=verbose",
            "IF-MATCH":"*",
            "X-HTTP-Method":"MERGE"
        }
    });
}



    
    
    
