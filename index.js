const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const app = express();
const port = 3000;

const card = `{
    "cards": [
      {
        "uuid": null,
        "summary": null,
        "source": {
            "label" : null
        },
        "indicator": null
      }
    ]
  }`

app.use(bodyParser.json());

app.get('/cds-services', (req, res) => {
    const response = {
        services: [
          {
            hook: 'patient-view',
            title: 'Patient View Service',
            description: 'A CDS Hooks service for patient view.',
            id: 'patient-view-service',
            prefetch: {
              patient: 'Patient/{{context.patientId}}'
            }
          }
        ]
      };
    
      res.json(response);

  });
  

app.post('/cds-services/patient-view', (req, res) => {

  const payload = req.body;

  const fhirServer = payload.fhirServer;
  const patientId = payload.context.patientId;
  const name = payload.prefetch.patient.name[0].text;
  const id = payload.prefetch.patient.identifier[0].value;

  const jsonData = JSON.parse(card);

  //One-sentence, <140-character summary message for display to the user inside of this card.
  jsonData.cards[0].summary = "病患姓名為: " + name ;
  //Unique identifier of the card.
  jsonData.cards[0].uuid = crypto.randomUUID() ;
  //info, warning, critical
  jsonData.cards[0].indicator = "info";
  //https://cds-hooks.org/specification/current/#source
  jsonData.cards[0].source.label = "病患身分證: " + id ;

  res.status(200).send(jsonData);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});