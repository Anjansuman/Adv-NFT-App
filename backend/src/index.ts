import express from "express";

const app = express();
app.use(express.json());

app.post("/create-token", (req, res) => {
    try {
        
        

    } catch (error) {
        res.status(500).json({
            message: "Internal server error!"
        })
    }
})