# 📸 Images Folder — Divya's Apology Website

Replace the placeholder Unsplash URLs in `index.html` with your actual photos by
saving them in this folder with these exact filenames.

## Required Images

| Filename              | Used In            | Suggested Content                            |
|-----------------------|--------------------|----------------------------------------------|
| `hero-bg.jpg`         | Hero background    | Romantic/dreamy dark background              |
| `crime-1.jpg`         | Crime #1 card      | Funny sorry/puppy face                       |
| `crime-2.jpg`         | Crime #2 card      | Phone/distraction image                      |
| `crime-3.jpg`         | Crime #3 card      | Arguing/thinking face                        |
| `crime-4.jpg`         | Crime #4 card      | Turtle or slow-walking meme                  |
| `crime-5.jpg`         | Crime #5 card      | Dramatic / extra moment                      |
| `crime-6.jpg`         | Crime #6 card      | Roses or sad/apologetic image                |
| `polaroid-1.jpg`      | Gallery photo 1    | Her smile / something that reminds you of her|
| `polaroid-2.jpg`      | Gallery photo 2    | A sunset you both love                       |
| `polaroid-3.jpg`      | Gallery photo 3    | Flowers she likes                            |
| `polaroid-4.jpg`      | Gallery photo 4    | Sparkly lights / something magical           |
| `polaroid-5.jpg`      | Gallery photo 5    | Pink sky / soft colours                      |
| `polaroid-6.jpg`      | Gallery photo 6    | Night sky / stars                            |
| `puppy-sad.jpg`       | Anger section      | Sad/sorry puppy (or your most sorry face 😬) |
| `couple.jpg`          | Final section      | A photo of you two together 💕               |

## How to Replace in index.html

Find this pattern in `index.html`:
```html
<img src="images/crime-1.jpg" data-fallback="https://images.unsplash.com/..." />
```

Just save your photo as `images/crime-1.jpg` and it will appear automatically.

## Tips
- Crop images to **roughly 400×250px** for crime cards
- Crop **155×155px square** for polaroid photos
- Use JPEG for photos (smaller file size)
- Recommended: use a free tool like **squoosh.app** to compress before uploading

## Fallback
If any image file is missing, the website will automatically load a beautiful
placeholder from Unsplash so nothing breaks. Your site always looks good! ✨
