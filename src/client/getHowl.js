import {
  Howl
} from 'howler'
import {
  sendEnd
} from '../api'

export function getHowl(song) {
  const sound = new Howl({
    src: song.resource.music,
    loop: false,
    html5: true,
    autoplay: false,
    preload: true,
    onend: async () => {
      const response = await sendEnd(song)
      console.log('play ended', response)
    }
  })
  return sound
}
