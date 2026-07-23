// ==========================================
// Step 1: Form Validation Logic
// ==========================================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    // 1. Prevent the page from automatically reloading on submit
    e.preventDefault();

    // 2. Grab inputs
    const nameInput = document.getElementById('name').value.trim();
    const emailInput = document.getElementById('email').value.trim();

    // 3. Grab error text fields
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const successMessage = document.getElementById('successMessage');

    // Reset previous errors and success states
    nameError.textContent = '';
    emailError.textContent = '';
    successMessage.textContent = '';

    let isValid = true;

    // 4. Validate Name field
    if (nameInput === '') {
        nameError.textContent = 'Name field is required.';
        isValid = false;
    }

    // 5. Validate Email field (Presence check + Regex validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput === '') {
        emailError.textContent = 'Email field is required.';
        isValid = false;
    } else if (!emailRegex.test(emailInput)) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // 6. Action if entirely valid
    if (isValid) {
        successMessage.textContent = 'Form submitted successfully!';
        document.getElementById('contactForm').reset();
    }
});

// ==========================================
// Step 2: Dark Mode Persistent Logic
// ==========================================
const themeToggleBtn = document.getElementById('themeToggle');

// 1. Check if user previously saved a preference in localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggleBtn.textContent = '☀️ Light Mode';
}

// 2. Add Event Listener to toggle the class state on click
themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Check if dark mode is active to save state configuration
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️ Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙 Dark Mode';
    }
});

// ==========================================
// Step 3 & 4: API Fetch with State Management
// ==========================================
function fetchBlogPosts() {
    const container = document.getElementById('apiDataContainer');

    // 1. STATE: Display the Loading Spinner immediately when network request initializes
    container.innerHTML = '<div class="spinner" id="loadingSpinner"></div>';

    // Simulate a slight network delay (1 second) so you can actually see the spinner work!
    setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=3')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(posts => {
                // 2. STATE: Clear spinner and render success state layout cards
                container.innerHTML = '';

                posts.forEach(post => {
                    const card = document.createElement('div');
                    card.className = 'api-card';
                    card.innerHTML = `
                        <h3>${post.title}</h3>
                        <p>${post.body}</p>
                    `;
                    container.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Fetch operation failure details:', error);
                
                // 3. STATE: Clear spinner and render custom component error banner state
                container.innerHTML = `
                    <div class="error-box">
                        ⚠️ <strong>Failed to load data feed.</strong><br>
                        Please check your internet connection and try refreshing.
                    </div>
                `;
            });
    }, 1000); // 1000 milliseconds delay
}

// Call the engine automatically when script evaluates
fetchBlogPosts();
