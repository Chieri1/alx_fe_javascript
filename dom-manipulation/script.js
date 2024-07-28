const quotes = [
    { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Inspiration" },
    { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", category: "Motivation" },
    { text: "The best way to predict the future is to create it.", category: "Innovation" }
  ];
  
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>${quote.text}</p><p><em>- ${quote.category}</em></p>`;
  }
  
  document.getElementById('newQuote').addEventListener('click', showRandomQuote);

  
  function createAddQuoteForm() {
    // Create form elements
    const form = document.createElement('div');
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';


    function addQuote() {
        const newQuoteText = document.getElementById('newQuoteText').value;
        const newQuoteCategory = document.getElementById('newQuoteCategory').value;
        if (newQuoteText && newQuoteCategory) {
          quotes.push({ text: newQuoteText, category: newQuoteCategory });
          document.getElementById('newQuoteText').value = '';
          document.getElementById('newQuoteCategory').value = '';
          saveQuotes(); // Save quotes to local storage
          alert('Quote added successfully!');
        } else {
          alert('Please enter both the quote text and category.');
        }
      }
      
  
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
  
    const addButton = document.createElement('button');
    addButton.textContent = 'Add Quote';
    addButton.addEventListener('click', addQuote);
  
    // Append form elements to the form container
    form.appendChild(quoteInput);
    form.appendChild(categoryInput);
    form.appendChild(addButton);
  
    // Append the form to the body or a specific container
    document.body.appendChild(form);
  }
  
  // Call this function to create the form on page load
  createAddQuoteForm();


  function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }
  
  function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
      quotes = JSON.parse(storedQuotes);
    }
  }
  
  // Call this function to load quotes on page load
  loadQuotes();

  function exportToJsonFile() {
    // Convert the quotes array to a JSON string with formatting
    const dataStr = JSON.stringify(quotes, null, 2);
  
    // Create a Blob object from the JSON string, specifying the MIME type as application/json
    const blob = new Blob([dataStr], { type: 'application/json' });
  
    // Generate a URL for the Blob object
    const url = URL.createObjectURL(blob);
  
    // Create an anchor element to facilitate downloading the JSON file
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', 'quotes.json'); // Set the default file name
  
    // Append the anchor element to the document body and trigger the download
    document.body.appendChild(linkElement);
    linkElement.click();
  
    // Clean up by removing the anchor element and revoking the Blob URL
    document.body.removeChild(linkElement);
    URL.revokeObjectURL(url);
  }
  
  

  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      saveQuotes(); // Update local storage with imported quotes
      alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
  }
 
  
  function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category));
    
    // Clear existing options except the 'All Categories' option
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  
    // Populate dropdown with unique categories
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  
    // Load the last selected filter from local storage
    const lastSelectedCategory = localStorage.getItem('selectedCategory');
    if (lastSelectedCategory) {
      categoryFilter.value = lastSelectedCategory;
      filterQuotes();
    }
  }
  
  populateCategoryFilter();

  
  function filterQuotes() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = '';
  
    // Filter quotes based on selected category
    const filteredQuotes = categoryFilter === 'all'
      ? quotes
      : quotes.filter(quote => quote.category === categoryFilter);
  
    // Display filtered quotes
    filteredQuotes.forEach(quote => {
      const quoteElement = document.createElement('div');
      quoteElement.innerHTML = `<p>${quote.text}</p><p><em>- ${quote.category}</em></p>`;
      quoteDisplay.appendChild(quoteElement);
    });
  
    // Save the selected category to local storage
    localStorage.setItem('selectedCategory', categoryFilter);
  }
  


  