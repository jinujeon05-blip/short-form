# 등불 마을 이야기: character art prompts (Google Flow)

The game picks these files up automatically. Save each image in this folder
(`rpg-demo/art/`) with the exact file name below. A missing file keeps the
built-in pixel art, so you can add them one at a time.

## Why the first batch came out as photos

Flow leans toward photorealism unless the prompt says otherwise, so every
prompt below starts and ends with explicit style words and "not a photo".
Keep both parts when you paste.

## Standing illustrations (스탠딩 일러스트)

These appear large on the left of the dialogue box, the way Korean and
Japanese RPGs show characters while they talk.

Aspect ratio **3:4 (portrait)**. Ask for a **plain white background** so the
figure can be cut out cleanly; the background is removed when the images are
added to the game.

Start every prompt with:

> 2D anime-style mobile RPG character standing illustration, Korean game art
> (서브컬처 / 애니메이션풍), clean cel shading, crisp lineart, vibrant colors,
> full upper body from knees up, facing slightly to the right, plain pure
> white background, no text, no logo.

End every prompt with:

> Illustration, not a photo, not photorealistic, not 3D render.

| File | Character (middle of the prompt) |
| --- | --- |
| `standing-elder.png` | 오렌, the gentle elderly village chief: long white hair, long neat white beard, kind eyes, green robe with gold embroidery, wooden staff with a small lantern hanging from the top, calm smile. |
| `standing-merchant.png` | 미라, a cheerful young potion merchant in her twenties: dark hair in a high bun with a hairpin, purple blouse, orange apron with pockets of small bottles, holding up a glowing red healing potion, bright smile, one hand waving. |
| `standing-kid.png` | 토비, an energetic village child about eight years old: messy golden blond hair, pink tunic with patched knees, small wooden toy sword, big excited eyes, a bandage on one cheek. |

## Title key art

| File | Aspect | Prompt |
| --- | --- | --- |
| `title.png` | 16:9 | 2D anime-style fantasy RPG key art, painted background in the style of a Korean mobile game title screen: a small cozy village at dusk, a tall iron great lantern glowing gold in a cobblestone plaza, timber houses with warm windows and chimney smoke, dark forest beyond, a faint purple glow from a distant cave, a young swordsman with brown hair, blue tunic and red cape seen from behind looking toward the cave. Keep the center sky calm for the game title. Illustration, not a photo, not photorealistic, no text. |

## Tips

- Generate 2 to 4 variations per character and keep the one whose face reads
  best at small size.
- For a matching set, generate the elder first, then attach it in Flow as a
  style reference when making the others.
- PNG preferred. If Flow exports JPG, that is fine; it gets converted when the
  images are added.
