$(".productImage").click(function(){
    $("#primaryImage").attr("src", $(this).attr("src"));
    $('.productImage').css('border','0px solid #009440');
    $(this).css('border','1px solid #009440');
    // border: 1px solid #009440;
});
