// Holds the user input
var cards;
var hit = false;
var toggled = false;
var poker_version = false;

// 0,1,2,3 represents diamonds, spades, hearts, clubs respectively
// Number order is assigned by corresponding index in the array "nums"
var de_bruijn = [1, 1, 3, 3, 0, 0, 0, 1, 1, 0, 2, 2, 1, 0, 3, 0, 1, 0, 0, 1,
  2, 0, 3, 0, 1, 2, 2, 3, 3, 1, 3, 2, 1, 3, 3, 3, 1, 2, 3, 2, 0, 2, 2, 2, 3,
  2, 2, 0, 1, 3, 0, 1];

var nums = ["Jack", "7", "4", "2", "3", "9", "King", "Queen", "3", "6",
  "King", "7", "King", "4", "8", "Jack", "8", "Ace", "5", "6", "5", "8",
  "King", "2", "4", "10", "3", "Ace", "Jack", "5", "3", "Queen", "9", "10",
  "9", "7", "2", "9", "Queen", "6", "7", "4", "Jack", "Ace", "6", "8", "2",
  "10", "Ace", "5", "Queen", "10"];

function solve()
{

  if(poker_version) {
    solve_poker();
    return;
  }

  var ans = "";

  // Finds the index of the card we wasnt
  var ind = -1;
  var suit_ans = -1;

  var cnt_ends = 0;
  for (var i = 0; i < cards.length; i++) {
    if(cards[i] == '.') {
      cnt_ends++;
    }
  }

  while(cnt_ends < 3) {
    cards += '.';
    cnt_ends++;
  }

  for (var i = 0; i < de_bruijn.length; i++) {
    var done = false;

    // Checks color
    // Creates a set of the removed cards and makes sure they are the same
    // parity (and that those cards not in the set are also the same parity)
    var cur = 0;
    var parity = -1;
    var locations = new Set();
    var remaining = new Set([1,2,3,4,5])
    while(cards[cur] != '.') {
      locations.add(cards[cur]-'0');
      remaining.delete(cards[cur]-'0');
      parity = de_bruijn[(i+(cards[cur]-'0')-1)%52]%2;
      cur++;
    }

    if(parity != -1) {
      for (var j = 1; j <= 5; j++) {
        cur_card = de_bruijn[(i+j-1)%52];
        if(locations.has(j)) {
          if(cur_card%2 != parity) {
            done = true;
          }
        }
        else {
          if(cur_card%2 == parity) {
            done = true;
          }
        }
      }
    }


    // Check suits
    // Creates a set of the removed cards and makes sure they are the same
    // suit (and that those cards not in the set that were not previously
    // removed are also the same parity)
    cur++;
    var suit = -1;
    locations.clear();
    left_over = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j <= val; j++) {
        if(!remaining.has(j)) {
          val++;
        }
      }
      locations.add(val);
      suit = de_bruijn[(i+val-1)%52];
      cur++;
    }

    for (var j = 1; j <= 5; j++) {
      cur_card = de_bruijn[(i+j-1)%52];
      if(locations.has(j)) {
        remaining.delete(j);
        if(cur_card != suit) {
          done = true;
        }
      }
      else {
        if(remaining.has(j)) {
          left_over.add(cur_card);
          if(cur_card == suit) {
            done = true;
          }
        }
      }
    }

    if(left_over.size > 1) {
      done = true;
    }

    // Sets index
    // If previous conditions are met, we have a match, so we get the index of
    // our desired card
    cur++;
    del = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j <= val; j++) {
        if(!remaining.has(j)) {
          val++;
        }
      }
      del.add(val);
      cur++;
    }

    del.forEach((item) => {
      remaining.delete(item);
    });

    var res = remaining.values().next().value;
    if(!done) {
      ind = (i+res-1)%52;
      suit_ans = de_bruijn[ind];
    }
  }

  // Gets the number of the card corresponding to the index
  num_ans = nums[ind];

  // Make and print answer string
  ans += "The " + num_ans;

  if(suit_ans == 0) {
    ans += " of Diamonds!";
  }
  else if(suit_ans == 1) {
    ans += " of Spades!";
  }
  else if(suit_ans == 2) {
    ans += " of Hearts!";
  }
  else {
    ans += " of Clubs!";
  }

  document.getElementById("result").placeholder = ans;

  var fake = document.getElementById("fake_btn");
  fake.style.display = "block";

  var final = document.getElementById("final_btn");
  final.style.display = "none";
}

