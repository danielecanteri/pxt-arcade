namespace image {
    export let allSprites: Sprite[]
    let lastTime: number

    export function updateSprites() {
        let now = control.millis()
        let dt = now - lastTime
        lastTime = now
        dt /= 1000
        for (let s of allSprites) {
            s._update(dt)
        }
    }

    export function createSprite(img: Buffer) {
        let s = new Sprite(img)
        if (!allSprites) {
            allSprites = []
            lastTime = control.millis()
        }
        allSprites.push(s)
        return s
    }
}

class Sprite {
    x: number
    y: number
    vx: number
    vy: number
    ax: number
    ay: number
    image: Image

    constructor(img: Buffer) {
        this.x = screen.width() / 2
        this.y = screen.height() / 2
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = 0
        this.image = image.ofBuffer(img)
    }

    width() {
        return this.image.width()
    }
    height() {
        return this.image.height()
    }

    _update(dt: number) {
        this.x += this.vx * dt
        this.y += this.vy * dt
        this.vx += this.ax * dt
        this.vy += this.ay * dt
        screen.drawImage(this.image, this.x - this.width() / 2, this.y - this.height() / 2)
    }
}