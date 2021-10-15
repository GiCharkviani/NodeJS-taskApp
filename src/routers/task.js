const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  // const task = new Task(req.body);
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

// GET /tasks?completed=false
// GET /tasks?limit=10&skip=10
// GET /tasks?sortBy=createdAt:desc
router.get("/tasks", auth, async (req, res) => {
  try {
    // const tasks = await Task.find({ owner: req.user._id }); //იგივეა რაც ქვევით

    const match = {};
    const sort = {};

    if(req.query.completed){
      match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
      const parts = req.query.sortBy.split(':');
      sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort
      }
    })

    res.send(req.user.tasks);
    // res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    // const task = await Task.findById(_id);
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const gotProperties = Object.keys(req.body);
  const allowedProperties = ["description", "completed"];
  const allowed = gotProperties.every((prop) =>
    allowedProperties.includes(prop)
  );

  if (!allowed) {
    return res.status(400).send({ error: "Invalid update in tasks" });
  }
  try {

    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    // const task = await Task.findById(req.params.id);

    // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    // gotProperties.forEach((update)=> task[update] = req.body[update])
    // await task.save()

    if (!task) {
      return res.status(404).send("Task not found");
    }

    gotProperties.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id",auth, async (req, res) => {
  try {
    // const user = await Task.findByIdAndDelete(req.params.id);
    const user = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
    if (!user) {
      return res.status(404).send("Task not found to delete");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
