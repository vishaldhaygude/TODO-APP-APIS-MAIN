import express from "express";
import cors from 'cors';

const app =express();
app.use(express.json());
app.use(cors());

const tasks = []; //use as a temp database

app.get('/health', (req, res)=>{
    res.json({
        success:true,
        message: 'Server is healthy'
    })
})

app.post('/create-task', (req, res)=>{
    const {id, title, priority}=req.body;

    if(!id){
        return res.json({
            success: false,
            message: 'Id is required'
        })
    }

    if(!title){
        return res.json({
            success: false,
            message: 'Title is required'
        })
    }

    if(!priority){
        return res.json({
            success: false,
            message: 'Priority is required'
        })
    }

    const newTask={ id,title,priority};

    tasks.push(newTask);

    res.json({
        success:true,
        message: 'Task created successfully',
        data: newTask
    })
})

app.get('/all-tasks', (req, res)=>{
    res.json({
        success:true,
        message: 'All tasks fetched successfully',
        data: tasks
    })
})


const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});