// Solve method for poker version
function solve_poker() {
  var ans = "";

  // Finds the index of the card we wasnt
  var ind = -1;
  var suit_ans = -1;

  var cnt_ends = 0;
  for (var i = 0; i < cards.length; i++) {
    if(cards[i] == '.') {
      cnt_ends++;
    }
  }

  while(cnt_ends < 3) {
    cards += '.';
    cnt_ends++;
  }

  for (var i = 0; i < de_bruijn.length; i++) {
    var done = false;

    // Checks color
    // Creates a set of the removed cards and makes sure they are the same
    // parity (and that those cards not in the set are also the same parity)
    var cur = 0;
    var parity = -1;
    var locations = new Set();
    var remaining = new Set([1,2,3,4,5])
    while(cards[cur] != '.') {
      locations.add(cards[cur]-'0');
      remaining.delete(cards[cur]-'0');
      parity = de_bruijn[(i+((cards[cur]-'0')-1)*5)%50]%2;
      cur++;
    }

    if(parity != -1) {
      for (var j = 1; j <= 5; j++) {
        cur_card = de_bruijn[(i+(j-1)*5)%50];
        if(locations.has(j)) {
          if(cur_card%2 != parity) {
            done = true;
          }
        }
        else {
          if(cur_card%2 == parity) {
            done = true;
          }
        }
      }
    }


    // Check suits
    // Creates a set of the removed cards and makes sure they are the same
    // suit (and that those cards not in the set that were not previously
    // removed are also the same parity)
    cur++;
    var suit = -1;
    locations.clear();
    left_over = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j <= val; j++) {
        if(!remaining.has(j)) {
          val++;
        }
      }
      locations.add(val);
      suit = de_bruijn[(i+(val-1)*5)%50];
      cur++;
    }

    for (var j = 1; j <= 5; j++) {
      cur_card = de_bruijn[(i+(j-1)*5)%50];
      if(locations.has(j)) {
        remaining.delete(j);
        if(cur_card != suit) {
          done = true;
        }
      }
      else {
        if(remaining.has(j)) {
          left_over.add(cur_card);
          if(cur_card == suit) {
            done = true;
          }
        }
      }
    }

    if(left_over.size > 1) {
      done = true;
    }

    // Sets index
    // If previous conditions are met, we have a match, so we get the index of
    // our desired card
    cur++;
    del = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j <= val; j++) {
        if(!remaining.has(j)) {
          val++;
        }
      }
      del.add(val);
      cur++;
    }

    del.forEach((item) => {
      remaining.delete(item);
    });

    var res = remaining.values().next().value;
    if(!done) {
      ind = (i+(res-1)*5)%50;
      suit_ans = de_bruijn[ind];
    }
  }

  // Gets the number of the card corresponding to the index
  num_ans = nums[ind];

  // Make and print answer string
  ans += "The " + num_ans;

  if(suit_ans == 0) {
    ans += " of Diamonds!";
  }
  else if(suit_ans == 1) {
    ans += " of Spades!";
  }
  else if(suit_ans == 2) {
    ans += " of Hearts!";
  }
  else {
    ans += " of Clubs!";
  }

  document.getElementById("result").placeholder = ans;

  var fake = document.getElementById("fake_btn");
  fake.style.display = "block";

  var final = document.getElementById("final_btn");
  final.style.display = "none";
}

