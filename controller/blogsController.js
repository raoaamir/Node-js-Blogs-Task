const blogs = require('../models/blog')

const blog_index =(req ,res)=>{
    blogs.find().sort({createdAt : -1})
    .then((result)=>{
        res.render('blogs/index', { title: 'All Blogs' , blogs : result})
    })

    .catch((err)=>{
        console.log(err)
    })
}

const blog_detail =(req ,res)=>{
    const id = req.params.id
    blogs.findById(id)
    .then((result)=>{
        res.render('blogs/detail' , {blog : result , title : 'Blogs Detail'} )
    })
    .catch((err)=>{
        res.status(404).render('404', {title : 'Blogs Not Found'})
    })
} 

const blog_create_get = (req ,res)=>{
res.render('blogs/create',{title: 'Create New Blog'});
}

const blog_create_post = (req ,res)=>{
    const blog = new blogs(req.body)

    blog.save()
    .then((result)=>{
        res.redirect('/blogs')
    })
    .catch((err)=>{
        console.log(err)
    })
}

const blog_delete = (req ,res)=>{
    const id = req.params.id
    blogs.findByIdAndDelete(id)
    .then(result =>{
        res.json({redirect : '/blogs'})
    })
}
module.exports = {
    blog_index,
    blog_detail,
    blog_create_get,
    blog_create_post,
    blog_delete
}