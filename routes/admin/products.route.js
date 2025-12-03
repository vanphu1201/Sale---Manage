const express = require("express");
const route = express.Router();
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const multer  = require('multer');
const upload = multer();

// Cloudinary
cloudinary.config({ 
  cloud_name: 'dbhfynfvh', 
  api_key: '824913551957631', 
  api_secret: '_drih_esMy2RqlFkMYQXM5IHYMw'
});
// End Cloudinary

const controller = require("../../controllers/admin/products.controller");


route.get("/products", controller.index);

route.get("/products/changeStatus/:changeStatus/:id", controller.changeStatus);

route.get("/products/delete/:id", controller.delete);

route.get("/products/create", controller.create);

route.post(
    "/products/create",
    upload.single('thumbnail'),
    function (req, res, next) {
        if (req.file) {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            async function upload(req) {
                let result = await streamUpload(req);
                req.body[req.file.fieldname] = result.secure_url;
                next();
            }

            upload(req);
        } else {
            next();
        }
        
    },
    controller.createPost
);

route.get("/products/edit/:id", controller.edit);

route.post(
    "/products/edit/:id",
    upload.single('thumbnail'),
    function (req, res, next) {
        if (req.file) {
            let streamUpload = (req) => {
                return new Promise((resolve, reject) => {
                    let stream = cloudinary.uploader.upload_stream(
                        (error, result) => {
                            if (result) {
                                resolve(result);
                            } else {
                                reject(error);
                            }
                        }
                    );

                    streamifier.createReadStream(req.file.buffer).pipe(stream);
                });
            };

            async function upload(req) {
                let result = await streamUpload(req);
                req.body[req.file.fieldname] = result.secure_url;
                next();
            }

            upload(req);
        } else {
            next();
        }
    },
    controller.editPost
);

route.get("/products/detail/:id", controller.detail);

route.post("/products/changeMultiStatus/:change/:ids", controller.changeMulti);




module.exports = route;