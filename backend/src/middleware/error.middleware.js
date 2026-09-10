export const errorHandler = (error, req, res, next) => {
    console.error(error);

    if (error.code === "23503") {
        return res.status(400).json({
            status: "error",
            message: "Referenced resource does not exist"
        });
    }

    if (error.code === "23505") {
        return res.status(409).json({
            status: "error",
            message: "Resource already exists"
        });
    }

    res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
};