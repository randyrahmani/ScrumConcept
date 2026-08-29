const searchInput = document.querySelector("#issueSearch");

searchInput?.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();
  document.querySelectorAll("[data-search]").forEach((issue) => {
    issue.hidden = Boolean(query) && !issue.dataset.search.includes(query);
  });
});
