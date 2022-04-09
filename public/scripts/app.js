// Client facing scripts here
$(document).ready(function() {

  const renderStories = function(stories) {
    for (const story of stories) {
      const $story = createTweetElement(tweet);
      $('#container').prepend($story);
    };
  }

  const createStoryElement = (story) => {
    `<article class='story_container>
      <header>${story.title}
      </header>

    </article>
    `
  }

  const loadStories = () => {
    $.get('/stories', data => {
      console.log(data)
    })
  }

});
