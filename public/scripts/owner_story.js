// import { retrieveContributions, renderContribution, renderContributions } from ('./story');

$(document).ready(function() {
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
    <article class="card owner flex-row m-3 mt-5 p-3 w-75 mx-auto" id=${contribution.id}>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>${contribution.content}</p>
          </blockquote>
        </div>
        <div class="upvote-body d-flex flex-column mx-auto my-auto">
        <div id="upvote_count" class="mx-auto">${contribution.count}</div>
        </div>
    </article>
      `
  });

 //on click, selects contribution
 $('#contributions-container').on('click', 'article', (event) => {
   let contributionId = $(event.target).closest('.card').attr('id')
  //  console.log('contributionId', contributionId);
   let text = $.get(`/stories/${storyId}/contributions/text`, { cont_id: contributionId}, function(data) {
      $.ajax({
        type: 'PATCH',
        url: `/stories/${storyId}/contributions`,
        data: {storyId: storyId, content: data.content},
        success: function(data) {
        $('.lead').text(data.content)
        clearContributions(storyId)
        }
      });
    });
    })

  // complete button, triggers patch update
  $('#complete_button').on('click', () => {
    $.ajax({
      type: 'PATCH',
      url: `/stories/${storyId}`,
      success: function(data) {
        clearContributions(storyId)
      }
    });
  })

  const clearContributions = (story_id) => {
    $.ajax({
      type: 'DELETE',
      url: `/stories/${storyId}/contributions`,
      success: (deleted) => {
        console.log(deleted)
        $('#contributions-container').empty()
      }
    })
  }

});
