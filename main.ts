controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Torch = 1
    info.startCountdown(1)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    Direction = 0
})
info.onCountdownEnd(function () {
    Torch = 0
})
scene.onOverlapTile(SpriteKind.Player, sprites.dungeon.chestClosed, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`myTile`)
    info.changeScoreBy(1)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    Direction = 1
})
function GhostSetup () {
    for (let value of tiles.getTilesByType(sprites.dungeon.collectibleRedCrystal)) {
        Ghost = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        Ghost.setFlag(SpriteFlag.GhostThroughWalls, true)
        tiles.placeOnTile(Ghost, value)
        tiles.setTileAt(value, assets.tile`transparency16`)
        Ghost.follow(Hero, randint(20, 40))
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    if (Torch == 1) {
        otherSprite.destroy()
    } else {
        game.over(false)
    }
})
let Ghost: Sprite = null
let Torch = 0
let Direction = 0
let Hero: Sprite = null
game.showLongText("Find all 8 Treasure Chests before the Ghosts captures you!", DialogLayout.Top)
tiles.setTilemap(tilemap`level1`)
Hero = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . f f e 2 f f f f f f 2 e f f . 
    . f f f f f e e e e f f f f f . 
    . . f e f b f 4 4 f b f e f . . 
    . . f e 4 1 f d d f 1 4 e f . . 
    . . . f e 4 d d d d 4 e f e . . 
    . . f e f 2 2 2 2 e d d 4 e . . 
    . . e 4 f 2 2 2 2 e d d e . . . 
    . . . . f 4 4 5 5 f e e . . . . 
    . . . . f f f f f f f . . . . . 
    . . . . f f f . . . . . . . . . 
    `, SpriteKind.Player)
Hero.setFlag(SpriteFlag.ShowPhysics, true)
tiles.placeOnTile(Hero, tiles.getTileLocation(2, 2))
scene.cameraFollowSprite(Hero)
Direction = 1
Torch = 0
GhostSetup()
game.onUpdate(function () {
    if (Torch == 1) {
        if (Direction == 1) {
            Hero.setImage(img`
                ................................
                ......ffffff....................
                ....ffeeeef2f...................
                ...ffeeeef222f..................
                ...feeeffeeeef.............55...
                ...ffffee2222ef..........5555...
                ...fe222ffffe2f........555555...
                ..fffffffeeefff.....555554455...
                ..ffe44ebf44eef...55555444455...
                ..fee4d41fddef..5555444444455...
                ...feeeeedddf.555444444444455...
                .....f4dde4ef...5555444444455...
                .....fedde22f......5555444455...
                ....fffeef55ff........5554455...
                ....ffffffffff..........55555...
                .....ff...fff..............55...
                `)
        } else {
            Hero.setImage(img`
                ................................
                ....................ffffff......
                ...................f2feeeeff....
                ..................f222feeeeff...
                ...55.............feeeeffeeef...
                ...5555..........fe2222eeffff...
                ...555555........f2effff222ef...
                ...554455555.....fffeeefffffff..
                ...55444455555...fee44fbe44eff..
                ...5544444445555..feddf14d4eef..
                ...554444444444555.fdddeeeeef...
                ...5544444445555...fe4edd4f.....
                ...5544445555......f22eddef.....
                ...5544555........ff55feefff....
                ...55555..........ffffffffff....
                ...55..............fff...ff.....
                `)
        }
    } else {
        if (Direction == 1) {
            Hero.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . f f f f f f . . . . 
                . . . . f f e e e e f 2 f . . . 
                . . . f f e e e e f 2 2 2 f . . 
                . . . f e e e f f e e e e f . . 
                . . . f f f f e e 2 2 2 2 e f . 
                . . . f e 2 2 2 f f f f e 2 f . 
                . . f f f f f f f e e e f f f . 
                . . f f e 4 4 e b f 4 4 e e f . 
                . . f e e 4 d 4 1 f d d e f . . 
                . . . f e e e e e d d d f . . . 
                . . . . . f 4 d d e 4 e f . . . 
                . . . . . f e d d e 2 2 f . . . 
                . . . . f f f e e f 5 5 f f . . 
                . . . . f f f f f f f f f f . . 
                . . . . . f f . . . f f f . . . 
                `)
        } else {
            Hero.setImage(img`
                . . . . . . . . . . . . . . . . 
                . . . . f f f f f f . . . . . . 
                . . . f 2 f e e e e f f . . . . 
                . . f 2 2 2 f e e e e f f . . . 
                . . f e e e e f f e e e f . . . 
                . f e 2 2 2 2 e e f f f f . . . 
                . f 2 e f f f f 2 2 2 e f . . . 
                . f f f e e e f f f f f f f . . 
                . f e e 4 4 f b e 4 4 e f f . . 
                . . f e d d f 1 4 d 4 e e f . . 
                . . . f d d d e e e e e f . . . 
                . . . f e 4 e d d 4 f . . . . . 
                . . . f 2 2 e d d e f . . . . . 
                . . f f 5 5 f e e f f f . . . . 
                . . f f f f f f f f f f . . . . 
                . . . f f f . . . f f . . . . . 
                `)
        }
    }
})
game.onUpdate(function () {
    if (Hero.tileKindAt(TileDirection.Center, sprites.dungeon.stairNorth) || Hero.tileKindAt(TileDirection.Bottom, sprites.dungeon.stairNorth)) {
        Hero.ay = 0
        Hero.vy = 0
        controller.moveSprite(Hero, 100, 100)
    } else {
        Hero.ay = 300
        controller.moveSprite(Hero, 100, 0)
    }
})
