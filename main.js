const express = require("express");
const fs = require("fs");
const utils = require("./utils");
const port = 3003;
console.log("Starting app on port:", port);
const app = express();

app.use(express.json());

app.post("/api/proposta/validar", function (req, res) {
    const proposals = req.body.propostas;

    console.log("propostas received:", JSON.stringify(proposals));

    const result = utils.saveFileValidProposals('./json/proposals.json', proposals);

    console.log("result:", JSON.stringify(result));
    res.json(result);
});

app.get('/api/proposta/:proposta/produto', (req, res) => {
    const propostasFilePath = './json/proposals.json';
    const propostaId = req.params.proposta;
    
    try {
        const propostas = JSON.parse(fs.readFileSync(propostasFilePath, 'utf8'));

        const proposal = propostas.find(proposal => {
            return proposal.propostaId === parseInt(propostaId); // Verifica se a propostaId coincide
        });

        if (proposal) {
            const responseJson = {
                produto: {
                    produtoId: proposal.produto.produtoId,
                    nrVersaoOferta: proposal.produto.nrVersaoOferta
                }
            };
            res.json(responseJson);
        } else {
            res.status(404).json({ error: "Proposta não encontrada." });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao processar a requisição." });
    }
});

app.listen(port);
