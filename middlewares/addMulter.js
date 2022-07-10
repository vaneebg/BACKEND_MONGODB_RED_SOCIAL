const Multer = require('multer');
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif', 'image/webp'];
const generateUploadImageMulter = path => Multer({
    storage: Multer.diskStorage({
        destination: (req, file, cb) => cb(null, path),
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    }),
    fileFilter: (req, file, cb) => {
        if (mimetypes.includes(file.mimetype)) cb(null, true)
        else cb(null, false)
    },
    limits: { fileSize: 5 * 1024 * 1024 }
});
const uploadUserAvatar = generateUploadImageMulter('./public/images/users');
const uploadPostImages = generateUploadImageMulter('./public/images/posts');
const uploadCommentImages = generateUploadImageMulter('./public/images/comments');



module.exports = { uploadUserAvatar, uploadCommentImages, uploadPostImages };