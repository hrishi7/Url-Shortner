const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const validUrl = require('valid-url');
const config = require('config');

const Url = require('../models/Url');

// @route GET /:code
// @desc redirecting shortUrl to original url
// @access Public
router.get('/:code',async (req, res)=>{
    try {
        const url = await Url.findOne({urlCode: req.params.code})
        if(url){
            return res.redirect(url.longUrl);
        }else{
            return res.status(404).json({message:'Url not found', variant:'error'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'server error', variant:'error'});
    }
})


module.exports = router;