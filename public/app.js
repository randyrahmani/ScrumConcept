const searchInput = document.querySelector("#issueSearch");

// Board cards and backlog rows expose normalized searchable text through the
// data-search attribute. Toggling `hidden` keeps filtering fast and local.
searchInput?.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll("[data-search]").forEach((issue) => {
    issue.hidden = Boolean(query) && !issue.dataset.search.includes(query);
  });
});
