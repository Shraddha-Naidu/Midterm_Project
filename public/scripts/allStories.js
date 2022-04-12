/*JQuery*/
//DOM ready

$(document).ready(function () {
/* //Returns creator name
const author = function(users){

}; */

//Creates template for each Story
const createStoryElement = function(storyData) {

  let $eachStory = $(`
  <article class="eachStory">
    <header>
      <span class="title">${stories[story].title}</span>
    </header>
    <span class="story-content">${stories[story].content} </span>
    <footer>
      <span class="creator">Created By: ${stories[story].user_id}</span>
      <span class="completed">Completed: ${stories[story].IsComplete}</span>
    </footer>
  </article>
  `);

  return $eachStory;
};

//Appends all stories
const renderStories = function(allStories) {
  for (const story in allStories) {
    $('section.all-stories-container').append(createStoryElement(allStories[story]))
  }
};

//Loads all stories
const loadStories = function () {
  $.get("/stories"
  ).then(function(data){
      console.log(data);
      renderStories(data);
    });
};

//Loads tweets from db
loadStories();

$(".new-story-form").submit(function (event) {
  event.preventDefault();//prevents default submission behaviour

  if(!$(".input-tweet").val()) {
    $(".error-message").html("Invalid! Please try again!").fadeIn(200).fadeOut(3500);
  } else if ($(".input-tweet").val().length > 140) {
    $(".error-message").html(`Uh Oh 🙃 Too many characters, please shorten!`).fadeIn(200).fadeOut(3500);
  } else {
    $.ajax({
      url:"/tweets/",
      type: "POST",
      data: $(".input-tweet").serialize()
    }).then(() => {
        loadTweets();
        $(".input-tweet").val("")
        $("#char-count").text(140);
      })

  };
})


});
