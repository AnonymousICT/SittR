const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");

const {
    PORT,
    HTTP_STATUS_CODES,
    MONGO_URL,
    TEST_MONGO_URL
} = require("./config");
const { authRouter } = require("./auth/auth.router");
const { userRouter } = require("./user/user.router");
const { petRouter } = require("./pet/pet.router");
const { vetRouter } = require("./vet/vet.router");
const { visitRouter } = require("./visit/visit.router");
const { reportRouter } = require("./report/report.router");
const { petMedicalRouter } = require("./petMedical/petMedical.router");
const { localStrategy, jwtStrategy } = require("./auth/auth.strategy");

let server;
const app = express();
passport.use(localStrategy);
passport.use(jwtStrategy);

//MiddleWare
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static("./public"));

//routers
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/pet", petRouter);
app.use("/api/vet", vetRouter);
app.use("/api/visit", visitRouter);
app.use("/api/report", reportRouter);
app.use("/api/petMedical", petMedicalRouter);

app.use("*", function(req, res) {
    res.status(HTTP_STATUS_CODES.NOT_FOUND).json({ error: "Not Found." });
});

module.exports = {
    app,
    startServer,
    stopServer
};

function startServer(testEnv) {
    return new Promise((resolve, reject) => {
        let mongoUrl;

        if (testEnv) {
            mongoUrl = TEST_MONGO_URL;
        } else {
            mongoUrl = MONGO_URL;
        }
        mongoose.connect(
            mongoUrl,
            { useNewUrlParser: true },
            err => {
                if (err) {
                    console.error(err);
                    return reject(err);
                } else {
                    server = app
                        .listen(PORT, () => {
                            console.log(
                                `Express server listening on http://localhost:${PORT}`
                            );
                            resolve();
                        })
                        .on("error", err => {
                            mongoose.disconnect();
                            console.error(err);
                            reject(err);
                        });
                }
            }
        );
    });
}

function stopServer() {
    return mongoose.disconnect().then(
        () =>
            new Promise((resolve, reject) => {
                server.close(err => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    } else {
                        console.log("Express server stopped.");
                        resolve();
                    }
                });
            })
    );
}
