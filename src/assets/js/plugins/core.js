var introVideo = document.getElementById("intro-video");
var voiceButton = document.getElementById("voice-button");
var voiceVideo = document.getElementById("voice-video");
var outroButton = document.getElementById("outro-button");
var outroVideo = document.getElementById("outro-video");


var text = document.querySelectorAll('.reveal');
text.forEach(function(paragraph) {
    paragraph.innerHTML = "<div class='crop'><span class='word'>" + paragraph.textContent.replace(/\s+/g, "</span></div>$&<div class='crop'><span class='word'>") + "</span></div>";
});

var letters = document.querySelectorAll('.break');
letters.forEach(function(letter) {
    letter.innerHTML = letter.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
});

anime.timeline({
    loop: false,
})
.add({
    delay: (el, i) => 150 * i,
    easing: "easeOutQuart",
    targets: '.intro-animation .word',
    translateY: ['100%', '0%'],
}).add({
    delay: (el, i) => 150 * i,
    easing: "easeInQuart",
    targets: '.intro-animation .word',
    translateY: ['0%', '-100%'],
}).add({
    delay: 0,
    easing: "easeOutQuart",
    targets: '.intro-animation .logo',
    translateY: ['100%', '0%'],
});

var waypoint = new Waypoint({
    element: document.getElementById('vibration-animation'),
    handler: function() {
        introVideo.play(),
        anime.timeline({
            loop: false,
        })
        .add({
            delay: (el, i) => 50 * i,
            easing: "easeInQuart",
            targets: '.vibration-animation-quote .word',
            translateY: ['0%', '-100%'],
        })
        .add({
            delay: (el, i) => 8000 + 50 * i,
            easing: "easeOutQuart",
            targets: '.vibration-animation-quote .word',
            translateY: ['100%', '0%'],
        });
        this.destroy();
    },
    offset: '10%',
});

var waypoint = new Waypoint({
    element: document.getElementById('colour'),
    handler: function() {
        anime({
            delay: (el, i) => 100 * i,
            easing: "easeInOutQuart",
            targets: '.colour-palette-swatch',
            top: ['-100%', '100%'],
        });
        this.destroy();
    },
    offset: '10%',
});

var waypoint = new Waypoint({
    element: document.getElementById('typography-secondary'),
    handler: function handler(direction) {
        return direction == 'down' ? anime({
            delay: (el, i) => 30 * i,
            easing: "easeOutQuart",
            targets: '.typography-secondary .letter',
            translateY: function() {
                return anime.random(-120, -10)  + '%';
            },
            rotate: function() {
                return anime.random(-45, 45);
            },
            scaleX: [1, 0.75],
        }) : anime({
            delay: 0,
            easing: "easeOutQuart",
            targets: '.typography-secondary .letter',
            translateY: '0%',
            rotate: 0,
            scaleX: 1,
        });
    },
    offset: '66%',
});

var waypoint = new Waypoint({
    element: document.getElementById('main-footer'),
    handler: function() {
        outroVideo.play(),
        anime({
            delay: (el, i) => 100 * i,
            easing: "easeInQuart",
            targets: '.main-footer-heading .word',
            translateY: ['0%', '-100%'],
        }),
        this.destroy();
    },
    offset: '10%',
});

voiceButton.addEventListener("click", function(){
    if(voiceVideo.paused){
        voiceVideo.play();
        voiceButton.classList.add('pause');
    } else {
        voiceVideo.pause();
        voiceButton.classList.remove('pause');
    }
});

outroButton.addEventListener("click", function(){
    if(outroVideo.paused){
        outroVideo.play();
        outroButton.classList.add('pause');
    } else {
        outroVideo.pause();
        outroButton.classList.remove('pause');
    }
});
