const fs = require('fs');

const validateProposalId = (proposal) => {

    proposal = String(proposal);

    console.log("separates the check code");
    const code = proposal.substring(proposal.length - 2);
    console.log("code", code);

    console.log("separate the other digits");
    const arrNumbers = proposal.split("", 8);
    var sumEven = 0;
    var sumOdd = 0;

    console.log("Add the even and odd values");
    arrNumbers.forEach(element => {
        if (element % 2 === 0) {
            sumEven += element;
        } else {
            sumOdd += element;
        }
    });

    console.log("even", sumEven, "odd", sumOdd);

    var verifyCode = 0;
    if (sumEven > sumOdd) {
        verifyCode = (sumEven - sumOdd) / 2;
    } else {
        verifyCode = (sumOdd - sumEven) / 2;
    }

    verifyCode = Math.round(verifyCode);

    console.log("verifyCode", verifyCode);
    return code === verifyCode;
};

const saveFileProposals = (path, proposals) => {

    let countValid = 0;
    let countInvalid = 0;

    proposals.forEach(element => {
        let verifyCode = "00" + element.produto.nrVersaoOferta
        let proposal = element.propostaId + verifyCode.substring(verifyCode.length - 2);
        if (validateProposalId(proposal)) {
            console.log("proposal:", proposal, "Valid");
            countValid++;
        } else {
            console.log("proposal:", proposal, "Invalid");
            countInvalid++;
        }
    })

    fs.writeFileSync(path, JSON.stringify(proposals));

    console.log("valid:", countValid, "invalid:", countInvalid);
    return {
        valid: countValid,
        invalid: countInvalid
    }
}

module.exports.validateProposalId = validateProposalId;
module.exports.saveFileValidProposals = saveFileProposals;