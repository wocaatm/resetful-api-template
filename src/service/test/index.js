export async function testApi (req, res) {
  return {
    success: true,
    page: 'this is home api'
  }
}

export default {
  testApi
}