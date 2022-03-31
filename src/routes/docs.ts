export async function get() {
  return {
    status: 302,
    headers: {
      location: '/docs/index.html',
    },
  };
}
