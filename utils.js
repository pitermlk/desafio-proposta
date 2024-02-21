const fs = require('fs');

const validateProposalId = (proposal) => {
    proposal = String(proposal);

    const code = proposal.substring(proposal.length - 2);

    const arrNumbers = proposal.substring(0, proposal.length - 2).split("");
    let sumEven = 0;
    let sumOdd = 0;

    arrNumbers.forEach(element => {
        const num = parseInt(element);
        if (num % 2 === 0) {
            sumEven += num;
        } else {
            sumOdd += num;
        }
    });

    const verifyCode = Math.round(Math.abs(sumEven - sumOdd) / 2);

    return code === String(verifyCode).padStart(2, '0');
};

const saveFileProposals = (path, proposals) => {
    let countValid = 0;
    let countInvalid = 0;

    proposals.forEach(element => {
        const verifyCode = String(element.produto.nrVersaoOferta).padStart(2, '0');
        const proposal = element.propostaId + verifyCode;
        if (validateProposalId(proposal)) {
            console.log("proposal:", proposal, "Valid");
            countValid++;
        } else {
            console.log("proposal:", proposal, "Invalid");
            countInvalid++;
        }
    });

    fs.writeFileSync(path, JSON.stringify(proposals));

    console.log("valid:", countValid, "invalid:", countInvalid);
    return {
        valid: countValid,
        invalid: countInvalid
    };
};

module.exports.validateProposalId = validateProposalId;
module.exports.saveFileValidProposals = saveFileProposals;
