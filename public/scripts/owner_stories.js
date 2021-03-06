//FUNCTIONS

const createStoryElement = function(storyData) {

  let $newStory = $(`
    <header>
    <div class="title"><a href="/stories/${storyData.id}">${storyData.title}</a></div>
    <div class="creator">Created By: ${storyData.owner_id}</div>
    <div class="completed">Completed: ${storyData.iscomplete}</div>
      </header>
      <div class="content">${storyData.content}</div>
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
    url: '/stories/owner',
    type: "GET",
    success: (data) => {
      console.log(data)
      renderStories(data);
    }
  })
};
/*JQuery*/
//DOM ready

$(document).ready(function () {


// New story
  $(".new-story-form").submit(function (event) {
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
          closeModal;
          $('.single-story-container').empty()
          location.reload();
        }
      })
    }

  })

  const closeModal = $('#btnSave').click(function() {
    $('#exampleModalCenter').modal('hide');
 });

});