// Makes sure input format is correct
function format() {
  var invalid = false;
  cards = document.getElementById("user_input").value;

  var cnt_ends = 0;
  for (var i = 0; i < cards.length; i++) {
    if(cards[i] == '.') {
      cnt_ends++;
    }
  }

  while(cnt_ends < 3) {
    cards += '.';
    cnt_ends++;
  }

  if(cards.length < 3) {
    invalid = true;
  }
  else {
    var cur = 0;
    var removed = 0;

    var freq = 0;
    for (var i = 0; i < cards.length; i++) {
      if(cards[i] == '.') {
        freq++;
      }
      if(cards[i] != '.' && (cards[i] > '5' || cards[i] < '1')) {
        invalid = true;
      }
    }

    if(freq < 2) {
      invalid = true;
    }

    var first = 0;
    if(!invalid) {
      while(cards[cur] != '.') {
        if((cards[cur]-'0') > 5-removed) {
          invalid = true;
        }

        cur++
        first++;
      }

      cur++;
      removed += first;
      var second = 0;
      while(cards[cur] != '.') {

        if((cards[cur]-'0') > 5-removed) {
          invalid = true;
        }

        cur++
        second++;
      }

      cur++;
      removed += second;
      while(cards[cur] != '.') {

        if((cards[cur]-'0') > 5-removed) {
          invalid = true;
        }

        cur++
      }
    }
  }

  if(invalid) {
    error_msg = "The input sequence is invalid. Please enter another code.";
    document.getElementById("user_input").value = "";
    document.getElementById("user_input").placeholder = error_msg;
  }
  else {
    if(poker_version) {
      valid_poker();
    }
    else {
      valid();
    }
  }
}

function valid() {
  // Finds the index of the card we wasnt
  var ind = -1;
  var suit_ans = -1;
  for (var i = 0; i < de_bruijn.length; i++) {
    var done = false;

    // Checks color
    // Creates a set of the removed cards and makes sure they are the same
    // parity (and that those cards not in the set are also the same parity)
    var cur = 0;
    var parity = -1;
    var locations = new Set();
    var remaining = new Set([1,2,3,4,5])
    while(cards[cur] != '.') {
      locations.add(cards[cur]-'0');
      remaining.delete(cards[cur]-'0');
      parity = de_bruijn[(i+(cards[cur]-'0')-1)%52]%2;
      cur++;
    }

    if(parity != -1) {
      for (var j = 1; j <= 5; j++) {
        cur_card = de_bruijn[(i+j-1)%52];
        if(locations.has(j)) {
          if(cur_card%2 != parity) {
            done = true;
          }
        }
        else {
          if(cur_card%2 == parity) {
            done = true;
          }
        }
      }
    }

    // Check suits
    // Creates a set of the removed cards and makes sure they are the same
    // suit (and that those cards not in the set that were not previously
    // removed are also the same parity)
    cur++;
    var suit = -1;
    locations.clear();
    left_over = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j <= val; j++) {
        if(!remaining.has(j)) {
          val++;
        }
      }
      locations.add(val);
      suit = de_bruijn[(i+val-1)%52];
      cur++;
    }

    for (var j = 1; j <= 5; j++) {
      cur_card = de_bruijn[(i+j-1)%52];
      if(locations.has(j)) {
        remaining.delete(j);
        if(cur_card != suit) {
          done = true;
        }
      }
      else {
        if(remaining.has(j)) {
          left_over.add(cur_card);
          if(cur_card == suit) {
            done = true;
          }
        }
      }
    }

    if(left_over.size > 1) {
      done = true;
    }

    // Sets index
    // If previous conditions are met, we have a match, so we get the index of
    // our desired card
    cur++;
    del = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j <= val; j++) {
        if(!remaining.has(j)) {
          val++;
        }
      }
      del.add(val);
      cur++;
    }

    del.forEach((item) => {
      remaining.delete(item);
    });

    var res = remaining.values().next().value;

    if(!done) {
      ind = (i+res-1)%52;
      suit_ans = de_bruijn[ind];
    }
  }

  if(ind == -1) {
    error_msg = "The input sequence is invalid. Please enter another code.";
    document.getElementById("user_input").value = "";
    document.getElementById("user_input").placeholder = error_msg;
  }
  else {
    hide();
  }
}

