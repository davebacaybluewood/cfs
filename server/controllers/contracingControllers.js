import expressAsync from "express-async-handler";

/**
 * @desc: Request a contracts
 * @route: POST /api/contracting
 * @access: Private
 */

const requestContractController = expressAsync((req, res, send) => {
    res.send("[Request Contract] has been successfully submitted.")
})

export {
    requestContractController
}