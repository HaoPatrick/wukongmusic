import {
  Howl
} from 'howler'
import {
  sendEnd
} from '../api'

export function getHowl(song) {
  const songUrls = song.musics.map(item => item.file)
  const sound = new Howl({
    src: songUrls,
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
