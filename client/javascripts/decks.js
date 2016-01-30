//Deck Creator function
	var Deck = function (){
		this.cards = Deck.prototype.reset();
	};

//Card Creator function
	function Card(suit, value){
		this.suit = suit;
		this.val = value;
	};

//Everything that will be in the Deck prototype
	Deck.prototype.suits = ["hearts", "diamonds", "spades", "clubs"];
	Deck.prototype.values = ["Ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "Jack", "Queen", "King"];
	
//The reset method clears the cards array and creates each card in order
	Deck.prototype.reset = function (){
		var suits = Deck.prototype.suits;
		var values = Deck.prototype.values;
		var cards = [];
		for(i=0; i<suits.length; i++){
			for(j=0; j<values.length; j++){
				cards.push(new Card(suits[i], values[j]));
			};
		};
		return cards;
	};