document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert('Please enter a valid username');
        return;
    }

    searchGitHubUsers(username);
});

function searchGitHubUsers(username) {
    const apiUrl = `https://api.github.com/search/users?q=${username}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert('Error fetching data from GitHub. Please try again later.');
        });
}

function displayUsers(users) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}">
            <p>Username: ${user.login}</p>
            <p><a href="${user.html_url}" target="_blank">Profile</a></p>
        `;
        userDiv.addEventListener('click', function () {
            getUserRepositories(user.login);
        });

        resultsContainer.appendChild(userDiv);
    });
}

function getUserRepositories(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`GitHub API Error: ${response.status}`);
            }
            return response.json();
        })
        .then(repos => {
            displayRepositories(repos);
        })
        .catch(error => {
            console.error('Error:', error.message);
            alert('Error fetching repositories. Please try again later.');
        });
}

function displayRepositories(repositories) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    repositories.forEach(repo => {
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repo');
        repoDiv.innerHTML = `
            <p>Repository: ${repo.name}</p>
            <p>Description: ${repo.description || 'No description'}</p>
            <p><a href="${repo.html_url}" target="_blank">View on GitHub</a></p>
        `;

        resultsContainer.appendChild(repoDiv);
    });
}