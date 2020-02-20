import anime from 'animejs'
import 'waypoints/lib/noframework.waypoints.min'

function app() {
  const introVideo = document.getElementById('intro-video')
  const voiceButton = document.getElementById('voice-button')
  const voiceVideo = document.getElementById('voice-video')

  // These don't appear to be present from the initial setup.
  // const outroButton = document.getElementById('outro-button')
  // const outroVideo = document.getElementById('outro-video')

  const text = document.querySelectorAll('.reveal')

  text.forEach(paragraph => {
    paragraph.innerHTML = `<div class='crop'><span class='word'>${paragraph.textContent.replace(/\s+/g, "</span></div>$&<div class='crop'><span class='word'>")}</span></div>`
  })

  const letters = document.querySelectorAll('.break')

  letters.forEach(letter => {
    letter.innerHTML = letter.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
  })

  anime
    .timeline({
      loop: false,
    })
    .add({
      delay: (el, i) => 150 * i,
      easing: 'easeOutQuart',
      targets: '.intro-animation .word',
      translateY: ['100%', '0%'],
    })
    .add({
      delay: (el, i) => 150 * i,
      easing: 'easeInQuart',
      targets: '.intro-animation .word',
      translateY: ['0%', '-100%'],
    })
    .add({
      delay: 0,
      easing: 'easeOutQuart',
      targets: '.intro-animation .logo',
      translateY: ['100%', '0%'],
    })

  const waypointVibration = new window.Waypoint({
    element: document.getElementById('vibration-animation'),
    handler() {
      introVideo.play()
      anime
        .timeline({
          loop: false,
        })
        .add({
          delay: (el, i) => 50 * i,
          easing: 'easeInQuart',
          targets: '.vibration-animation-quote .word',
          translateY: ['0%', '-100%'],
        })
        .add({
          delay: (el, i) => 8000 + 50 * i,
          easing: 'easeOutQuart',
          targets: '.vibration-animation-quote .word',
          translateY: ['100%', '0%'],
        })
      this.destroy()
    },
    offset: '10%',
  })

  const waypointColour = new window.Waypoint({
    element: document.getElementById('colour'),
    handler() {
      anime({
        delay: (el, i) => 100 * i,
        easing: 'easeInOutQuart',
        targets: '.colour-palette-swatch',
        top: ['-100%', '100%'],
      })
      this.destroy()
    },
    offset: '10%',
  })

  const waypointTypographySecondary = new window.Waypoint({
    element: document.getElementById('typography-secondary'),
    handler: function handler(direction) {
      return direction === 'down'
        ? anime({
            delay: (el, i) => 30 * i,
            easing: 'easeOutQuart',
            targets: '.typography-secondary .letter',
            translateY() {
              return `${anime.random(-120, -10)}%`
            },
            rotate() {
              return anime.random(-45, 45)
            },
            scaleX: [1, 0.75],
          })
        : anime({
            delay: 0,
            easing: 'easeOutQuart',
            targets: '.typography-secondary .letter',
            translateY: '0%',
            rotate: 0,
            scaleX: 1,
          })
    },
    offset: '66%',
  })

  const waypointMainFooter = new window.Waypoint({
    element: document.getElementById('main-footer'),
    handler() {
      // Doesn't appear to be present in the initial setup.
      // outroVideo.play()
      anime({
        delay: (el, i) => 100 * i,
        easing: 'easeInQuart',
        targets: '.main-footer-heading .word',
        translateY: ['0%', '-100%'],
      })
      this.destroy()
    },
    offset: '10%',
  })

  console.log(waypointVibration, waypointColour, waypointTypographySecondary, waypointMainFooter)

  voiceButton.addEventListener('click', () => {
    if (voiceVideo.paused) {
      voiceVideo.play()
      voiceButton.classList.add('pause')
    } else {
      voiceVideo.pause()
      voiceButton.classList.remove('pause')
    }
  })

  // outroButton.addEventListener('click', () => {
  //   if (outroVideo.paused) {
  //     outroVideo.play()
  //     outroButton.classList.add('pause')
  //   } else {
  //     outroVideo.pause()
  //     outroButton.classList.remove('pause')
  //   }
  // })
}

app()
