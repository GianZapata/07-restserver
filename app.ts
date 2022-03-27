import express from 'express'

const app = express()
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
   res.send('Hello World12dwda3! types11232132123')
})

app.listen(port, () => {
   console.log('Example app listening on port 3000!3')
})