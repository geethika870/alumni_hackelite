document.addEventListener('DOMContentLoaded', function () {
    let postIdCounter = 1; // To assign unique IDs to new posts

    // Like button toggle
    function handleLikeClick(event) {
        const likeBtn = event.currentTarget;
        const heartIcon = likeBtn.querySelector('.heart-icon');
        const likeCount = likeBtn.querySelector('.like-count');
        const storyPost = likeBtn.closest('.story-post');
        let currentLikes = parseInt(storyPost.getAttribute('data-likes'));

        if (heartIcon.classList.contains('liked')) {
            heartIcon.classList.remove('liked');
            heartIcon.innerHTML = '&#x2661;'; // Outlined heart
            likeCount.textContent = currentLikes - 1;
            storyPost.setAttribute('data-likes', currentLikes - 1);
        } else {
            heartIcon.classList.add('liked');
            heartIcon.innerHTML = '&#x2665;'; // Filled heart
            likeCount.textContent = currentLikes + 1;
            storyPost.setAttribute('data-likes', currentLikes + 1);
        }

        sortStories(); // Re-sort the stories after like change
    }

    // Sort stories by likes and comments
    function sortStories() {
        const storiesContainer = document.getElementById('stories-container');
        const stories = Array.from(storiesContainer.getElementsByClassName('story-post'));

        stories.sort((a, b) => {
            const likesA = parseInt(a.getAttribute('data-likes'));
            const commentsA = parseInt(a.getAttribute('data-comments'));
            const likesB = parseInt(b.getAttribute('data-likes'));
            const commentsB = parseInt(b.getAttribute('data-comments'));

            // Sort by likes first, then by comments
            if (likesB !== likesA) {
                return likesB - likesA;
            }
            return commentsB - commentsA;
        });

        // Append sorted stories back to the container
        stories.forEach(story => {
            storiesContainer.appendChild(story);
        });
    }

    // Add event listeners to existing like buttons
    document.querySelectorAll('.like').forEach(function (likeBtn) {
        likeBtn.addEventListener('click', handleLikeClick);
    });

    // Handle posting a new story
    const postBtn = document.getElementById('post-btn');
    postBtn.addEventListener('click', function () {
        const storyInput = document.getElementById('story-input');
        const storyContent = storyInput.value.trim();

        if (storyContent === "") {
            alert("Please write a story before posting.");
            return;
        }

        // Create a new story post element
        const storiesContainer = document.getElementById('stories-container');
        const newPostId = `post-${postIdCounter++}`;
        const newStory = document.createElement('div');
        newStory.classList.add('story-post');
        newStory.setAttribute('data-likes', '0');
        newStory.setAttribute('data-comments', '0');
        newStory.setAttribute('data-post-id', newPostId);

        newStory.innerHTML = `
            <div class="profile">
                <img src="profile2.jpg" alt="Profile Picture" class="profile-pic">
                <div class="profile-info">
                    <h4>You</h4>
                    <button class="follow-btn">Follow</button>
                </div>
            </div>
            <p class="story-content">${escapeHTML(storyContent)}</p>
            <div class="actions">
                <span class="like">
                    <i class="heart-icon">&#x2661;</i>
                    <span class="like-text">Like</span>
                    <span class="like-count">0</span>
                </span>
                <label for="${newPostId}-comment" class="comment-label">Comment (0)</label>
            </div>
            <div class="comment-section">
                <input type="text" id="${newPostId}-comment" placeholder="Write a comment..." class="comment-box">
                <button class="comment-btn">Yes</button>
                <div class="comments-container" style="display: none;">
                    <p><strong>Comments:</strong></p>
                    <ul class="comments-list">
                        <!-- Comments will appear here -->
                    </ul>
                    <a href="#" class="toggle-comments">Show Comments</a>
                </div>
            </div>
        `;

        storiesContainer.insertBefore(newStory, storiesContainer.firstChild);

        // Add event listener to the new like button
        const newLikeBtn = newStory.querySelector('.like');
        newLikeBtn.addEventListener('click', handleLikeClick);

        // Add event listener to the new comment button
        const newCommentBtn = newStory.querySelector('.comment-btn');
        newCommentBtn.addEventListener('click', handleCommentSubmit);

        // Add event listener to the new toggle comments link
        const newToggleComments = newStory.querySelector('.toggle-comments');
        newToggleComments.addEventListener('click', handleToggleComments);

        // Clear the story input box
        storyInput.value = "";

        sortStories(); // Re-sort after adding new story
    });

    // Handle comment submission
    function handleCommentSubmit(event) {
        const commentBtn = event.currentTarget;
        const commentSection = commentBtn.closest('.comment-section');
        const commentBox = commentSection.querySelector('.comment-box');
        const commentText = commentBox.value.trim();
        const storyPost = commentBtn.closest('.story-post');
        const commentsContainer = commentSection.querySelector('.comments-container');
        const commentsList = commentsContainer.querySelector('.comments-list');
        const commentLabel = storyPost.querySelector('.comment-label');

        if (commentText === "") {
            alert("Please write a comment before submitting.");
            return;
        }

        // Create a new comment element
        const newComment = document.createElement('li');
        newComment.textContent = commentText;
        commentsList.appendChild(newComment);

        // Increment comment count
        let currentComments = parseInt(storyPost.getAttribute('data-comments'));
        currentComments += 1;
        storyPost.setAttribute('data-comments', currentComments);
        commentLabel.textContent = `Comment (${currentComments})`;

        // Clear the comment box
        commentBox.value = "";

        // Show comments section if it's hidden
        if (commentsContainer.style.display === 'none') {
            commentsContainer.style.display = 'block';
            const toggleLink = commentsContainer.querySelector('.toggle-comments');
            toggleLink.textContent = 'Hide Comments';
        }

        sortStories(); // Re-sort based on updated comments
    }

    // Handle toggling comments visibility
    function handleToggleComments(event) {
        event.preventDefault();
        const toggleLink = event.currentTarget;
        const commentsContainer = toggleLink.closest('.comments-container');

        if (commentsContainer.style.display === 'none') {
            commentsContainer.style.display = 'block';
            toggleLink.textContent = 'Hide Comments';
        } else {
            commentsContainer.style.display = 'none';
            toggleLink.textContent = 'Show Comments';
        }
    }

    // Add event listeners to existing comment buttons and toggle links
    document.querySelectorAll('.comment-btn').forEach(function (commentBtn) {
        commentBtn.addEventListener('click', handleCommentSubmit);
    });

    document.querySelectorAll('.toggle-comments').forEach(function (toggleLink) {
        toggleLink.addEventListener('click', handleToggleComments);
    });

    // Function to escape HTML to prevent XSS
    function escapeHTML(str) {
        var p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }

    // Initial sorting
    sortStories();
});