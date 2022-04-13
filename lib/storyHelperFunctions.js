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

module.exports = {renderContribution}
