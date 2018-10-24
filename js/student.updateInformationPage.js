var serverUrl=_spPageContextInfo.webAbsoluteUrl;
var studentID=sessionStorage.getItem("StudentId");
var valid=false;

$(document).ready(function(){
    var getStudentInfor=getStudentInformationById(studentID);
    getStudentInfor.done(function(getStudentInforResponse){
        var studentItem=getStudentInforResponse.d;
        $("#txtStudentCode").val(studentItem.StudentCode);
        $("#txtEmail").val(studentItem.Email);
        $("#txtFullName").val(studentItem.Full_x0020_Name);
        var getStudentFiles=getFilesByStudentCode(studentItem.StudentCode);
        getStudentFiles.done(function(getStudentFilesResponse){
            var filesOfItem=getStudentFilesResponse.d.results;
            $.each(filesOfItem,function(key,value){
                console.log(value);
                $("#studentFileTbody").append("<tr data-id="+value.ServerRelativeUrl+">"
                +"<td>"+value.Name+"</td>"
                +"<td>"
                +"<button class=\"btn btn-outline-danger btnDeleteFile\" type=\"button\"><i class=\"fa fa-trash\"></i></button>"
                +"</td>"
                +"</tr>")
            });
        });
    });
});
//Get student information by student id
function getStudentInformationById(StudentId){
    return $.ajax({
        url:serverUrl+"/_api/web/lists/getbytitle('Student')/items("+StudentId+")",
        method: "GET", //Specifies the operation to create the list item  
            contentType:"application/json;odata=verbose",
            headers: {
                "Accept": "application/json;odata=verbose", //It defines the Data format   
                "X-RequestDigest": $("#__REQUESTDIGEST").val() //It gets the digest value
            }
    });
}
//Get all files of a student by student code
function getFilesByStudentCode(StudentCode){
    return $.ajax({
        url: serverUrl+"/_api/web/GetFolderByServerRelativeUrl('/sites/CourseManagementSite/StudentAttachments/"+StudentCode+"')/Files",
        type: "GET",
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
    });
}

$("#btnStudentFile").on("click",function(){
    $("#studentFileModal").modal("show");
});
//-----------------------------------------------------------------------------------------------------------------------
//get list item to get fielId
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


//Upload file function
function uploadStudentFile(arrayBuffer,folderName,fileInput){
    // Get the file name from the file input control on the page.
    let parts = fileInput[0].value.split('\\');
    let fileName = parts[parts.length - 1];
    let folderUrl="/sites/CourseManagementSite/StudentAttachments/"+folderName;
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
function updateFileProperties(fieldID,studentId){
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
//error
function onError(error) {
    alert(error.responseText);
}
//validate form
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



//Upload file button
$("#btnUploadFile").on("click",function(){
    var file=$("#inputFile");
    if(!file.val()){
        alert("No file to upload!");
    }else{
        $("#myModalCenter").modal("show");
        //get file Buffer
        let getBuffer=getFileBuffer(file);
        getBuffer.done(function(getBufferResponse){
            //get student code to get relarive folder
            let getStudentInfor=getStudentInformationById(studentID);
            getStudentInfor.done(function(getStudentInforResponse){
                console.log("---Get student infor response---");
                console.log(getStudentInforResponse);
                //uploadfile
                let uploadFile=uploadStudentFile(getBufferResponse,getStudentInforResponse.d.StudentCode,file);
                uploadFile.done(function(uploadFileRepsone){
                    console.log("---upload file response---");
                    console.log(uploadFileRepsone);
                    //Get list item 
                    let getList=getListItem();
                    getList.done(function(getListRepsonse){
                        console.log("---get list file response---");
                        console.log(getListRepsonse);
                        let fileId=getListRepsonse.d.results[getListRepsonse.d.results.length-1].Id;
                        let uploadProperty=updateFileProperties(fileId,studentID);
                        
                        //upload file property
                        uploadProperty.done(function(uploadPropertyRespone){
                            console.log("---upload property file response---");
                            console.log(uploadPropertyRespone);
                            $("#myModalCenter").modal("hide");
                            $("#studentFileTbody").append("<tr data-id="+uploadFileRepsone.d.ServerRelativeUrl+">"
                            +"<td>"+uploadFileRepsone.d.Name+"</td "
                            +"<td>"
                            +"<button class=\"btn btn-outline-danger btnDeleteFile\" type=\"button\"><i class=\"fa fa-trash\"></i></button>"
                            +"</td>"
                            +"</tr>");
                        }).fail(onerror);
                    }).fail(onerror);
                }).fail(onerror);
            }).fail(onerror);
        }).fail(onerror)
    }
})
//delete file
$("#studentFileTbody").on("click",".btnDeleteFile",function(){
    var relativeUrl=$(".btnDeleteFile").parent().parent().data("id");
    if(confirm("Do you want to delete this file?")){
        $.ajax({
            url:serverUrl+"/_api/web/GetFolderByServerRelativeUrl('"+relativeUrl+"')",
            method:"POST",
            headers:{
                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                "IF-MATCH": "*",
                "X-HTTP-Method": "DELETE"
            }
        }).done(function(){
            alert("Delete file successfully!");
            $("tr[data-id=\""+relativeUrl+"\"]").remove();
        }).fail(function(error){
            alert("Have an error when delete file!");
            console.log(error);
        });
    }
})
//Update student
$("#btnUpdate").on("click",function(){
    if($("#studentFileTbody").has("tr").length){
        alert("this is a test!")
        valid=true;
    }else{
        valid=false;
    }
    if(valid){
        alert("form valid!")
    }
})