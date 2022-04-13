//FUNCTIONS

const createStoryElement = function(storyData) {

  let $newStory = $(`
  <article class="newStory">
    <header>
      <span class="title">${storyData.Title}</span>
    </header>
    <span class="story-content">${storyData.content}</span>
    <footer>
    <span class="completed">${storyData.IsComplete}</span>
      <span>
    </footer>
  </article>
  `);

  return $newStory;
};

//Adds all Owner Stories
const renderStories = function(allOwnerStories) {
  for (const story of allOwnerStories) {
    $('section.single-story-container').append(createStoryElement(story))
  }
};

const loadStories = function () {
  $.ajax({
    url: "/stories/${ownerId}",
    type: "GET"
  }).then(function(data){
      console.log(data);
      renderStories(data);
    });
};
/*JQuery*/
//DOM ready

$(document).ready(function () {

//Loads tweets from db
loadTweets();

// New submitted tweet
$(".all-stories-container").submit(function (event) {
  event.preventDefault();//prevents default submission behaviour

  if(!$(".story-text-input").val() || !$(".title-input").val()) {
    $(".error-message").html("Invalid! Please try again!").fadeIn(200).fadeOut(3500);
  } else {
    const story = $('.new-story-form').serialize();
    $.ajax({
      url:"/owner_stories",
      type: "POST",
      data: story
    }).then(() => {
        loadStories();
        story.val("");
      })

  };
})
});
