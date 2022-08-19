export async function GET() {
  return new Response(undefined, {
    status: 302,
    headers: {
      location: '/docs/index.html',
    },
  });
}
