import { Router } from 'itty-router';

const router = Router()
const cloudflare_image_url = 'https://api.cloudflare.com/client/v4/accounts/493524dadc6a7fdef16df9d2ad442576/images/v1'

const apiToken = "YUz82BUGJTjFyXOGY22HxtX9atNwJdo2IasOs9XF"

// POST to the collection (we'll use async here)
router.post('/image', async request => {

  // Prepare the Cloudflare Images API request body
  const formData = await request.formData();
  formData.set("requireSignedURLs", "true");
  const alt = formData.get("alt");
  formData.delete("alt");
  const isPrivate = formData.get("isPrivate") === "on";
  formData.delete("isPrivate");

  // Upload the image to Cloudflare Images
  const response = await fetch(
    cloudflare_image_url,
    {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
  const result = await response.json();
  console.log("upload image result:", result)

  return new Response(result);
})

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

addEventListener('fetch', event => {
  event.respondWith(router.handle(event.request))
})