// Checks if poker hand sequence is valid
function valid_poker() {
  var ans = "";

  // Finds the index of the card we wasnt
  var ind = -1;
  var suit_ans = -1;

  var cnt_ends = 0;
  for (var i = 0; i < cards.length; i++) {
    if(cards[i] == '.') {
      cnt_ends++;
    }
  }

  while(cnt_ends < 3) {
    cards += '.';
    cnt_ends++;
  }

  for (var i = 0; i < de_bruijn.length; i++) {
    var done = false;

    // Checks color
    // Creates a set of the removed cards and makes sure they are the same
    // parity (and that those cards not in the set are also the same parity)
    var cur = 0;
    var parity = -1;
    var locations = new Set();
    var remaining = new Set([1,2,3,4,5])
    while(cards[cur] != '.') {
      locations.add(cards[cur]-'0');
      remaining.delete(cards[cur]-'0');
      parity = de_bruijn[(i+((cards[cur]-'0')-1)*5)%50]%2;
      cur++;
    }


    if(parity != -1) {
      for (var j = 1; j <= 5; j++) {
        cur_card = de_bruijn[(i+(j-1)*5)%50];
        if(locations.has(j)) {
          if(cur_card%2 != parity) {
            done = true;
          }
        }
        else {
          if(cur_card%2 == parity) {
            done = true;
          }
        }
      }
    }


    // Check suits
    // Creates a set of the removed cards and makes sure they are the same
    // suit (and that those cards not in the set that were not previously
    // removed are also the same parity)
    cur++;
    var suit = -1;
    locations.clear();
    left_over = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j <= val; j++) {
        if(!remaining.has(j)) {
          val++;
        }
      }
      locations.add(val);
      suit = de_bruijn[(i+(val-1)*5)%50];
      cur++;
    }

    for (var j = 1; j <= 5; j++) {
      cur_card = de_bruijn[(i+(j-1)*5)%50];
      if(locations.has(j)) {
        remaining.delete(j);
        if(cur_card != suit) {
          done = true;
        }
      }
      else {
        if(remaining.has(j)) {
          left_over.add(cur_card);
          if(cur_card == suit) {
            done = true;
          }
        }
      }
    }

    if(left_over.size > 1) {
      done = true;
    }

    // Sets index
    // If previous conditions are met, we have a match, so we get the index of
    // our desired card
    cur++;
    del = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j <= val; j++) {
        if(!remaining.has(j)) {
          val++;
        }
      }
      del.add(val);
      cur++;
    }

    del.forEach((item) => {
      remaining.delete(item);
    });

    var res = remaining.values().next().value;

    if(!done) {
      ind = (i+(res-1)*5)%50;
      suit_ans = de_bruijn[ind];
    }
  }

  if(ind == -1) {
    error_msg = "The input sequence is invalid. Please enter another code.";
    document.getElementById("user_input").value = "";
    document.getElementById("user_input").placeholder = error_msg;
  }
  else {
    hide();
  }
}

