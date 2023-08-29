/**
 * Author: Kien Quoc Mai
 * Created date: 02/08/2023
 * Last modified Date: 29/08/2023
 */

export default async function handler(req, res) {
  const { query } = req.body
  res.status(200).send(query)
}
