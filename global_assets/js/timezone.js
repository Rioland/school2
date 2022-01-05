// Get TimeZone
//Include TIMEZONE LIBRARY <script src="https://cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.7/jstz.min.js" integrity="sha256-bt5sKtbHgPbh+pz59UcZPl0t3VrNmD8NUbPu8lF4Ilc=" crossorigin="anonymous"></script>
//https://www.npmjs.com/package/jstimezonedetect

$(window).on('load', function () {
    const timezone = jstz.determine();
    const timezone_name = timezone.name();
    setCookie('timezone',timezone_name,100000);
});

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
