const express = require('express')
const bodyparser = require('body-parser')
const leaderRouter = express.Router()
leaderRouter.use(bodyparser.json())

leaderRouter.route('/')
.all((req,res,next)=>
{
     res.statusCode=200
     res.setHeader('content-Type','text/plain')
     next()
})

.get((req,res)=>
    {
        res.end('we will send u leader details soon')
    })

.post((req,res)=>
        {
            res.end('we will insert leader details soon for '+req.body.name)
        });

 leaderRouter.route('/:id')
        .all((req,res,next)=>
        {
             res.statusCode=200
             res.setHeader('content-Type','text/plain')
             next()
        })
        
        .get((req,res)=>
            {
                res.end('we will send u leader details soon for'+req.params.id)
            })
        
        .put((req,res)=>
                {
                    res.write('we will update leader'+ req.params.id)
                    res.end('we will insert leader details soon for '+req.body.name)
                });

module.exports = leaderRouter