$(document).ready(function() {
  $("#contribution_text").on("input", function(){
    let charCount = 255 - $(this).val().length;
    let count = $(this).parent().find(".counter");
    if(charCount < 0) {
      count.text(charCount).css("color", "red");
    }else {
      count.text(charCount).css("color", '');
    }
  });
});

