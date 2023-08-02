export default async function handler(req, res) {
  const { query } = req.body
  res.status(200).send(query)
}
