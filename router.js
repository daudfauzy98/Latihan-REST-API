import express from 'express'
import Homework from './database.js'

const router = express.Router()

router.post('/homeworks', async (req, res) => {
    try {
        const {
            course,
            title,
            due_date,
            status,
        } = req.body

        const homework = new Homework({
            course,
            title,
            due_date,
            status,
        })

        const createdHomework = await homework.save()
        res.status(201).json(createdHomework)
    } catch (error) {
        //res.status(500).json({ error: 'Database creation failed' })
        console.log(error)
    }
})

router.get('/homeworks', async (req, res) => {
    const homeworks = await Homework.find({})

    if(homeworks && homeworks.length !== 0) {
        res.json(homeworks)
    } else {
        res.status(404).json({ message: 'Homework not found!' })
    }
})

router.get('/homeworks/:id', async (req, res) => {
    const homework = await Homework.findById(req.params.id)

    if(homework) {
        res.json(homework)
    } else {
        res.status(404).json({ message: 'Homework not found!' })
    }
})

router.put('/homeworks/:id', async (req, res) => {
    const { course, title, due_date, status } = req.body
    
    const homework = await Homework.findById(req.params.id)

    if(homework) {
        homework.course = course
        homework.title = title
        homework.due_date = due_date
        homework.status = status

        const updateHomework = await homework.save()

        res.json(updateHomework)
    } else {
        res.status(404).json({ message: 'homework not found!' })
    }
})

//@desc Delete a homework
//@route DELETE /api/homeworks/:id
router.delete('/homeworks/:id', async (req, res) => {
    const homework = await Homework.findById(req.params.id)

    if(homework) {
        await homework.remove()
        res.json({ message: 'Data removed' })
    } else {
        res.status(404).json({ message: 'Homework not found!' })
    }
})

//@desc Delete all homework
//@route DELETE /api/homeworks/
/*router.delete('/homeworks/', async (req, res) => {
    const homeworks = await Homework.deleteMany({})

    if(homeworks) {
        res.json({ message: 'All data removed' })
    } else {
        res.status(404).json({ message: 'Homework is empty!' })
    }
})*/

router.delete('/homeworks/', async (req, res) => {
    const homeworks = await Homework.find({})

    if(homeworks.length !== 0) {
        const hapus = await Homework.deleteMany({})
        res.json({ message: 'All data removed' })
    } else {
        res.status(404).json({ message: 'Homework is empty!' })
    }
})

export default router