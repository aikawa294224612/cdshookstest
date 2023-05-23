# webhookstest

example code: index.js
- discovery: GET /cds-services
- Hooks: /cds-services/patient-view

## Discovery:
```
{
    "services": [
        {
            "hook": "patient-view",
            "title": "Patient View Service",
            "description": "A CDS Hooks service for patient view.",
            "id": "patient-view",
            "prefetch": {
                "patient": "Patient/{{context.patientId}}"
            }
        }
    ]
}
```
## Host the project
https://dashboard.render.com/

Endpoint: https://cds-hooks-example.onrender.com

## Sandbox
![image](https://github.com/aikawa294224612/webhookstest/assets/39365400/229306de-5e5b-41a7-a1f7-e6c4e1011cc8)