// Outputs random answer
function random() {
  ans = "";
  print_ans = "";
  num_ans = Math.floor(Math.random()*13)+1;
  if(num_ans == 1) {
    print_ans = "Ace";
  }
  else if(num_ans == 11) {
    print_ans = "Jack";
  }
  else if(num_ans == 12) {
    print_ans = "Queen";
  }
  else if(num_ans == 13) {
    print_ans = "King"
  }
  else {
    print_ans += num_ans;
  }

  ans += "The " + print_ans;

  suit_ans = Math.floor(Math.random()*4);
  if(suit_ans == 0) {
    ans += " of Diamonds!";
  }
  else if(suit_ans == 1) {
    ans += " of Spades!";
  }
  else if(suit_ans == 2) {
    ans += " of Hearts!";
  }
  else {
    ans += " of Clubs!";
  }

  toggled = false;
  document.getElementById("result").placeholder = ans;
}

//Toggles between real and fake screens
document.addEventListener('keydown', function(e) {
  if(e.key === 'w') {
    reveal();
    toggled = true;
  }
})

window.addEventListener('click', function (evt) {
    if (evt.detail === 5) {
      reveal();
      toggled = true;
    }
});

// Allows user to use 'Enter' button
document.addEventListener('keydown', function(f) {
  if(f.key === 'Enter' && toggled) {
    format();
  }
})

// Changes state to real version
function reveal() {

  document.getElementById("result").placeholder = "Hmmm... your card is...";

  var img = document.getElementById("wiz");
  img.style.display = "none";

  var res = document.getElementById("res");
  res.style.display = "none";

  var fake = document.getElementById("fake_btn");
  fake.style.display = "none";

  var real = document.getElementById("real_btn");
  real.style.display = "block";

  var input = document.getElementById("input");
  input.style.display = "block";
}

// Hide input box for user
function hide() {
  var img = document.getElementById("wiz");
  img.style.display = "block";

  var res = document.getElementById("res");
  res.style.display = "block";

  var input = document.getElementById("input");
  input.style.display = "none";

  var real = document.getElementById("real_btn");
  real.style.display = "none";

  var final = document.getElementById("final_btn");
  final.style.display = "block";
}

// Swiches card decks
// 0,1,2,3 represents diamonds, spades, hearts, clubs respectively
// Number order is assigned by corresponding index in the array "nums"
document.addEventListener('keydown', function(g) {
  if(g.key === 's') {
    poker_version = false;
    de_bruijn = [1, 1, 3, 3, 0, 0, 0, 1, 1, 0, 2, 2, 1, 0, 3, 0, 1, 0, 0, 1, 2,
      0, 3, 0, 1, 2, 2, 3, 3, 1, 3, 2, 1, 3, 3, 3, 1, 2, 3, 2, 0, 2, 2, 2, 3, 2,
      2, 0, 1, 3, 0, 1];

    nums = ["Jack", "7", "4", "2", "3", "9", "King", "Queen", "3", "6",
      "King", "7", "King", "4", "8", "Jack", "8", "Ace", "5", "6", "5", "8",
      "King", "2", "4", "10", "3", "Ace", "Jack", "5", "3", "Queen", "9", "10",
      "9", "7", "2", "9", "Queen", "6", "7", "4", "Jack", "Ace", "6", "8", "2",
      "10", "Ace", "5", "Queen", "10"];
  }

  if(g.key === 'p') {
    poker_version = true;
    de_bruijn = [1, 1, 3, 3, 0, 0, 0, 1, 0, 2, 2, 1, 0, 3, 0, 1, 0, 0, 1, 2, 0,
      3, 0, 1, 2, 3, 3, 1, 3, 2, 1, 3, 3, 3, 1, 2, 3, 2, 0, 2, 2, 2, 3, 2, 2, 0,
      1, 3, 0, 1];

    nums = ["Jack", "7", "4", "2", "3", "9", "King", "3", "6", "King",
      "7", "King", "4", "8", "Jack", "8", "Ace", "5", "6", "5", "8", "King",
      "2", "4", "3", "Ace", "Jack", "5", "3", "Queen", "9", "10", "9",
      "7", "2", "9", "Queen", "6", "7", "4", "Jack", "Ace", "6", "8", "2",
      "10", "Ace", "5", "Queen", "10"];
  }
})
