const DataPlanPaymentForm = "#DataPlanPaymentForm";
base_url = $("#base_url").val();
const make_payment_btn_selector = "#make_payment_btn";

$(DataPlanPaymentForm).validate({
    rules: {
        email_address_payment:{
            required:true,
            email: true
        },
        tel_payment:{
            required:true,
            number:true
        },
        firstname_payment:{
            required:true,
        },
        lastname_payment:{
            required:true,
        }
    },
    messages:{
        email_address_payment:{
            required:"Email Address cannot be blank",
            email:"Valid Email Address only",
        },
        tel_payment:{
            required:"Telephone number cannot be blank",
            number: "Enter numbers only"
        },
        firstname_payment:{
            required:"Firstname cannot be blank"
        },
        lastname_payment:{
            required:"Lastname cannot be blank"
        }
    },
    submitHandler: SaveTransactionData
});

function SaveTransactionData() {
    const id = $(make_payment_btn_selector).data('id');
    const data = $(DataPlanPaymentForm).serialize();
    const dataPlus = data+"&id="+id;
    const btn = $(make_payment_btn_selector);

    SendDataJSON(base_url+"/APIRequest/SaveDataPlanTransaction",dataPlus,btn,"Processing...").done(function(data){
        eval(data);
        const message = data.message;
        const reference = data.reference;
        const id_encrypt = data["id_encrypt"];
        const reference_encrypt = data["reference_encrypt"];
        const payment_key = data["payment_key"];
        const amount = data["amount"];
        if(message === 1){
            payWithPayStack(id_encrypt,reference_encrypt,reference,payment_key,amount);
        } else {
            swalAlert('Error!','Unable to complete payment process, please try again later.','error');
            btnHtmlText(btn,"Make Payment");
            enable_disable_button(0,btn);
        }
    }).fail(function (e) {
        btnHtmlText(btn,"Make Payment");
        enable_disable_button(0,btn);
        setTimeout(function () {
            swalAlert('Warning!','An error occurred, Please contact us, if this error persist, Please contact us !!!.','warning');
        },1000);
    });
}

function payWithPayStack(id_encrypt,reference_encrypt,reference,payment_key,amount) {
    const btn = $("#make_payment_btn");
    let handler = PaystackPop.setup({
        key: payment_key,
        email: document.getElementById("email_address_payment").value,
        amount: amount,
        firstname: document.getElementById("firstname_payment").value,
        lastname: document.getElementById("lastname_payment").value,
        currency: 'NGN',
        ref: reference,
        onClose: function(){
            btnHtmlText(btn,"Make Payment");
            enable_disable_button(0,btn);
            swalRedirect('Warning!','Transaction was not completed, window closed.','warning');
        },
        callback: function(response){
            const email_address = document.getElementById("email_address_payment").value;
            const dataUpdateTransaction = "reference="+reference+"&email_address="+email_address;
            SendDataJSON2(base_url+"/APIRequest/UpdateTransactionStatus",dataUpdateTransaction).done(function(data){
                eval(data);
                const message = data.message;
                if(message === 1){
                    window.location.href = base_url + "/buy-data/payment/verify-transaction/"+id_encrypt+"/"+reference_encrypt;
                } else {
                    swalAlert('Warning!','Unable to complete payment process, please try again later and contact us if this money is deducted from your bank account. We apologize for the inconvenience.','warning');
                    btnHtmlText(btn,"Make Payment");
                    enable_disable_button(0,btn);
                }
            }).fail(function () {
                btnHtmlText(btn,"Make Payment");
                enable_disable_button(0,btn);
                setTimeout(function () {
                    swalAlert('Error!','An error occurred, Please contact us if the payment was successful.','error');
                },1000);
            });
        }
    });
    handler.openIframe();
}