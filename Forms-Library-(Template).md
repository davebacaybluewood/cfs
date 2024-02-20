# Overview
The forms library is a set forms where the user can able to create or generate a form in the project by clicking a button.

Search
**onChange**: should be 3 characters to be able to filter the forms

- Endpoint: {form-domain}/projectforms/{projectId}
- Method: POST
- Payload

```
{
    "ProjectId": string,
    "FormId": number,
    "ProjectFormName": string,
    "ProjectDiagnosticId": number,
    "ModifiedDate": Date,
    "ModifiedUser": string,
    "Units": number[]
}
```


- Response: 

```
{
    "ProjectId": string,
    "FormId": number,
    "ProjectFormName": string,
    "ProjectDiagnosticId": number,
    "ModifiedUser": string,
    "ModifiedDate": string,
    "ProjectFormId": number,
    "ProjectFormSchemaId": string,
    "MethodologyVersionId": number
}
```
