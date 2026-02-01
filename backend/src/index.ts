import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
const MAX_SIZE = 2 * 1024 * 1024;
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    const re = /(?:\.([^.]+))?$/;
    const ext = re.exec(file.originalname)?.[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix+ "." + ext);
  },
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());

app.post(
  "/api/upload",
  upload.single("data"),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = {
        link: req.file?.filename,
        id: req.body.id,
        status: "uploaded",
      };
      res.json(response);
    } catch (error) {
      const response = {
        link: req.file?.filename,
        id: req.body.id,
        status: "failed",
      };
      res.json(response);
    }
  }
);

app.get('/api/download/:id', (req: Request, res: Response) => {
  const {id} = req.params
  res.download(path.join(__dirname, "../uploads", id as string))
})

app.use("/api/uploads", express.static(path.join(__dirname, "../uploads")));

app.listen(PORT, () => {
  console.log(`App runs in http://localhost:${PORT}`);
});
