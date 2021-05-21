// Holds the user input
var cards;

function solve()
{
  var cards = document.getElementById("user_input").value
  var ans = "";

  // 0,1,2,3 represents diamonds, spades, hearts, clubs respectively
  // Number order is assigned by corresponding index in the array "nums"
  var de_bruijn = [1, 1, 3, 3, 0, 0, 0, 1, 1, 0, 2, 2, 1, 0, 3, 0, 1, 0, 0, 1,
    2, 0, 3, 0, 1, 2, 2, 3, 3, 1, 3, 2, 1, 3, 3, 3, 1, 2, 3, 2, 0, 2, 2, 2, 3,
    2, 2, 0, 1, 3, 0, 1];

  var nums = ["J", "7", "4", "2", "3", "9", "K", "Q", "3", "6", "K", "7", "K",
    "4", "8", "J", "8", "A", "5", "6", "5", "8", "K", "2", "4", "10", "3", "A",
    "J", "5", "3", "Q", "9", "10", "9", "7", "2", "9", "Q", "6", "7", "4", "J",
    "A", "6", "8", "2", "10", "A", "5", "Q", "10"];

  // Finds the index of the card we wasnt
  ind = 0;
  suit_ans = -1;
  for (var i = 0; i < de_bruijn.length; i++) {
    var done = false;

    // Checks color
    // Creates a set of the removed cards and makes sure they are the same
    // parity (and that those cards not in the set are also the same parity)
    cur = 0;
    parity = -1;
    locations = new Set();
    remaining = new Set([1,2,3,4,5])
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
    suit = -1;
    locations.clear();
    left_over = new Set();
    while(cards[cur] != '.') {
      var val = (cards[cur]-'0');
      for (var j = 1; j < val; j++) {
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
    var res = (cards[cur]-'0');
    for (var j = 1; j <= res; j++) {
      if(!remaining.has(j)) {
        res++;
      }
    }

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

  document.getElementById("result").placeholder = ans;
}

//Toggles between real and fake screens
var toggled = false;
document.addEventListener('keydown', function(e) {
  if(e.key === 'w') {
    reveal();
    toggled = true;
  }
})

// Allows user to use 'Enter' button
document.addEventListener('keydown', function(f) {
  if(f.key === 'Enter' && toggled) {
    hide();
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
  cards = document.getElementById("user_input").value

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
document.addEventListener('keydown', function(e) {
  if(e.key === 's') {
    de_bruijn = [1, 1, 3, 3, 0, 0, 0, 1, 1, 0, 2, 2, 1, 0, 3, 0, 1, 0, 0, 1, 2,
      0, 3, 0, 1, 2, 2, 3, 3, 1, 3, 2, 1, 3, 3, 3, 1, 2, 3, 2, 0, 2, 2, 2, 3, 2,
      2, 0, 1, 3, 0, 1];
    random();
  }

  if(e.key === 'p') {
    de_bruijn = [1, 1, 3, 3, 0, 0, 0, 1, 0, 2, 2, 1, 0, 3, 0, 1, 0, 0, 1, 2, 0,
      3, 0, 1, 2, 3, 3, 1, 3, 2, 1, 3, 3, 3, 1, 2, 3, 2, 0, 2, 2, 2, 3, 2, 2, 0,
      1, 3, 0, 1];
    random();
  }
})
