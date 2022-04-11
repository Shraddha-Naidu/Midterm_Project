$(document).ready(function() {

  //GET request to pull all contributions
  const retrieveContributions = () => {
    $.get(`/stories/${storyId}/contributions`, function(data) {
    renderContributions(data)
    })
  }

  retrieveContributions();

  //GET request to pull upvotes

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
            <p>${contribution.content}</p>
          </blockquote>
        </div>
        <div class="upvote-body d-flex flex-column mx-auto my-auto">
        <i id="upvote_arrow" class="fa-solid fa-angles-up mx-auto fa-lg"></i>
        <div id="upvote_count" class="mx-auto">${contribution.count}</div>
        </div>
    </div>
      `
  });

  $('#contributions-container').on('click', '#upvote_arrow', (event) => {
    console.log($(event.target).closest('.card').attr('id'))

    $.post(`/stories/${storyId}/contributions`, {user_id:1}, function(data) {
      console.log('callback working');
      $('#contributions-container').empty();
      retrieveContributions()
    })
  });
});
