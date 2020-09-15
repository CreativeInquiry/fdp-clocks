# fdp-clocks

Prof. [Golan](http://flong.com/)'s [class](https://courses.ideate.cmu.edu/60-212/f2020/)'s [clocks](https://courses.ideate.cmu.edu/60-212/f2020/category/03/03-clock/) for the [Forbes Digital Plaza](https://rutheh.com/2019/05/03/forbes-digital-plaza-at-bouquet-street).

## sketches/

Put sketches in `Contents/Resources/app/sketches/`. Each sketch should be in its own folder, with an `index.html`.

## settings.json

`Contents/Resources/app/settings.json`

| JSON key | default value | explanation |
|---|---|---|
| SHOW_LABEL | `false` | show author name at beginning of each clock |
| FADE_SPEED | `32` |  speed of fade to/from black, bigger value = slower |
| TIMEOUT | `1000 /*millis per sec*/ * 60 /*secs per min*/ * 3 /*mins*/` | number of milliseconds to show each clock |
| FRAME_X | `0` | x coordinate of the iframe relative to window |
| FRAME_Y | `0` | y ditto |
| FRAME_W | `800` | width ditto |
| FRAME_H | `600` | height ditto |
| BG_COLOR | `[0,0,0]` | background color (RGB) |
| FRAME_STYLE | `""` | custom CSS style (overriding) for iframe |
| BODY_STYLE | `""` | custom CSS style (overriding) for main app body |


## Compiling the app from source

1. Download `nodejs` `npm`