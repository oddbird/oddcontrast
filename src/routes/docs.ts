export async function GET() {
  return {
    status: 302,
    headers: {
      location: '/docs/index.html',
    },
  };
}
