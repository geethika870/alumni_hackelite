// Arrays to store questions
let allQuestions = [];
let userQuestions = [];
let currentQuestionId = null; // To keep track of the question being answered

// Toggle sections based on selected question type
document.getElementById('questionType').addEventListener('change', function () {
    const typeSection = document.getElementById('typeQuestionSection');
    const uploadSection = document.getElementById('uploadQuestionSection');

    if (this.value === 'type') {
        typeSection.classList.remove('d-none');
        uploadSection.classList.add('d-none');
    } else if (this.value === 'upload') {
        typeSection.classList.add('d-none');
        uploadSection.classList.remove('d-none');
    } else {
        typeSection.classList.add('d-none');
        uploadSection.classList.add('d-none');
    }
});

// Handle form submission
document.getElementById('askQuestionForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    const questionType = document.getElementById('questionType').value;
    let questionText = '';

    if (questionType === 'type') {
        questionText = document.getElementById('typedQuestion').value;
    } else if (questionType === 'upload') {
        questionText = 'Document uploaded'; // Placeholder text for uploaded questions
    }

    if (questionText) {
        const questionId = Date.now(); // Use timestamp as a unique ID
        const question = {
            id: questionId,
            text: questionText,
            answers: [],
            askedByCurrentUser: true, // Mark this question as asked by the current user
        };

        allQuestions.push(question);
        userQuestions.push(question);

        addUserQuestion(question);
        addAllQuestion(question);

        this.reset(); // Reset form
        document.getElementById('typeQuestionSection').classList.add('d-none');
        document.getElementById('uploadQuestionSection').classList.add('d-none');
        document.getElementById('questionType').value = '';
    }
});

// Add a question to the User's Questions section
function addUserQuestion(question) {
    const container = document.getElementById('userQuestionsContainer');
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    questionItem.id = `user-question-${question.id}`;
    questionItem.innerHTML = `
        <p><strong>Question:</strong> ${question.text}</p>
        <p><strong>Status:</strong> <span id="status-${question.id}" class="not-answered">Not Answered Yet</span></p>
        <div class="answers-section" id="user-answers-${question.id}"></div>
    `;
    container.prepend(questionItem); // Add to the top
}

// Add a question to the All Questions section
function addAllQuestion(question) {
    const container = document.getElementById('allQuestionsContainer');
    const questionItem = document.createElement('div');
    questionItem.className = 'question-item';
    questionItem.id = `question-${question.id}`;
    questionItem.innerHTML = `
        <p><strong>Question:</strong> ${question.text}</p>
        <div class="answers-section" id="answers-${question.id}"></div>
        <button class="btn btn-answer" onclick="showAnswerModal(${question.id})">Answer</button>
    `;
    container.prepend(questionItem); // Add to the top
}

// Show answer modal
function showAnswerModal(questionId) {
    currentQuestionId = questionId; // Set the current question ID

    const answerModal = new bootstrap.Modal(document.getElementById('answerModal'));
    answerModal.show();

    // Reset the answer type selection
    document.getElementById('answerType').value = '';

    // Hide answer input sections
    document.getElementById('typeAnswerSection').classList.add('d-none');
    document.getElementById('uploadAnswerSection').classList.add('d-none');

    // Clear the input fields each time the modal is opened
    document.getElementById('typedAnswer').value = '';
    document.getElementById('uploadAnswer').value = '';

    // Handle answer submission
    document.getElementById('submitAnswerBtn').onclick = function () {
        const answerType = document.getElementById('answerType').value;
        let answerText = '';

        if (answerType === 'type') {
            answerText = document.getElementById('typedAnswer').value;
        } else if (answerType === 'upload') {
            answerText = 'Document uploaded'; // Placeholder text for uploaded answers
        }

        if (answerText) {
            addAnswerToQuestion(currentQuestionId, answerText);
            answerModal.hide();
        }
    };

    // Toggle sections based on selected answer type
    document.getElementById('answerType').addEventListener('change', function () {
        const typeAnswerSection = document.getElementById('typeAnswerSection');
        const uploadAnswerSection = document.getElementById('uploadAnswerSection');

        if (this.value === 'type') {
            typeAnswerSection.classList.remove('d-none');
            uploadAnswerSection.classList.add('d-none');
        } else if (this.value === 'upload') {
            typeAnswerSection.classList.add('d-none');
            uploadAnswerSection.classList.remove('d-none');
        } else {
            typeAnswerSection.classList.add('d-none');
            uploadAnswerSection.classList.add('d-none');
        }
    });
}

// Add an answer to the corresponding question
function addAnswerToQuestion(questionId, answerText) {
    // Find the question in the allQuestions array
    const question = allQuestions.find(q => q.id === questionId);
    if (question) {
        question.answers.push(answerText);

        // Update the All Questions section
        const answersSection = document.getElementById(`answers-${questionId}`);
        const answerItem = document.createElement('p');
        answerItem.innerHTML = `<strong>Answer:</strong> ${answerText}`;
        answersSection.appendChild(answerItem);

        // If the question was asked by the current user, update the User's Questions section
        if (question.askedByCurrentUser) {
            const userAnswersSection = document.getElementById(`user-answers-${questionId}`);
            const userAnswerItem = document.createElement('p');
            userAnswerItem.innerHTML = `<strong>Answer:</strong> ${answerText}`;
            userAnswersSection.appendChild(userAnswerItem);

            // Update the status to 'Answered'
            const statusElement = document.getElementById(`status-${questionId}`);
            statusElement.textContent = 'Answered';
            statusElement.classList.remove('not-answered');
            statusElement.classList.add('answered');
        }
    }
}

// Display all questions
document.getElementById('displayAllBtn').addEventListener('click', function () {
    document.getElementById('previousQuestionsSection').classList.add('d-none');
    document.getElementById('allQuestionsSection').classList.toggle('d-none');
    document.getElementById('previousQuestionsContainer').innerHTML = '';
});
