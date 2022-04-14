//FUNCTIONS

const createStoryElement = function() {

 /*  let newStory = `<header>
    <div class="title"><a href="/stories/${storyData.id}">${storyData.title}</a></div>
    <div class="creator">Created By: ${storyData.owner_id}</div>
    <div class="completed">Completed: ${storyData.iscomplete}</div>
      </header>`;
 */
    let $newStory = `<h3>Hello from stry</h3>`;
  return $newStory;
};

//Adds all Owner Stories
const renderStories = function(allOwnerStories) {
  for (const story of allOwnerStories) {
    $('section.owner-stories').append(createStoryElement(story))
  }
};

const loadStories = function () {
 /*  $.ajax({
    url: '/stories/${ownerId}',
    type: "GET",
    success: (data) => {
      console.log(data)
      renderStories(data);
    }
  }) */
  let $story = createStoryElement();
  $('#storyId').append($story);
};


/*JQuery*/
//DOM ready

$(document).ready(function () {

//Loads stories from db
loadStories();

// New submitted tweet
  /* $(".new-story-form").submit(function (event) {
    event.preventDefault();//prevents default submission behaviour
    if(!($(".story-text-input").val()) || !($(".title-input").val())) {
      $(".error-message").html("Invalid! Please try again!").fadeIn(200).fadeOut(3500);
    } else {
      const story = $(this).serialize();
      console.log('story', story)
      $.ajax({
        type: "POST",
        url: "/stories",
        data: story,
        success: (data) => {
          console.log(data);
          $('.single-story-container').empty()
          loadStories()
        }
      })
    }
      // .then(() => {
      //     loadStories();
      //     story.val("");
      //   })
  }) */

});
