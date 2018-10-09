
const tweetList = document.querySelector(`#tweet-list`);
eventListener();

// -----------------------------------------------------
// ******* EVENT-LISTENERS ********
function eventListener() {
  const form = document.querySelector(`#form`);
  
// Form Submission  
  form.addEventListener(`submit`, newTweet);

// Remove tweets from list
  tweetList.addEventListener(`click`, removeTweet);

// Keep on DOM from Local Storage when reloading
  document.addEventListener(`DOMContentLoaded`, localStorageOnload);
}


// -----------------------------------------------------
// ******* ADDING TWEETS ********
function newTweet(e){
  e.preventDefault();   
  const tweet = document.querySelector(`#tweet`).value; 
  const li = document.createElement(`li`);
  const removeBtn = document.createElement(`a`);

  if ( tweet !== '') {
//Create remove button
  removeBtn.classList  = `remove-tweet`;
  removeBtn.textContent = `X`;

//Create <li> elements
  li.textContent = tweet;
  tweetList.appendChild(li); 

// Add Remove Button
  li.appendChild(removeBtn);   

// Add to Local Storage
  addTweetLocalStorage(tweet); 

// Reset form after saving tweet  
  form.reset();
  }  
}

// -----------------------------------------------------
// ******* REMOVING TWEETS ********
function removeTweet(e) {
  e.preventDefault();
  if (e.target.classList.contains(`remove-tweet`)){
    e.target.parentElement.remove();
  }

  // Remove Tweet from Local Storage
  removeTweetLS(e.target.parentElement.textContent);
}

// -----------------------------------------------------
// ******* Local Storage ********
// Add tweets to Local Storage
function addTweetLocalStorage(tweet){
  let tweets = getTweetFromStorage();
  
  // Add tweets into Array
  tweets.push(tweet);

  // Convert Array into string
  localStorage.setItem(`tweets`, JSON.stringify(tweets));
}

// Get from storage
function getTweetFromStorage(){
  let tweets;
  const tweetsLS = localStorage.getItem(`tweets`);

  // Get value, if null we create empty array
  if(tweetsLS === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(tweetsLS);
  }
  return tweets;
}

// Local Storage on Load
function localStorageOnload() {
    let tweets = getTweetFromStorage();
    
  //Looping through storage and print values to DOM   
  tweets.forEach(function(tweet) {
      const removeBtn = document.createElement(`a`);
      const li = document.createElement(`li`);

      removeBtn.classList  = `remove-tweet`;
      removeBtn.textContent = `X`;

      li.textContent = tweet;
      tweetList.appendChild(li); 

      li.appendChild(removeBtn);   
      addTweetLocalStorage(tweet);
  }); 
}

// Remove Tweet From Local Storage
function removeTweetLS(tweet) {
  let tweets = getTweetFromStorage();

  // Remove X from Tweets
  const tweetDelete = tweet.substring(0, tweet.length - 1);
  console.log(tweetDelete);
}



































