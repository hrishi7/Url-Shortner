const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const validUrl = require('valid-url');
const config = require('config');

const Url = require('../models/Url');

// @route POST /api/url/shortner
// @desc shorting the long url
// @access Public
router.post('/shortner', async (req, res)=>{
    const {longUrl} = req.body;
    console.log(longUrl);
    const baseUrl = config.get('baseUrl');
    if(!validUrl.isUri(baseUrl)){
        res.status(401).json({message:'Base Url invalid!', variant:'error'});
    }else{
        //shorturl code generate
        const urlCode = shortid.generate();

        //check if given long url is valid one
        if(!validUrl.isUri(longUrl)){
            res.status(401).json({message:'Given Url invalid!', variant:'error'});
        }
        else{
            try {
                let url = await Url.findOne({longUrl});
                if(url){
                    res.json(url)
                }else{
                    const shortUrl = baseUrl + "/" + urlCode;

                    url = new Url({
                        urlCode,
                        longUrl,
                        shortUrl,
                        date: new Date()
                    })
                    await url.save();
                    res.json(shortUrl);
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({message:'server error', variant:'error'})
            }
            
        }
        
    }
})



module.exports = router;