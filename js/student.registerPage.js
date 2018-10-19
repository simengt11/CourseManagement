$(document).ready(function(){
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }
})
var fileInput;
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
        valid=false;
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
        valid=false;
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
        valid=false;
    }
});

//submit
$("#btnStudentRegister").on("click",function(){

    var data={
        "__metadata":{"type": "SP.Data.TestingListItem"},
        //Pass the parameters
        "Title":"Employee",
        "First_x0020_Name": infor.firstName,
        "Last_x0020_Name": infor.lastName,
        "Address": infor.address,
        "City": infor.city,
        "State": infor.state,
        "Zip_x0020_Code": infor.zipCode,
        "Home_x0020_Phone": infor.homePhone,
        "Work_x0020_Phone": infor.workPhone,
        "Email": infor.email,
        "How_x0020_About_x0020_This_x0020": infor.hearFrom,
        "Ticket_x0020_Number": infor.ticketNumber,
        "Company": infor.company
    }
    if(valid){
        let fileInput=$("#fileInput");
    }
});

function registerStudentList(data){
    return $.ajax({
        url:serverUrl+"/sites/CoursesManagement/_api/web/lists/getbytitle('Students')/items",
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
function getFileBuffer() {
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

function createStudentAttachmentFolder(foderName){
    let data={ "__metadata": { "type": "SP.Folder" }, "ServerRelativeUrl":"/StudentAttachments/"+foderName};
    return $.ajax({
        url: "https://vosimen.sharepoint.com/sites/CoursesManagement/_api/web/Folders",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json;odata=verbose", 
        headers: {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "Accept": "application/json;odata=verbose"
        }
        });
}

function uploadStudentFile(arrayBuffer,folderUrl){
    // Get the file name from the file input control on the page.
    let parts = fileInput[0].value.split('\\');
    let fileName = parts[parts.length - 1];

    // Send the request and return the response.
    // This call returns the SharePoint file.
    return $.ajax({
        url: serverUrl+"/sites/CoursesManagement/_api/web/GetFolderByServerRelativeUrl('"+folderUrl+"')/Files/add(overwrite=true,url='"+fileName+"')",
        type: "POST",
        data: arrayBuffer,
        processData: false,
        headers: {
            "accept": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        }
    });
}



    
    
    
