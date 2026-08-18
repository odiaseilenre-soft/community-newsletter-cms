import multer from "multer";

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."));
  }
};

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

export default upload;

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, uploadPath);
//   },

//   filename(req, file, cb) {
//     const uniqueName =
//       Date.now() +
//       "-" +
//       Math.round(Math.random() * 1e9) +
//       path.extname(file.originalname);

//     cb(null, uniqueName);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.startsWith("image/")
//   ) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Only image files are allowed."
//       )
//     );
//   }
// };

// const upload = multer({
//   storage,
//   fileFilter,
// });

// export default upload;