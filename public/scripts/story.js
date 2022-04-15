$(document).ready(function() {

  //GET request to pull all contributions
  const retrieveContributions = () => {
    $.get(`/stories/${storyId}/contributions`, function(data) {
    renderContributions(data)
    })
  }

  retrieveContributions();

  //loop to render each contribution
  const renderContributions = (contributions) => {
     for (let contribution in contributions) {
       const $contribution = renderContribution(contributions[contribution])
      $('#contributions-container').append($contribution)
    };
  };

  //template for each contribution
  const renderContribution = (contribution => {
    return `
    <div class="card flex-row m-3 mt-5 p-3 w-75 mx-auto" id=${contribution.id}>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p class="contribution">${contribution.content}</p>
          </blockquote>
        </div>
        <div class="upvote-body d-flex flex-column mx-auto my-auto">
        <i id="upvote_arrow" class="fa-solid fa-angles-up mx-auto fa-lg"></i>
        <div id="upvote_count" class="mx-auto">${contribution.count}</div>
        </div>
    </div>
      `
  });

  //on click, upvote triggers
  $('#contributions-container').on('click', '#upvote_arrow', (event) => {
    let contributionId = $(event.target).closest('.card').attr('id')
    $.post(`/stories/${storyId}/contributions`, {user_id: user_id, cont_id: contributionId}, function(data) {
      $('#contributions-container').empty();
      retrieveContributions()
    })
  });

  //on click, add new contribution
  $('#contribution_form').on('submit', function(e) {
    e.preventDefault();
    const currentTextLength = $('#contribution_text').val()
    if(currentTextLength > 255){
      let val = $('#contribution_text').val();
    let value = escape(val)
    console.log('value', value)
    $.post(`/stories/${storyId}`, { user_id: user_id, story_id: `${storyId}`, content: value}, function(data) {
      data.count = 0
      $('#contributions-container').append(renderContribution(data))
    })
    } else {
      alert("Stick to the limit")
    }

  })

  //function to escape text content
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

});

