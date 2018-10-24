var serverUrl=_spPageContextInfo.webAbsoluteUrl;
$(document).ready(function(){
    var getStudent=getStudentFormList();
    getStudent.done(function(getStudentResponse){
        if(getStudentResponse.d.results.length>0){
            $.each(getStudentResponse.d.results,function(key,item){
                $("#myTbody").append("<tr data-id="+item.Id+">"
                +"<th scope=\"row\">"+item.Id+"</th>"
                +"<td>"+item.StudentCode+"</td>"
                +"<td>"+item.Full_x0020_Name+"</td>"
                +"<td>"+item.Email+"</td>"
                +"<td>"
                +"<button class=\"btn btn-success btnEditStudent\" type=\"button\"><i class=\"fa fa-edit\"></i></button>"
                +"<button class=\"btn btn-danger btnDeleteStudent\" type=\"button\"><i class=\"fa fa-trash\"></i></button>"
                +"</td>"
                +"</tr>")
            });
            
        }else{
            alert("Have no items to show!");
        }
    });
});

function getStudentFormList(){
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
    options.width = 1028;
    options.height = 720;
    SP.UI.ModalDialog.showModalDialog(options);
}

$("#myTbody").on("click",".btnEditStudent",function(){
    let self=$(this);
    sessionStorage.setItem("StudentId", self.parent().parent().data("id"));
    OpenDialog("../SiteAssets/pages/student.updateInformationPage.html")
});