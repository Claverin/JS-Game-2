var cards = ["ciri.png","geralt.png","jaskier.png","jaskier.png","iorweth.png","triss.png","geralt.png","yen.png","ciri.png","triss.png","yen.png","iorweth.png"];
shuffle(cards);
//alert (cards[4]);

//console.log(cards);
var c = [];
for (let i = 0; i < 12; i++) 
{
    c[i] = document.getElementById('c' + i);
    c[i].addEventListener("click", () => revealCard(i));
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var lock = false;
var pairsLeft = 6;

function revealCard(nr){

    var opacityValue = $("#c"+nr).css('opacity');

    //alert('Opacity: '+opacityValue)

    if(opacityValue != 0 && lock == false  && visible_nr != nr){
        lock = true;

        //alert (nr);
        var obraz = "url(img/" + cards[nr] + ")";

        $('#c'+nr).css('background-image', obraz);
        $('#c'+nr).addClass('cardA');
        $('#c'+nr).removeClass('card');

        if(oneVisible == false){
            //first card

            oneVisible=true;
            visible_nr = nr;
            lock = false;
        }
        else{
            //secound card

            if(cards[visible_nr] == cards[nr]){
                //alert("para!");
                setTimeout(function() {hide2Cards(nr, visible_nr)}, 750);
            }
            else{
                //alert("pudło!");
                setTimeout(function() {restore2Cards(nr, visible_nr)}, 1000);
            }

            turnCounter++;
            $('.score').html("Turn counter: "+turnCounter);
            oneVisible = false;
        }

    }
}

function hide2Cards(nr1, nr2){
    $('#c'+nr1).css('visibility','hidden');
    $('#c'+nr2).css('visibility','hidden');

    pairsLeft--;

    if(pairsLeft == 0){
        $('.board').html('<h1>You Win!</h1><br>Done in '+turnCounter+' turns!</h1>');
    }
    lock = false;
}

function restore2Cards(nr1, nr2){
    $('#c'+nr1).css('background-image', 'url("img/karta.png")');
    $('#c'+nr1).addClass('card');
    $('#c'+nr1).removeClass('cardA');

    $('#c'+nr2).css('background-image', 'url("img/karta.png")');
    $('#c'+nr2).addClass('card');
    $('#c'+nr2).removeClass('cardA');

    lock = false;
}

function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
}