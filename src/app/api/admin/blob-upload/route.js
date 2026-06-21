// POST /api/admin/blob-upload
// Issues short-lived client-upload tokens so the browser can upload images/PDFs
// DIRECTLY to Vercel Blob (no 4.5MB function-body limit, no git bloat).
// Authenticated: the client sends the admin password as clientPayload.
import { handleUpload } from '@vercel/blob/client'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch (e) {
    return Response.json({ error: 'Invalid request' }, { status: 400 })
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // clientPayload carries the admin password typed at login
        const expected = process.env.ADMIN_PASSWORD
        if (!expected) throw new Error('Server not configured (ADMIN_PASSWORD missing)')
        if (!clientPayload || clientPayload !== expected) throw new Error('Not authorised')
        return {
          allowedContentTypes: [
            'image/jpeg', 'image/png', 'image/webp', 'image/gif',
            'application/pdf',
          ],
          addRandomSuffix: true,
          maximumSizeInBytes: 25 * 1024 * 1024, // 25MB ceiling (plenty for catalogs)
        }
      },
      onUploadCompleted: async () => {
        // Not needed for our flow. (Also note: this callback does not fire on
        // localhost because Vercel Blob can't reach your machine — that's fine,
        // the browser still receives the final URL directly.)
      },
    })
    return Response.json(jsonResponse)
  } catch (error) {
    return Response.json({ error: error.message || 'Upload failed' }, { status: 400 })
  }
}
