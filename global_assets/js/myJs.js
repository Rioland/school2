// JavaScript Document
// Error Msgs
function MsgCustomSuccess(msg,element,time){
    const show = "<div class='alert alert-success'><div><i class='fa fa-spin fa-globe'></i>&nbsp; " + msg + "</div></div>";
    setTimeout(function() {
        $(element).html("");
    },time);
    $(element).html(show);
}

function MsgCustomDanger(msg,element,time){
    const show = "<div class='alert alert-danger'><div><i class='fa fa-warning'></i>&nbsp; " + msg + "</div></div>";
    setTimeout(function() {
        $(element).html("");
    },time);
    $(element).html(show);
}

/*'action':'card_check','serial':serial.val(),'pin':pin.val(),'email':email.val()*/
function SendDataPost(url,data,element,msgBtn){
    return $.ajax({
        type:'post',
        url:url,
        data:data,
        beforeSend: function(){
            $(element).html('<i class="fa fa-spinner fa-spin"></i> &nbsp; '+msgBtn+'');
            $(element).prop('disabled', true);
        }
    });
}

function SendDataPost2(url,data){
    return $.ajax({
        type:'post',
        url:url,
        data:data,
    });
}

function SendDataJSON(url,data,element,msgBtn){
    return $.ajax({
        type:'POST',
        dataType:'JSON',
        url:url,
        data:data,
        beforeSend: function(){
            $(element).html('<i class="fa fa-spinner fa-spin"></i> &nbsp; '+msgBtn+'');
            $(element).prop('disabled', true);
        }
    });
}
function SendDataJSON2(url,data){
    return $.ajax({
        type:'POST',
        dataType:'JSON',
        url:url,
        data:data,
    });
}

function fetchJsonData(url){
    return $.ajax({
        type:'GET',
        dataType:'JSON',
        url:url,
    });
}

function waitOverlayBody(){
    $('body').waitMe({
        effect: 'ios',
        text: 'Please wait....',
        bg: 'rgba(255,255,255,0.7)',
    });
}

function waitOverlayBodyTextOption(text){
    $('body').waitMe({
        effect: 'ios',
        text: text,
        bg: 'rgba(255,255,255,0.7)',
    });
}

function HideWaitOverlay() {
    $('body').waitMe("hide");
}

function Goback() {
    window.history.back();
}


function swalRedirect(title,text,type) {
    swal({
        title: title,
        text: text,
        icon: type,
        closeOnClickOutside: false,
        closeOnEsc: false,
    }).then(function() {
        window.location.reload();
    });
}

function swalAlert(title,text,type) {
    swal({
        title: title,
        text: text,
        icon: type,
        closeOnClickOutside: false,
        closeOnEsc: false
    });
}

function SwalRedirectLocation(title,text,type,location) {
    swal({
        title: title,
        text: text,
        icon: type,
        closeOnClickOutside: false,
        closeOnEsc: false
    }).then(function() {
        setTimeout(function () {
            window.location.href = location;
        },200);
    });
}

function SwalRedirectBack(title,text,type) {
    swal({
        title: title,
        text: text,
        icon: type,
        closeOnEsc:false
    }).then(function() {
        setTimeout(function () {
            Goback();
        },200);
    });
}

function SwalDelete(url,id) {
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc:false
    }).then((willDelete) => {
        if(willDelete) {
            SendDataJSON2(url,{id:id}).done(function(data){
                eval(data);
                const message = data.message;
                if(message === 1){
                    swalRedirect("Success", "Data Deleted Successfully.", "success");
                } else {
                    setTimeout(function () {
                        swal("Error", "Unable to delete data, please try again.", "error");
                        HideWaitOverlay();
                    }, 1500);
                }
            });
        } else {
            swal("Safe", "Selected Item Safe!", "warning");
        }

    });
}

function SwalDeleteOverlay(url,id) {
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc:false
    }).then((willDelete) => {
        if(willDelete) {
            waitOverlayBody();
            setTimeout(function () {
                SendDataJSON2(url, {id: id}).done(function (data) {
                    eval(data);
                    const message = data.message;
                    if (message === 1) {
                        HideWaitOverlay();
                        swalRedirect("Success", "Data Deleted Successfully.", "success");
                    } else {
                        setTimeout(function () {
                            swal("Error", "Unable to delete data, please try again.", "error");
                            HideWaitOverlay();
                        }, 1500);
                    }
                }).fail(function () {
                    setTimeout(function () {
                        swal("Bad Request", "Please contact the Administrator (otybtechnologies@gmail.com), if this error persist !!!", "error");
                        HideWaitOverlay();
                    },1000);
                });
            }, 1500);
        } else {
            swal("Safe", "Selected Item Safe!", "warning");
        }
    });
}

function SwalBlockOverlayAction(url,id) {
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to perform this action?",
        icon: "warning",
        buttons: true,
        closeOnClickOutside: false,
        closeOnEsc:false,
    }).then(function(){
        waitOverlayBodyTextOption('Processing action, Please wait...');
        setTimeout(function () {
            SendDataJSON2(url,{id:id}).done(function(data){
                eval(data);
                const message = data.message;
                if(message === 1){
                    swalRedirect("Success", "Action Perform Successfully.", "success");
                    HideWaitOverlay();
                } else {
                    setTimeout(function () {
                        HideWaitOverlay();
                        swal("Error", "Unable to perform this action, please try again.", "error");
                    },1000);
                }
            }).fail(function () {
                setTimeout(function () {
                    HideWaitOverlay();
                    swal("Bad Request", "Please contact the Administrator (otybtechnologies@gmail.com), if this error persist !!!", "error");
                },1000);
            });
        },1500);
    });
}

function SwalDelete2(url,id) {
    swal({
        title: "Are you sure?",
        text: "Are you sure you want to delete data?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc:false
    }).then(function(){
        SendDataPost2(url,{id:id}).done(function(data){
            if(data === 1){
                swalAlert("Success", "Data Deleted Successfully.", "success");
            } else {
                setTimeout(function () {
                    swal("Error", "Unable to delete data, please try again.", "error");
                },1500);
            }
        }).fail(function () {
            setTimeout(function () {
                swal("Bad Request", "Please contact the Administrator (otybtechnologies@gmail.com), if this error persist !!!", "error");
                HideWaitOverlay();
            },1000);
        });
    });
}



function swalInput(title,text,placeholder,inputErrorText){
    swal({
        title:title,
        text:text,
        type: "input",
        inputType: "number",
        buttons: true,
        dangerMode: true,
        closeOnClickOutside: false,
        closeOnEsc:false,
        inputPlaceholder:placeholder,
    }).then(function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError(inputErrorText);
            return false
        }
    });
}


function hasWhiteSpace(s) {
    return /\s/g.test(s);
}

function validateURL(textval) {
    const urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
    return urlregex.test(textval);
}

function validateEmail(sEmail) {
    const filter = /^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return filter.test(sEmail);
}

function btnHtmlText(selector,text) {
    $(selector).html(text);
}

function enable_disable_button(status,btn) {
    if(status === 1){
        $(btn).prop('disabled', true);
    } else if(status === 0) {
        $(btn).prop('disabled', false);
    }
}

const Message =  {
    badRequest : "Bad Request!",
    contactAdministrator : "Please contact the Administrator, if this error persist.",
    Invalid: "Invalid",
    invalid: "invalid",
    Error: "Error",
    Warning: "Warning",
    Successful: "Successful",
    Success: "Success",
    badReqMissingInfo: "Bad Request, Some information look missing. Please contact the Administrator, if this error persist."
}
