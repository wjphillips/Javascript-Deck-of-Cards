//Deck creator function
	var Deck = function (){
		this.cards = Deck.prototype.reset();
	};

//Everything that will be in the Deck prototype
	Deck.prototype.suits = ["hearts", "diamonds", "spades", "clubs"];
	Deck.prototype.values = ["Ace", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "Jack", "Queen", "King"];
	Deck.prototype.pointValues = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

//The reset method clears the cards array and creates each card in order
	Deck.prototype.reset = function (){
		var suits = Deck.prototype.suits;
		var values = Deck.prototype.values;
		var pointValues = Deck.prototype.pointValues;
		var cards = [];
		for(i=0; i<suits.length; i++){
			for(j=0; j<values.length; j++){
				cards.push(new Card(suits[i], values[j], pointValues[j]));
			};
		};
		return cards;
	};

//The shuffle method puts the cards of the deck in random order
	Deck.prototype.shuffle = function (){
		var deck = this.cards;
		for (var i = (deck.length - 1); i > 0; i--){
    	var j = Math.floor(Math.random() * (i + 1));
    	var temp = deck[i];
    	deck[i] = deck[j];
    	deck[j] = temp;
  	};
		this.cards = deck;
		return this;
	};

//The draw method takes the top card from the deck and adds it to the players hand
	Deck.prototype.draw = function (player){
		if(player.hasBusted == true){
			console.log(player.name + " has busted and cannot draw another card.");
			return false;
		};
		if(player.totalPoints == 21){
			console.log(player.name + " has 21 and cannot draw another card.");
			return false;
		};
		var deck = this.cards;
		var card = deck[deck.length-1];
		console.log(card);
		player.hand.push(card);
		deck.pop();
	}

//Card creator function
	function Card(suit, value, pVal){
		this.suit = suit;
		this.val = value;
		this.pointValue = pVal;
		this.name = value + " of " + suit;
	};

//Player creator function
	function Player(name){
		this.name = name;
		this.hand = [];
		this.totalPoints = 0;
		this.numberOfAces = 0;
		this.hasBusted = false;
		this.calculateTotalPoints = function(){
			var temp = 0;
			var aceTemp = 0;
			var hand = this.hand;
			for(var i=0; i<hand.length; i++){
				if(hand[i].pointValue == "A"){
					aceTemp += 1;
				}
				else{
					temp += hand[i].pointValue;
				}
			};
			console.log("Non-ace points: " + temp);
			console.log("Number of Aces: " + aceTemp);
			switch(aceTemp){
				case 0:
					this.totalPoints = temp;
					break;
				case 1:
					if(21-temp >= 11){
						this.totalPoints = temp + 11;
					}
					else{
						this.totalPoints = temp + 1;
					}
					break;
				case 2:
					if(21-temp >= 12){
						this.totalPoints = temp + 12;
					}
					else{
						this.totalPoints = temp + 2;
					}
					break;
				case 3:
					if(21-temp >= 13){
						this.totalPoints = temp + 13;
					}
					else{
						this.totalPoints = temp + 3;
					}
					break;
				case 4:
					if(21-temp >= 14){
						this.totalPoints = temp + 14;
					}
					else{
						this.totalPoints = temp + 4;
					}
					break;
			};
			if(this.totalPoints > 21){
				console.log("User has busted.");
				this.hasBusted = true;
			};
			console.log("Total points for " + this.name + ": " + this.totalPoints);
		};
	};

//Game creator function
	function Game(){
		this.player = new Player("Player 1");
		this.dealer = new Player("Dealer");
		this.deck = new Deck();
		this.gameOver = false;
		for(var i=1; i<5; i++){
			this.deck.shuffle();
		};
		//for loop deals two cards to each player
		for(var i=1; i<=4; i++){
			var topCard = this.deck.cards[this.deck.cards.length-1];
			this.deck.cards.pop();
			if(i%2 != 0){
				console.log("Player one is being dealt the " + topCard.val + " of " + topCard.suit);
				this.player.hand.push(topCard);
				this.player.totalPoints += topCard.pointValue;
			}
			else{
				console.log("The dealer is being dealt the " + topCard.val + " of " + topCard.suit);
				this.dealer.hand.push(topCard);
				this.dealer.totalPoints += topCard.pointValue;
			}
		};
		//calculate starting point totals
		this.player.calculateTotalPoints();
		this.dealer.calculateTotalPoints();
	};