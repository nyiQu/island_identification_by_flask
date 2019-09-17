$(function () {
    let sessionUrl = '/api/getSession';
    $.ajax({
        url: sessionUrl,
        type: "get",
        success:function (data) {
            setName(data)

        }
    });

    function setName(name) {
          $("#user").html(name);
          $("#welcome").html(name);
    }
});