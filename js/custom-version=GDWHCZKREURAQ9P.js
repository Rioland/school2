/*==================================================================================
    Custom JS (Any custom js code you want to apply should be defined here).
====================================================================================*/
base_url = $("#base_url").val();
const ContactUsForm = "#ContactUsForm";

$.validator.setDefaults({
    highlight: function(element){
        $(element)
            .closest('.form-control')
            .addClass('has-error');
    },
    unhighlight: function(element){
        $(element)
            .closest('.form-control')
            .removeClass('has-error');
    }
});

function loadUrl(id,text_btn) {
    const data = {id: id};
    const btn = $("#btn_payment_load_url_"+id);

    SendDataJSON(base_url+'/APIRequest/loadPaymentUrl',data, btn,'').done(function (data) {
        eval(data);
        const message = data.message;
        if(message === 2) {
            swalRedirect('Unable to load URL', 'Cannot load url, Please try again or contact us!', 'error');
        } else if(message === 3){
            btnHtmlText(btn,text_btn);
            enable_disable_button(0,btn);
            swalAlert('Unavailable!','The data plan you are trying to access is unavailable at the moment, check back later or contact us!','warning');
        } else {
            window.location.href = base_url+"/buy-data/payment/"+message+"";
        }
    }).fail(function () {
        btnHtmlText(btn,text_btn);
        enable_disable_button(0,btn);
        swalAlert('Warning!','An error occurred, Please contact us, if this error persist, Please contact us !!!.','warning');
    });
}

function download_ntech_card() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getSeconds();
    const newName = 'ntech-wifi-card-'+date+'.jpg';
    const btn = $("#download_card_btn");

    $(btn).html('<i class="fa fa-spinner fa-spin"></i> &nbsp; Processing...');
    $(btn).prop('disabled', true);

    setTimeout(function () {
        domtoimage.toBlob(document.getElementById('ntech-wifi-card')).then(function(blob) {
            window.saveAs(blob, newName);
        });
        btnHtmlText(btn,"<i class='fa fa-download'></i> &nbsp; Download NTECH Card");
        enable_disable_button(0,btn);
    },2000)
}

$(ContactUsForm).validate({
    rules: {
        email:{
            required:true,
            email: true
        },
        phone:{
            required:true,
            number:true
        },
        name:{
            required:true,
        },
        subject:{
            required:true,
        },
        message:{
            required:true,
        }
    },
    messages:{
        email:{
            required:"Email Address cannot be blank",
            email:"Valid Email Address only",
        },
        phone:{
            required:"Telephone number cannot be blank",
            number: "Enter numbers only"
        },
        name:{
            required:"Name field cannot be blank"
        },
        subject:{
            required:"Subject cannot be blank"
        },
        message:{
            required:"Message cannot be blank"
        }
    },
    submitHandler: ContactUsFormSubmit
});

function ContactUsFormSubmit() {
    const data = $(ContactUsForm).serialize();
    const btn = $("#contact_us_btn");
    const btn_text = 'Send Message';

    SendDataJSON(base_url+"/APIRequest/ContactUs",data,btn,"Sending message...").done(function(data){
        eval(data);
        const message = data.message;
        if(message === 2){
            swalAlert('Warning!','An error occurred, Please contact us, if this error persist !!!.','warning');
            btnHtmlText(btn,btn_text);
            enable_disable_button(0,btn);
        } else if(message === 0) {
            swalAlert('Error!','An error occurred, Unable to send email, please try again!.','error');
            btnHtmlText(btn,btn_text);
            enable_disable_button(0,btn);
        } else if(message === 1){
            swalRedirect('Success!','Your message have been sent successfully!.','success')
        } else {
            swalAlert('Warning!','An error occurred, Please contact us, if this error persist !!!.','warning');
            btnHtmlText(btn,btn_text);
            enable_disable_button(0,btn);
        }
    }).fail(function () {
        btnHtmlText(btn,btn_text);
        enable_disable_button(0,btn);
        setTimeout(function () {
            swalAlert('Warning!','An error occurred, Please contact us, if this error persist, Please contact us !!!.','warning');
        },1000);
    });
}
