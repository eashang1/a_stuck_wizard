# Sledgehammer Stack
Uses a De Bruijn sequence arrangement of a deck of cards to perform a magic trick

1) Prearrange your deck in the order 3, 0, 1, 3, 0, 2, 3, 2, 3, 1, 1, 0, 0, 0, 3, 2, 1, 2, 3, 2, 2, 0, 2, 0, 3, 3, 1, 0, 1, 1, 1, 3, 1, 1, 3, 2, 1, 0, 0, 3, 2, 2, 0, 0, 0, 2, 2, 1, 2, 3, 1, 3, where 0,1,2, and 3 represent heart, clubs, diamonds, and spades respectively and the card numbers are in ascending order (A,2,3,4,5,6,7,8,9,10,J,Q,K)

2) Press 'w' to get to the page that will take input (the default is a fake). You can also toggle which deck you want using '2' (for the default 52 cards) or '0' (for a 50 card deck)

3) Cut the deck (take some portion off the top of the deck and move it to the bottom)

4) Pick any five consecutive cards

5) Now among your five cards, you will have one color that is more common and one that is less common. Remove the cards at locations with the less common color and enter these locations followed by 0. For example, if your sequence is 30130, you would remove clubs/spades, so you would enter 250.

6) Now you have two remaining suits. Pick the least common and remove cards of that suit. Enter the corresponding locations followed by 0. If your original sequence was 30130, you would have hearts/diamonds remaining after step 4. There are no diamonds, so this is the least common. Since there are none, you would just enter 0. If there were diamonds you would enter their locations in the original hand and then 0.

7) Now pick one of your remaining cards and enter its location. For the hand 30130 you would have hearts remaining at locations 2 and 5. You can enter either of these.

8) Click guess and the magician stuck on this website will guess your card!
