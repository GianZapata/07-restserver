import express from 'express'

const app = express()

app.get('/', (req, res) => {
   res.send('Hello World12dwda3! types11232132123')
})

app.listen(3000, () => {
   console.log('Example app listening on port 3000!3')
})